document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('citaForm');
    if (!form) return;

    const isEnglish = document.documentElement.lang === 'en';
    const submitButton = form.querySelector('button[type="submit"]');
    const status = document.getElementById('appointmentStatus');
    const originalButtonText = submitButton.textContent;

    const value = (id) => document.getElementById(id)?.value.trim() || '';
    const setStatus = (message, type = '') => {
        status.textContent = message;
        status.className = `appointment-status ${type}`.trim();
        status.hidden = false;
    };

    const addFallbackLinks = (appointment, whatsappNumber = '18094592222') => {
        const message = isEnglish
            ? `Hello, I want to schedule an appointment from the website. Name: ${appointment.name}. Email: ${appointment.email}. Phone: ${appointment.phone}. Suggested date: ${appointment.appointmentDate || 'to coordinate'}. Reason: ${appointment.reason}`
            : `Hola, quiero agendar una cita desde la página web. Nombre: ${appointment.name}. Correo: ${appointment.email}. Teléfono: ${appointment.phone}. Fecha sugerida: ${appointment.appointmentDate || 'por coordinar'}. Motivo: ${appointment.reason}`;
        const whatsappLink = document.createElement('a');
        whatsappLink.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        whatsappLink.target = '_blank';
        whatsappLink.rel = 'noopener';
        whatsappLink.className = 'appointment-status-action';
        whatsappLink.innerHTML = '<i class="fab fa-whatsapp"></i> ' + (isEnglish ? 'Contact via WhatsApp' : 'Contactar por WhatsApp');

        const emailLink = document.createElement('a');
        emailLink.href = `mailto:drawandymejiard@gmail.com?subject=${encodeURIComponent(isEnglish ? 'Appointment request' : 'Solicitud de cita')}&body=${encodeURIComponent(message)}`;
        emailLink.className = 'appointment-status-action';
        emailLink.innerHTML = '<i class="fas fa-envelope"></i> ' + (isEnglish ? 'Send by email' : 'Enviar por correo');

        status.append(document.createElement('br'), whatsappLink, document.createTextNode(' · '), emailLink);
    };

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const appointment = {
            name: value('nombre'),
            email: value('email'),
            phone: value('telefono'),
            age: value('edad'),
            appointmentDate: value('fecha'),
            appointmentTime: value('horario'),
            clinic: value('consultorio'),
            reason: value('motivo'),
            language: isEnglish ? 'en' : 'es'
        };

        submitButton.disabled = true;
        submitButton.classList.add('is-loading');
        submitButton.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i> ${isEnglish ? 'SENDING REQUEST...' : 'ENVIANDO SOLICITUD...'}`;
        setStatus(isEnglish ? 'Sending your request securely...' : 'Enviando tu solicitud de forma segura...', 'is-loading');

        try {
            const response = await fetch('/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(appointment)
            });
            const result = await response.json().catch(() => ({
                ok: false,
                error: `Server response error (${response.status}).`
            }));

            if (!response.ok || !result.ok) {
                throw new Error(result.error || 'Request failed');
            }

            const notifications = [
                result.emailSent ? (isEnglish ? 'email' : 'correo') : '',
                result.whatsappSent ? 'WhatsApp' : ''
            ].filter(Boolean).join(isEnglish ? ' and ' : ' y ');
            const sentMessage = isEnglish
                ? `Request received. ${notifications ? `The doctor was notified by ${notifications}.` : 'The doctor will confirm your time shortly.'}`
                : `Solicitud recibida. ${notifications ? `La doctora fue notificada por ${notifications}.` : 'La doctora confirmará tu horario pronto.'}`;
            setStatus(sentMessage, 'is-success');
            form.reset();

            if (result.whatsappFallback) {
                addFallbackLinks(appointment, result.whatsappNumber);
            }
        } catch (error) {
            const message = error instanceof TypeError
                ? (isEnglish ? 'The appointment server is unavailable. Use one of the direct contact options below.' : 'El servidor de citas no está disponible. Usa una de las opciones de contacto directo.')
                : (isEnglish ? 'The request could not be processed. Use one of the direct contact options below.' : 'No pudimos procesar la solicitud. Usa una de las opciones de contacto directo.');
            setStatus(message, 'is-error');
            const fallbackNumber = value('consultorio').toLowerCase().includes('sinad')
                ? '18095428898'
                : value('consultorio').toLowerCase().includes('medkids')
                    ? '18095691072'
                    : value('consultorio').toLowerCase().includes('insight')
                        ? '18492621997'
                        : '18094592222';
            addFallbackLinks(appointment, fallbackNumber);
        } finally {
            submitButton.disabled = false;
            submitButton.classList.remove('is-loading');
            submitButton.innerHTML = originalButtonText;
        }
    });
});
