# Proyecto: Página web Dra. Wandy Mejía

## Descripción general

Este proyecto es un sitio web corporativo estático para la Dra. Wandy Mejía, nutróloga clínica. Está compuesto por páginas HTML estáticas, hojas de estilo CSS y scripts JavaScript que implementan interactividad, animaciones, navegación móvil y widgets de contacto.

El sitio incluye versiones en español y en inglés de las páginas principales:
- `index.html` / `index_en.html`
- `servicios.html` / `servicios_en.html`
- `contacto.html` / `contacto_en.html`
- `registro.html` / `registro_en.html`
- `pago.html` / `pago_en.html`

También existen copias de respaldo en `backup_original/` para las páginas principales y el estilo.

## Estructura de archivos

Raíz del proyecto:
- `index.html` - Página principal en español.
- `index_en.html` - Página principal en inglés.
- `servicios.html` - Página de servicios en español.
- `servicios_en.html` - Página de servicios en inglés.
- `contacto.html` - Página de contacto en español.
- `contacto_en.html` - Página de contacto en inglés.
- `registro.html` - Página de registro de cita en español.
- `registro_en.html` - Página de registro de cita en inglés.
- `pago.html` - Página de pago / checkout en español.
- `pago_en.html` - Página de pago / checkout en inglés.
- `package.json` - Archivo vacío, no hay dependencias instaladas con npm configuradas.
- `package-lock.json` - Archivo vacío también.

Carpeta `css/`:
- `css/styles.css` - Estilos globales de todas las páginas: tipografías, colores, layout, animaciones CSS, diseño responsive, tarjetas, botones, hero, sección de servicios, footer, etc.

Carpeta `js/`:
- `js/scripts.js` - Script principal para navegación, menú móvil, scroll header, acordeón FAQ, scroll suave/hash, efecto cursor en testimonios, control de enlaces de correo y comportamiento general.
- `js/animaciones.js` - Animaciones avanzadas con GSAP y ScrollTrigger: hero, fondo de video, secciones de servicios, revelado global, tarjetas de servicio, testimonios y más.
- `js/chatbot.js` - Widget de asistente virtual que inyecta HTML dinámicamente, maneja un chat con FAQ, motor semántico básico y un índice local de contenidos mediante fetch de páginas.
- `js/check_page_errors.js` - Herramienta de desarrollo para ejecutar Chrome en modo headless y detectar errores en consola/JS de la página.

Carpeta `assets/`:
- `assets/images/` - Imágenes del sitio, logotipo, fotografías, íconos visuales, etc.
- `assets/videos/` - Videos de fondo para hero, secciones y banner.
- `assets/backups/` - Backups de páginas y archivos.
- `assets/docs/` - Documentación y guías internas.
- `assets/mockups/` - Mockups relacionados con el proyecto.
- `assets/tools/` - Herramientas internas, como `patch.py`.

Carpeta `backup_original/`:
- Copia completa de las páginas y estilos originales del proyecto.

## Tecnologías usadas

### HTML
- Estructura estática de páginas.
- Uso de `lang="es"` / `lang="en"` para idiomas.
- `meta viewport` para diseño responsive.
- Estructura semántica con `section`, `nav`, `footer`, `main`, `h1`–`h5`, `p`, `ul`, `li`.
- Uso de `iframe` para incrustar Google Maps en `contacto.html`.
- Uso de `video` con atributos `autoplay`, `loop`, `muted`, `playsinline` para fondos.
- Enlaces directos a WhatsApp con `https://wa.me/` y correo con `mailto:`.

### CSS
- Archivo único `css/styles.css` con variables CSS (`:root`) para colores, sombras y radios.
- Tipografías importadas desde Google Fonts: `DM Sans` y `Playfair Display`.
- Uso de variables CSS para:
  - `--primary`, `--secondary`, `--gray`, `--text-dark`, `--white`
  - `--border-radius-lg`, `--border-radius-md`
- Reglas globales para `box-sizing`, tipografía base, colores y contenedores.
- Layouts responsive con `display: flex`, grids, tarjetas y hero de página completa.
- Estilos de navbar fijo y `navbar.scrolled` para cambio visual al hacer scroll.
- Estilos de `overlay` para menú móvil y capas de desenfoque.
- Estilos para botones primarios, botones outline, cards, formularios y formularios de pago.
- Estilos para carruseles Swiper y componentes de sección.
- Uso de pseudo-elementos y gradientes para fondos y separadores.

