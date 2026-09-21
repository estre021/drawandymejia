# Actualización premium — Dra. Wandy Mejía

Esta carpeta contiene los archivos actualizados entregados en la conversación.

## Cambios
- Se elimina el flujo de pago para consulta virtual.
- `registro.html` y `registro_en.html` envían la cita a `POST /api/appointments`.
- El servidor envía correo inmediato a la doctora mediante SMTP.
- Si se configura WhatsApp Cloud API, envía además una alerta de WhatsApp a la doctora.
- Si WhatsApp API no está configurado, el navegador abre un mensaje prellenado a WhatsApp como respaldo.
- Se añadieron animaciones premium suaves sin cambiar la paleta ni la tipografía: scroll progress, parallax sutil, reveal escalonado, microinteracciones, glow ambiental, tilt y CTA flotante.
- `pago.html` y `pago_en.html` ya no forman parte del flujo.

## Importante
Este paquete es una actualización para integrar sobre el proyecto original porque los recursos `css/styles.css`, imágenes, videos y otros JS del proyecto no fueron adjuntados en esta conversación. Conserva esas carpetas originales y reemplaza/agrega los archivos de este paquete.

## Instalación
1. Copia estos archivos sobre tu proyecto original.
2. Conserva tus carpetas existentes `css/`, `js/` y `assets/images/` / `assets/videos/`.
3. Ejecuta `npm install`.
4. Copia `.env.example` a `.env` y completa SMTP.
5. Ejecuta `npm start`.
6. Abre `http://localhost:8000`.

## Publicación en Vercel
1. Sube el proyecto a un repositorio privado de GitHub. No subas `.env`; está excluido por `.gitignore`.
2. En Vercel crea un proyecto desde ese repositorio.
3. Usa `npm install` como comando de instalación. No necesitas un comando de build.
4. En **Settings > Environment Variables**, agrega las variables de `.env.example` para Production.
5. Publica el proyecto y agrega tu dominio en **Settings > Domains**.

La función privada `api/appointments.js` procesa la cita en el servidor. El navegador solo recibe el estado de las notificaciones (`emailSent` y `whatsappSent`), nunca el contenido de la cita ni las credenciales.

## Correo
Para Gmail, activa verificación en dos pasos y genera una **App Password**. Colócala en `SMTP_PASSWORD`.

## WhatsApp automático
Para que el mensaje llegue automáticamente al WhatsApp de la doctora sin abrir WhatsApp en el teléfono del paciente, necesitas WhatsApp Business Cloud API de Meta. Completa `WHATSAPP_TOKEN` y `WHATSAPP_PHONE_NUMBER_ID`.

El sitio envía por WhatsApp solo un resumen de la cita. El motivo clínico completo se deja en el correo para reducir exposición de información sensible.
