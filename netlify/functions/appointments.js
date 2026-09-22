import handler from '../../api/appointments.js';

export default async function netlifyAppointments(event) {
  let responseStatus = 200;
  const responseHeaders = {};
  let responseBody = '{}';
  let requestBody = {};
  try {
    requestBody = event.body ? JSON.parse(event.body) : {};
  } catch {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, error: 'Invalid request body.' })
    };
  }

  const request = {
    method: event.httpMethod,
    body: requestBody,
    headers: event.headers || {},
    socket: { remoteAddress: event.headers?.['x-nf-client-connection-ip'] || 'netlify' }
  };
  const response = {
    setHeader(name, value) {
      responseHeaders[name] = value;
    },
    status(code) {
      responseStatus = code;
      return this;
    },
    json(payload) {
      responseBody = JSON.stringify(payload);
      return this;
    }
  };

  try {
    await handler(request, response);
  } catch (error) {
    console.error('Appointment function failed:', error?.message || error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, error: 'No pudimos procesar la solicitud en este momento.' })
    };
  }

  return {
    statusCode: responseStatus,
    headers: { 'Content-Type': 'application/json', ...responseHeaders },
    body: responseBody,
    isBase64Encoded: false
  };
}