### JavaScript
- Código moderno de front-end con Vanilla JS sin frameworks de SPA.
- Uso de `document.addEventListener('DOMContentLoaded', ...)` para inicializar scripts solo cuando el DOM está listo.
- `js/scripts.js` cubre:
  - Añadir la clase `js-enabled` al `documentElement`.
  - Encabezado que cambia de estilo cuando el usuario hace scroll (`scrollY > 50`).
  - Menú hamburguesa móvil con overlay y bloqueo de scroll del body.
  - Cierre automático del menú móvil al pulsar cualquier enlace.
  - Acordeón FAQ que abre/cierra elementos y cierra otros abiertos.
  - Efectos de scroll comentados que se reemplazan por GSAP.
  - Navegación suave a hashes cuando la URL contiene un ancla.
  - Adaptación dinámica de enlaces de correo para abrir `mailto:` en móvil y Gmail web en escritorio.
  - Efectos de cursor interactivo para la sección de testimonios.
  - Preparación para futuras animaciones con IntersectionObserver comentadas.

- `js/animaciones.js` cubre:
  - Registro de plugin `ScrollTrigger` de GSAP.
  - Animaciones de hero: texto, botón pulsante, fondo de video con escala y scroll.
  - Animación del blur y overlay en la sección hero con transiciones.
  - Animación de fondo de video en servicios y banner.
  - Animación de carga de la imagen de perfil en `sobre-mi`.
  - Revelado global de elementos `.reveal-on-scroll` en pantalla con delay.
  - Animación de tarjetas de servicio, hover y efectos de iconos.
  - ScrollTrigger para campañas y parallax de vídeo.
  - Integración con `Swiper` mediante refresh una vez que los carruseles cargan.

- `js/chatbot.js` cubre:
  - Detección del idioma por ruta `window.location.pathname.includes('_en.html')`.
  - Base de conocimiento estática en español e inglés: respuestas FAQs y opciones.
  - Inyección dinámica del widget de chat en el `body`.
  - Botones de FAQ dinámicos con respuestas rápidas.
  - RAG local: fetch de páginas de contenido y extracción de bloques textuales.
  - Limpieza de HTML para indexación con `DOMParser`.
  - Motor semántico simple que compara texto, saludos y keywords.
  - Soporte de fallback si el fetch falla en `file://`.

- `js/check_page_errors.js` cubre:
  - Script Node.js de desarrollo para abrir Chrome en modo headless con `--remote-debugging-port`.
  - Usa WebSocket para inspeccionar `console` y excepciones en la página.
  - Navega a `file:///` local y captura mensajes de error.
  - No forma parte de la funcionalidad pública del sitio, sino de una herramienta para QA.

## Dependencias externas cargadas por CDN

El proyecto carga recursos desde CDN y no requiere instalación local.

- Google Fonts
  - `https://fonts.googleapis.com/css2?family=DM+Sans...`
  - `https://fonts.googleapis.com/css2?family=Playfair+Display...`
- Font Awesome 6.5.1
  - `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css`
- Swiper 11
  - `https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css`
  - `https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js`
- GSAP 3.12.5
  - `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`
  - `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js`

## Flujos y funcionalidades detalladas

### Home (`index.html` / `index_en.html`)

Componentes principales:
- Navbar con enlaces internos y externos.
- Selector de idioma con versión ES/EN.
- Hero con video de fondo y overlay de desenfoque.
- Sección "Sobre mí" con imagen de perfil, lista de especialidades y citas.
- Sección de servicios destacando 3 servicios principales.
- Sección "Por qué elegirnos" con iconos e información.
- Carrusel de testimonios con Swiper (`.testiSwiper`).
- Carrusel de blog o contenido con Swiper (`.blogSwiper`).
- Posible carrusel de certificaciones con Swiper (`.certSwiper`).
- Footer con enlaces rápidos y datos de contacto.

Funciones especiales:
- Hero con video que escala en scroll.
- Navbar que cambia a fondo blanco con blur cuando se desplaza.
- Testimonios con interacción de cursor y blobs animados.
- ScrollReveal con animaciones GSAP para secciones visibles.
- Carruseles Swiper que se inician tras una espera y refrescan ScrollTrigger.

### Servicios (`servicios.html` / `servicios_en.html`)

Componentes:
- Hero de cabecera con mensaje de servicios.
- Secciones alternadas (`servicio-alt-row`) con imagen + texto.
- Listado de servicios clínicos detallados:
  - Consultas virtuales.
  - Consulta nutricional funcional.
  - Control de peso y obesidad.
  - Nutrición infantil y pediátrica.
  - Nutrición para autismo (TEA).
  - Manejo nutricional para TDAH.
  - Tratamiento para niños mal comedores.
- Sección de charlas virtuales con precios y botones hacia `pago.html`.
- Carrusel Swiper de conferencias / charlas (`.confSwiper`).
- Footer compartido.

### Contacto (`contacto.html` / `contacto_en.html`)

Componentes:
- Información de consultorios con tarjetas.
- Iframes de Google Maps para ubicaciones.
- Tarjetas de contacto: WhatsApp, correo, Instagram.
- Enlaces directos a WhatsApp y correo.
- Footer con datos de contacto y enlaces.

Lógica adicional:
- Botón de WhatsApp directo usa `https://wa.me/18094592222?...`.
- Enlaces de correo se adaptan por JavaScript para abrir Gmail en escritorio o mail app en móvil.

### Registro de cita (`registro.html` / `registro_en.html`)

