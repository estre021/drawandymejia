import handler from '../../api/appointments.js';

export default async function netlifyAppointments(event) {
  let responseStatus = 200;
  const responseHeaders = {};
  let responseBody = '{}';
  const requestBody = event.body ? JSON.parse(event.body) : {};

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

  await handler(request, response);

  return {
    statusCode: responseStatus,
    headers: { 'Content-Type': 'application/json', ...responseHeaders },
    body: responseBody
  };
}
