document.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('paypal-button-container');
    const status = document.getElementById('paymentProviderStatus');
    const realCard = document.getElementById('realPaymentCard');
    const successCard = document.getElementById('successPaymentCard');
    const customer = JSON.parse(sessionStorage.getItem('temp_cita_data') || 'null');

    if (!container || !realCard || !customer) {
        if (status) status.textContent = 'No encontramos los datos de la cita. Regresa al registro e inténtalo de nuevo.';
        return;
    }

    try {
        const configResponse = await fetch('/api/paypal/config');
        const config = await configResponse.json();
        if (!configResponse.ok) throw new Error(config.error || 'La pasarela no está configurada.');

        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(config.clientId)}&currency=${encodeURIComponent(config.currency)}&intent=capture&components=buttons`;
        script.onload = () => renderPayPal(config);
        script.onerror = () => showError('No se pudo cargar la pasarela segura.');
        document.head.appendChild(script);

        const total = document.getElementById('summaryTotalValue');
        if (total) total.textContent = `${config.currency} ${config.amount}`;
    } catch (error) {
        showError(error.message);
    }

    function renderPayPal(config) {
        if (!window.paypal) return showError('La pasarela segura no está disponible.');
        status.textContent = `Total: ${config.currency} ${config.amount}`;
        window.paypal.Buttons({
            style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal' },
            createOrder: async () => {
                const response = await fetch('/api/paypal/orders', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ customer })
                });
                const data = await response.json();
                if (!response.ok) throw new Error(data.error || 'No se pudo iniciar el pago.');
                return data.id;
            },
            onApprove: async (data) => {
                realCard.style.display = 'none';
                const loading = document.getElementById('loadingPaymentCard');
                if (loading) loading.style.display = 'flex';
                const response = await fetch(`/api/paypal/orders/${encodeURIComponent(data.orderID)}/capture`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ customer })
                });
                const result = await response.json();
                if (!response.ok) {
                    if (loading) loading.style.display = 'none';
                    realCard.style.display = 'block';
                    throw new Error(result.error || 'El pago no pudo confirmarse.');
                }
                if (loading) loading.style.display = 'none';
                showSuccess(result);
            },
            onError: error => showError(error?.message || 'El pago no pudo completarse.')
        }).render('#paypal-button-container');
    }

    function showSuccess(result) {
        if (!successCard) return;
        const details = document.getElementById('confirmationDetailsBox');
        if (details) details.innerHTML = `<strong>Paciente:</strong> ${escapeHtml(customer.nombre)}<br><strong>Servicio:</strong> Consulta Nutricional Virtual<br><strong>Estado:</strong> Pago confirmado<br><strong>Referencia:</strong> ${escapeHtml(result.orderId)}<br><strong>Recibo:</strong> Enviado al correo del paciente y de la doctora.`;
        successCard.style.display = 'block';
        sessionStorage.removeItem('temp_cita_data');
    }

    function showError(message) {
        if (status) status.textContent = message;
        if (status) status.classList.add('payment-error');
    }

    function escapeHtml(value) {
        return String(value || '').replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
    }
});
