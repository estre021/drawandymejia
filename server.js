import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.PORT || 8000);
const doctorEmail = process.env.DOCTOR_EMAIL || 'drawandymejiard@gmail.com';
const doctorWhatsApp = (process.env.DOCTOR_WHATSAPP || '18094592222').replace(/\D/g, '');

app.use(express.json({ limit: '32kb' }));
app.use(express.static(__dirname));

function clean(value, max = 250) {
  return String(value ?? '').trim().slice(0, max);
}

function cleanAppointment(input = {}) {
  return {
    name: clean(input.name, 120),
    email: clean(input.email, 160).toLowerCase(),
    phone: clean(input.phone, 40),
    age: clean(input.age, 12),
    appointmentDate: clean(input.appointmentDate, 30),
    appointmentTime: clean(input.appointmentTime, 60),
    clinic: clean(input.clinic, 120),
    reason: clean(input.reason, 700),
    language: clean(input.language, 5) || 'es'
  };
}

function validAppointment(data) {
  return data.name.length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) &&
    data.phone.length >= 7 && data.reason.length >= 3;
}

function emailTransporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
  });
}

async function notifyByEmail(data) {
  const transporter = emailTransporter();
  if (!transporter) return { sent: false, reason: 'smtp_not_configured' };

  const subject = `Nueva solicitud de cita - ${data.name}`;
  const text = [
    'NUEVA SOLICITUD DE CITA', '',
    `Paciente: ${data.name}`,
    `Correo: ${data.email}`,
    `Teléfono / WhatsApp: ${data.phone}`,
    `Edad: ${data.age || 'No especificada'}`,
    `Fecha sugerida: ${data.appointmentDate || 'No especificada'}`,
    `Horario: ${data.appointmentTime || 'No especificado'}`,
    `Modalidad / consultorio: ${data.clinic || 'No especificado'}`,
    '', 'Motivo de consulta:', data.reason,
    '', 'Solicitud enviada desde drawandymejia.do.'
  ].join('\n');

  await transporter.sendMail({
    from: `Web Dra. Wandy Mejía <${process.env.SMTP_USER}>`,
    to: doctorEmail,
    replyTo: data.email,
    subject,
    text
  });
  return { sent: true };
}

async function notifyByWhatsApp(data) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneNumberId || !doctorWhatsApp) return { sent: false, reason: 'whatsapp_not_configured' };

  // Mensaje breve: el motivo clínico completo se mantiene en el correo.
  const message = [
    '🩺 Nueva solicitud de cita',
    `Paciente: ${data.name}`,
    `Tel: ${data.phone}`,
    `Fecha: ${data.appointmentDate || 'por coordinar'}`,
    `Horario: ${data.appointmentTime || 'por coordinar'}`,
    `Modalidad: ${data.clinic || 'por coordinar'}`,
    'Revisa el correo para ver los detalles completos.'
  ].join('\n');

  const apiVersion = process.env.WHATSAPP_API_VERSION || 'v22.0';
  const response = await fetch(`https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: doctorWhatsApp,
      type: 'text',
      text: { body: message, preview_url: false }
    })
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`WhatsApp API error (${response.status}): ${details.slice(0, 300)}`);
  }
  return { sent: true };
}

app.post('/api/appointments', async (req, res) => {
  try {
    const data = cleanAppointment(req.body);
    if (!validAppointment(data)) {
      return res.status(400).json({ error: 'Completa nombre, correo, teléfono y motivo de consulta.' });
    }

    const [emailResult, whatsappResult] = await Promise.allSettled([
      notifyByEmail(data),
      notifyByWhatsApp(data)
    ]);

    const emailSent = emailResult.status === 'fulfilled' && emailResult.value.sent;
    const whatsappSent = whatsappResult.status === 'fulfilled' && whatsappResult.value.sent;

    // La solicitud se considera recibida si por lo menos el correo fue enviado.
    // Si SMTP todavía no está configurado, el front ofrece fallback directo a WhatsApp.
    res.status(emailSent ? 201 : 202).json({
      ok: true,
      emailSent,
      whatsappSent,
      whatsappFallback: !whatsappSent,
      doctorWhatsApp
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No pudimos procesar la solicitud en este momento.' });
  }
});

app.listen(port, () => console.log(`Dra. Wandy Mejía web running on http://localhost:${port}`));
