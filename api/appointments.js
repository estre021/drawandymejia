import nodemailer from 'nodemailer';

const doctorEmail = process.env.DOCTOR_EMAIL;
const doctorWhatsApp = (process.env.DOCTOR_WHATSAPP || '').replace(/\D/g, '');
const clinicWhatsApp = {
  sinad: (process.env.SINAD_WHATSAPP || '18095428898').replace(/\D/g, ''),
  medkids: (process.env.MEDKIDS_WHATSAPP || '18095691072').replace(/\D/g, ''),
  insight: (process.env.INSIGHT_WHATSAPP || '18492621997').replace(/\D/g, '')
};
const rateLimit = new Map();

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
    reason: clean(input.reason, 700)
  };
}

function validAppointment(data) {
  return data.name.length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) &&
    data.phone.length >= 7 && data.reason.length >= 3;
}

function getWhatsAppRecipient(clinic) {
  const normalizedClinic = clinic.toLowerCase();
  if (normalizedClinic.includes('sinad')) return clinicWhatsApp.sinad;
  if (normalizedClinic.includes('medkids')) return clinicWhatsApp.medkids;
  if (normalizedClinic.includes('insight')) return clinicWhatsApp.insight;
  return doctorWhatsApp;
}

function clientKey(req) {
  const forwarded = req.headers['x-forwarded-for'];
  return String(forwarded || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
}

function isRateLimited(req) {
  const key = clientKey(req);
  const now = Date.now();
  const previous = rateLimit.get(key) || 0;
  if (now - previous < 30_000) return true;
  rateLimit.set(key, now);
  if (rateLimit.size > 500) rateLimit.clear();
  return false;
}

function transporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
  });
}

async function notifyByEmail(data) {
  const mailer = transporter();
  if (!mailer || !doctorEmail) return false;

  await mailer.sendMail({
    from: `Web Dra. Wandy Mejía <${process.env.SMTP_USER}>`,
    to: doctorEmail,
    replyTo: data.email,
    subject: `Nueva solicitud de cita - ${data.name}`,
    text: [
      'NUEVA SOLICITUD DE CITA', '',
      `Paciente: ${data.name}`,
      `Correo: ${data.email}`,
      `Teléfono / WhatsApp: ${data.phone}`,
      `Edad: ${data.age || 'No especificada'}`,
      `Fecha sugerida: ${data.appointmentDate || 'No especificada'}`,
      `Horario: ${data.appointmentTime || 'No especificado'}`,
      `Modalidad / consultorio: ${data.clinic || 'No especificado'}`,
      '', 'Motivo de consulta:', data.reason
    ].join('\n')
  });
  return true;
}

async function notifyByWhatsApp(data) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const recipient = getWhatsAppRecipient(data.clinic);
  if (!token || !phoneNumberId || !recipient) return false;

  const response = await fetch(`https://graph.facebook.com/${process.env.WHATSAPP_API_VERSION || 'v22.0'}/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: recipient,
      type: 'text',
      text: {
        body: [
          'Nueva solicitud de cita',
          `Paciente: ${data.name}`,
          `Tel: ${data.phone}`,
          `Fecha: ${data.appointmentDate || 'por coordinar'}`,
          `Horario: ${data.appointmentTime || 'por coordinar'}`,
          `Modalidad: ${data.clinic || 'por coordinar'}`
        ].join('\n'),
        preview_url: false
      }
    })
  });

  return response.ok;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed.' });
  }

  if (isRateLimited(req)) {
    return res.status(429).json({ ok: false, error: 'Please wait before sending another request.' });
  }

  const data = cleanAppointment(req.body);
  if (!validAppointment(data)) {
    return res.status(400).json({ ok: false, error: 'Completa nombre, correo, teléfono y motivo de consulta.' });
  }

  const [emailResult, whatsappResult] = await Promise.allSettled([
    notifyByEmail(data),
    notifyByWhatsApp(data)
  ]);
  const emailSent = emailResult.status === 'fulfilled' && emailResult.value === true;
  const whatsappSent = whatsappResult.status === 'fulfilled' && whatsappResult.value === true;
  const whatsappNumber = getWhatsAppRecipient(data.clinic);

  if (emailResult.status === 'rejected') console.error('Appointment email notification failed.');
  if (whatsappResult.status === 'rejected') console.error('Appointment WhatsApp notification failed.');

  return res.status(emailSent || whatsappSent ? 201 : 202).json({
    ok: true,
    emailSent,
    whatsappSent,
    whatsappFallback: !whatsappSent,
    whatsappNumber
  });
}