Componentes:
- Formulario de agenda de cita con campos:
  - Nombre completo.
  - Correo electrónico.
  - Teléfono / WhatsApp.
  - Edad.
  - Fecha sugerida.
  - Horario preferido.
  - Consultorio preferido.
  - Motivo de consulta.
- Botón que genera el envío por WhatsApp.

Lógica de formulario:
- Se previene el envío normal con `event.preventDefault()`.
- Si el consultorio seleccionado es "Consultas Virtuales", se guarda un objeto en `sessionStorage` con los datos de la cita y se redirige a `pago.html?item=consulta`.
- Para citas presenciales, el script construye un mensaje con todos los datos y abre WhatsApp (`wa.me`) hacia el número correspondiente:
  - SINAD SALUD -> `18095428898`
  - Medkids Center -> `18095691072`
  - INSIGHT -> `18492621997`
  - En otros casos, usa `18094592222`

### Pago (`pago.html` / `pago_en.html`)

Componentes:
- Interfaz de checkout con pestañas para:
  - Tarjeta de crédito.
  - PayPal.
  - Transferencia bancaria.
- Vista previa dinámica de tarjeta.
- Resumen de compra con monto en USD y DOP.
- Panel de éxito con botones para enviar confirmación por WhatsApp o Gmail.

Lógica de pago:
- `item` en la query string define el producto:
  - `consulta` = Consulta Nutricional Virtual ($50 USD / RD$ 3,000).
  - `charla-tea` = Charla Autismo ($25 USD).
  - `charla-microbiota` = Charla Microbiota ($20 USD).
  - `charla-habitos` = Charla Hábitos ($15 USD).
- Si llega `sessionStorage.temp_cita_data`, el resumen muestra datos de la cita y el botón final permite enviar confirmación.
- El pago es una simulación de procesado local; no hay integración real con pasarelas.
- La interfaz formatea número de tarjeta, expiration y muestra icono de marca.
- Al finalizar, se muestra pantalla de éxito y se habilita el envío por WhatsApp y Gmail.

## Recursos estáticos y multimedia

### `assets/images/`
- Logo de Wandy Mejía.
- Imaginería de hero, consulta virtual, nutrición pediátrica, autismo, TDAH, control de peso, niños mal comedores.

### `assets/videos/`
- Videos de fondo para hero, sección de servicios y banner de llamada a la acción.
- Usados en `index.html`, `servicios.html`, y otras páginas hero/banner.

### `assets/docs/`
- Documentos internos con prompts, pasos de implementación y guías.

## Detalles de implementación

- El proyecto está diseñado como sitio estático. No hay servidor backend, bases de datos ni APIs externas propias.
- Toda la interacción de usuario ocurre en el navegador.
- El flujo de agendar cita es híbrido: el formulario prepara un mensaje de WhatsApp y el usuario lo envía manualmente.
- El flujo de pago es visual y de mockup: se muestra un checkout, pero no hay cobro real.
- Hay código comentado en `js/scripts.js` que demuestra alternativas con `IntersectionObserver` y scroll dinámico, pero está desactivado porque se usa GSAP.

## Cómo usar / desplegar

1. Abrir `index.html` en un navegador moderno.
2. Asegurarse de tener conexión a internet para cargar recursos CDN: Google Fonts, Font Awesome, Swiper, GSAP.
3. Si se quiere probar el enlace de pago y registro, usar las páginas `registro.html` y `pago.html`.

> Nota: porque es un sitio estático, algunos scripts de `fetch` en `js/chatbot.js` pueden fallar si se abre el proyecto directamente con `file://` en ciertos navegadores debido a políticas de CORS. En ese caso, el chatbot usa el fallback de la base de conocimiento interna.

## Notas adicionales

- `package.json` y `package-lock.json` están vacíos, lo que indica que no se ha configurado un entorno de Node/npm para este sitio.
- La carpeta `backup_original/` contiene copias de seguridad de las páginas y estilos de origen.
- El proyecto es completamente de frontend, ideal para desplegar en hosting estático como GitHub Pages, Netlify o Vercel.
- No hay framework JS (React/Vue/Angular); todo es JavaScript, HTML y CSS puros.

## Archivos importantes por función

- `index.html` / `index_en.html`: páginas principales.
- `servicios.html` / `servicios_en.html`: catálogo de servicios y charlas.
- `contacto.html` / `contacto_en.html`: contacto con mapas, WhatsApp y correo.
- `registro.html` / `registro_en.html`: formularios de registro y redirección de citas.
- `pago.html` / `pago_en.html`: checkout simulado.
- `css/styles.css`: estilos globales.
- `js/scripts.js`: interactividad general.
- `js/animaciones.js`: animaciones GSAP.
- `js/chatbot.js`: chatbot semántico.
- `js/check_page_errors.js`: herramienta de desarrollo para pruebas.

---

Este README describe con detalle todos los componentes, tecnologías y flujos que utiliza el proyecto.
