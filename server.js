import 'dotenv/config';
import express from 'express';
import nodemailer from 'nodemailer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.PORT || 8000);
const paypalBase = process.env.PAYPAL_ENV === 'production'
    ? 'https://api-m.paypal.com'
    : 'https://api-m.sandbox.paypal.com';
const paymentCurrency = process.env.PAYMENT_CURRENCY || 'USD';
const paymentAmount = process.env.PAYMENT_AMOUNT || '';
const doctorEmail = process.env.DOCTOR_EMAIL || 'drawandymejiard@gmail.com';

app.use(express.json({ limit: '32kb' }));
app.use(express.static(__dirname));

function assertPaymentConfiguration() {
    if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET || !paymentAmount) {
        const error = new Error('Payment provider is not configured');
        error.statusCode = 503;
        throw error;
    }
}

async function getPayPalAccessToken() {
    assertPaymentConfiguration();
    const credentials = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64');
    const response = await fetch(`${paypalBase}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    });
    if (!response.ok) throw new Error(`PayPal authentication failed (${response.status})`);
    return (await response.json()).access_token;
}

async function paypalRequest(endpoint, options = {}) {
    const accessToken = await getPayPalAccessToken();
    const response = await fetch(`${paypalBase}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
            ...(options.headers || {})
        }
    });
    const body = await response.json();
    if (!response.ok) {
        const error = new Error(body.message || 'PayPal request failed');
        error.statusCode = response.status;
        throw error;
    }
    return body;
}

function cleanCustomer(input = {}) {
    return {
        name: String(input.name || '').trim().slice(0, 120),
        email: String(input.email || '').trim().toLowerCase().slice(0, 160),
        phone: String(input.phone || '').trim().slice(0, 40),
        appointmentDate: String(input.appointmentDate || '').trim().slice(0, 30),
        appointmentTime: String(input.appointmentTime || '').trim().slice(0, 60),
        reason: String(input.reason || '').trim().slice(0, 500)
    };
}

function validateCustomer(customer) {
    return customer.name.length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email);
}

app.get('/api/paypal/config', (req, res) => {
    try {
        assertPaymentConfiguration();
        res.json({ clientId: process.env.PAYPAL_CLIENT_ID, currency: paymentCurrency, amount: paymentAmount });
    } catch {
        res.status(503).json({ error: 'El pago todavía no está configurado.' });
    }
});

app.post('/api/paypal/orders', async (req, res) => {
    try {
        const customer = cleanCustomer(req.body.customer);
        if (!validateCustomer(customer)) return res.status(400).json({ error: 'Nombre y correo válidos son obligatorios.' });
        const order = await paypalRequest('/v2/checkout/orders', {
            method: 'POST',
            headers: { 'PayPal-Request-Id': `consultation-${Date.now()}-${Math.random().toString(36).slice(2)}` },
            body: JSON.stringify({
                intent: 'CAPTURE',
                purchase_units: [{
                    reference_id: 'virtual-nutrition-consultation',
                    description: 'Consulta Nutricional Virtual',
                    amount: { currency_code: paymentCurrency, value: paymentAmount }
                }],
                application_context: {
                    brand_name: 'Dra. Wandy Mejía',
                    user_action: 'PAY_NOW',
                    shipping_preference: 'NO_SHIPPING'
                }
            })
        });
        res.status(201).json({ id: order.id });
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
});

app.post('/api/paypal/orders/:orderId/capture', async (req, res) => {
    try {
        const customer = cleanCustomer(req.body.customer);
        if (!validateCustomer(customer)) return res.status(400).json({ error: 'Datos del cliente incompletos.' });
        const capture = await paypalRequest(`/v2/checkout/orders/${encodeURIComponent(req.params.orderId)}/capture`, { method: 'POST' });
        const payment = capture.purchase_units?.[0]?.payments?.captures?.[0];
        if (capture.status !== 'COMPLETED' || payment?.status !== 'COMPLETED') {
            return res.status(402).json({ error: 'El pago no fue completado.', status: capture.status });
        }
        const receipt = await sendReceipt(customer, capture, payment);
        res.json({ status: 'COMPLETED', orderId: capture.id, receiptSent: receipt });
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
});

async function sendReceipt(customer, capture, payment) {
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) return false;
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === 'true',
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
    });
    const amount = `${payment.amount.value} ${payment.amount.currency_code}`;
    const text = `Consulta Nutricional Virtual\n\nPaciente: ${customer.name}\nCorreo: ${customer.email}\nTelefono: ${customer.phone}\nFecha sugerida: ${customer.appointmentDate}\nHorario: ${customer.appointmentTime}\nMotivo: ${customer.reason}\n\nPago confirmado\nMonto: ${amount}\nID PayPal: ${capture.id}`;
    await transporter.sendMail({
        from: `Dra. Wandy Mejía <${process.env.SMTP_USER}>`,
        to: [doctorEmail, customer.email],
        subject: `Pago confirmado - Consulta virtual - ${customer.name}`,
        text
    });
    return true;
}

app.listen(port, () => console.log(`Payment server listening on http://localhost:${port}`));
