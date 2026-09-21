# 🚀 GUÍA PASO A PASO - IMPLEMENTACIÓN DE ANIMACIONES GSAP DRA. WANDY

## PASO 1: AÑADIR CDN DE GSAP A TODOS LOS ARCHIVOS HTML

### En `index.html`, `servicios.html`, `cita.html` y `registro.html`:

Encuentra la etiqueta `</head>` o justo antes de `</body>` y añade:

```html
<!-- GSAP y ScrollTrigger - OBLIGATORIO -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
```

**Ubicación recomendada**: Justo antes de `</body>`, ANTES que `<script src="scripts.js"></script>`

---

## PASO 2: COPIAR EL CÓDIGO DE ANIMACIONES

### Opción A: Crear archivo separado `animaciones.js`

1. Copia el contenido completo de `02_ANIMACIONES_GSAP_COMPLETAS.js`
2. Crea un archivo nuevo llamado `animaciones.js` en tu carpeta del proyecto
3. Pega el código ahí
4. En TODOS tus HTML, añade antes del `</body>`:

```html
<script src="animaciones.js"></script>
```

**Orden correcto en HTML:**
```html
  <!-- Al final del body -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="scripts.js"></script>
  <script src="animaciones.js"></script> <!-- AQUÍ -->
</body>
```

### Opción B: Pegar directamente en `scripts.js`

1. Abre `scripts.js`
2. Copia TODO el contenido de `02_ANIMACIONES_GSAP_COMPLETAS.js`
3. Pégalo al final de `scripts.js`
4. Guarda

---

## PASO 3: VERIFICAR QUE LOS SELECTORES COINCIDAN

El código de animaciones usa selectores CSS. Verifica que en tu HTML existan:

### Para index.html:
```html
<!-- Hero -->
<section id="inicio" class="hero">
  <video id="heroVideo" class="video-bg"></video>
  <div class="hero-content">
    <a href="cita.html" class="btn-primary">AGENDAR CITA</a>
  </div>
</section>

<!-- Sobre mí -->
<section id="sobre-mi" class="about">
  <div class="profile-section">
    <img class="photo-image" src="...">
    <div class="name-block">
      <p class="doctor-name">Dra. Wandy Mejía</p>
    </div>
    <div class="specialty-item">...</div>
    <span class="badge">...</span>
    <a class="cta-btn" href="cita.html">Agendar consulta</a>
  </div>
</section>

<!-- Servicios destacados -->
<section id="servicios" class="services">
  <div class="service-card">
    <i class="service-icon fas fa-..."></i>
    <a class="btn-primary">Agendar</a>
  </div>
</section>

<!-- Testimonios -->
<section id="testimonios">
  <div class="testimonial-card">
    <div class="rating">
      <span class="star">⭐</span>
    </div>
  </div>
</section>

<!-- Certificaciones -->
<section class="certifications">
  <h2 class="certifications-title">CERTIFICACIONES</h2>
</section>
```

### Para servicios.html:
```html
<!-- Tarjetas de servicios -->
<div class="service-card">
  <img src="...">
  <a class="btn-primary">Agendar</a>
</div>
```

### Para cita.html:
```html
<!-- Ubicaciones -->
<div class="consultorio-mini-card">
  <iframe src="..."></iframe>
  <img src="...">
  <a class="btn-primary">Ir al Registro de Cita</a>
</div>
```

### Para registro.html:
```html
<!-- Formulario -->
<form id="citaForm">
  <div class="form-group">
    <label>...</label>
    <input required>
  </div>
  <button type="submit" class="btn-primary">PROGRAMAR CITA</button>
</form>
```

---

## PASO 4: PRUEBA EN EL NAVEGADOR

1. Abre tu proyecto en el navegador
2. Abre la consola (F12 o Cmd+Option+I)
3. Verifica que NO haya errores rojos

### Qué debe pasar:

**En index.html:**
- ✅ Al cargar: Contenido del hero aparece con fade
- ✅ Al hacer scroll: Foto de doctora entra con zoom
- ✅ Al seguir scroll: Texto sobre mí aparece línea por línea
- ✅ Al pasar hover sobre servicios: Suben y brillan
- ✅ Al pasar hover sobre botones: Se agrandar y brillan

**En servicios.html:**
- ✅ Al hacer scroll: Las 7 tarjetas entran escalonadas de abajo hacia arriba
- ✅ Al hover sobre tarjeta: Se levanta, rota sutilmente y brilla
- ✅ Imagen de tarjeta: Zoom al hover

**En cita.html:**
- ✅ Al hacer scroll: Las 4 ubicaciones entran una por una
- ✅ Al hover: Se levantan y el mapa/imagen hace zoom

**En registro.html:**
- ✅ Al cargar: Los campos entran escalonados
- ✅ Al hacer focus en input: Border brilla en rosa
- ✅ Al enviar: Validación visual

---

## PASO 5: PERSONALIZAR ANIMACIONES (OPCIONAL)

Si quieres ajustar velocidades, colores o efectos:

### Cambiar duración de animaciones:
```javascript
// En vez de:
duration: 0.8

// Usa:
duration: 1.2  // Más lento
duration: 0.4  // Más rápido
```

### Cambiar delays (tiempos de espera):
```javascript
// En stagger:
stagger: 0.15  // 150ms entre elemento y elemento
stagger: 0.25  // Más tiempo entre cada uno
stagger: 0.05  // Más rápido

// O en delay individual:
delay: 0.3     // Espera 300ms antes de empezar
```

### Cambiar easing (tipo de movimiento):
```javascript
ease: "power2.out"      // Desaceleración suave
ease: "power3.out"      // Desaceleración fuerte
ease: "back.out"        // Efecto de retroceso
ease: easeElastic       // Efecto bouncy (ya definido)
```

### Cambiar sombras/glow:
```javascript
// En vez de:
boxShadow: "0 20px 50px rgba(212, 120, 140, 0.25)"

// Usa:
boxShadow: "0 30px 60px rgba(212, 120, 140, 0.35)"  // Más fuerte
boxShadow: "0 10px 25px rgba(212, 120, 140, 0.15)"  // Más sutil
```

---

## PASO 6: OPTIMIZAR PARA MÓVIL

Si las animaciones se sienten lentas en móvil, añade al inicio de `animaciones.js`:

```javascript
// Detectar si es móvil
const isMobile = window.innerWidth <= 768;
const animationDuration = isMobile ? 0.5 : 0.8;
const animationStagger = isMobile ? 0.08 : 0.15;
```

Luego, cambia en las funciones:
```javascript
duration: animationDuration    // En vez de 0.8
stagger: animationStagger      // En vez de 0.15
```

---

## PASO 7: PROBLEMAS COMUNES Y SOLUCIONES

### ❌ "GSAP is not defined" o "ScrollTrigger is not defined"

**Solución**: Verifica que el CDN está en el orden correcto:
1. Primero GSAP
2. Luego ScrollTrigger
3. Luego scripts.js
4. Luego animaciones.js

### ❌ Las animaciones no funcionan en ciertos elementos

**Solución**: Los selectores no coinciden. Abre DevTools (F12) y copia exactamente el className o id de tu HTML, luego actualiza en `animaciones.js`.

Ejemplo:
```javascript
// Si en HTML es: <div class="service-card-box">
// Cambia en JS a:
const serviceCards = document.querySelectorAll('.service-card-box');

// Si en HTML es: <section class="my-services">
// Cambia en JS a:
const serviceCards = document.querySelectorAll('.my-services .card');
```

### ❌ Las animaciones son muy rápidas/lentas

**Solución**: Ajusta `duration` y `stagger`:
```javascript
// Muy rápido
gsap.from(".elemento", {
  duration: 0.3  // Sube este número
});

// Demasiado lento
gsap.from(".elemento", {
  duration: 0.3  // Reduce este número
});
```

### ❌ El navegador se congela/es muy lento

**Solución**: Reduce animaciones en móvil o disminuye `stagger`:
```javascript
// En vez de:
stagger: 0.2

// Usa:
stagger: 0.08  // Menos delay entre elementos
```

---

## PASO 8: AGREGAR ANIMACIONES ADICIONALES (AVANZADO)

### Animar un elemento específico que falta

En `animaciones.js`, al final de `DOMContentLoaded`, añade:

```javascript
// Ejemplo: Animar elemento con clase "my-element"
const myElements = document.querySelectorAll('.my-element');

gsap.from(myElements, {
  opacity: 0,
  y: 30,
  duration: 0.8,
  stagger: 0.1,
  scrollTrigger: {
    trigger: ".my-element:first-of-type",
    start: "top 75%",
    toggleActions: "play none none none"
  },
  ease: easeSmoooth
});
```

### Agregar hover effect a elemento

```javascript
document.querySelectorAll('.my-element').forEach(element => {
  element.addEventListener('mouseenter', function() {
    gsap.to(this, {
      y: -10,
      boxShadow: "0 15px 35px rgba(212, 120, 140, 0.3)",
      duration: 0.3
    });
  });
  
  element.addEventListener('mouseleave', function() {
    gsap.to(this, {
      y: 0,
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
      duration: 0.3
    });
  });
});
```

---

## PASO 9: TESTING Y QA

### Checklist de validación:

- [ ] Las animaciones funcionen en Chrome
- [ ] Las animaciones funcionen en Firefox
- [ ] Las animaciones funcionen en Safari
- [ ] Las animaciones funcionen en móvil (iPhone/Android)
- [ ] No haya errores en la consola (F12)
- [ ] Las animaciones no ralenticen el sitio
- [ ] El scroll sea fluido (no "janky")
- [ ] Los hover effects funcionen en desktop
- [ ] Los focus states funcionen en inputs
- [ ] Los botones respondan al click

### Comando para medir performance:

Abre la consola y corre:
```javascript
console.log(gsap.globalTimeline.getChildren().length + " animaciones activas");
```

Si el número es muy alto (>100), significa que hay muchas animaciones simultáneas.

---

## PASO 10: DESPLEGAR EN PRODUCCIÓN

1. Minifica `animaciones.js` (opcional, pero recomendado para velocidad)
2. Verifica que los CDN de GSAP estén en la versión más reciente
3. Prueba en todos los navegadores nuevamente
4. Mide Core Web Vitals (LCP, FID, CLS) con PageSpeed Insights
5. Optimiza si es necesario

---

## 📊 RESUMEN FINAL

| Paso | Qué hacer | Tiempo |
|------|-----------|--------|
| 1 | Añadir CDN GSAP en HTML | 2 min |
| 2 | Copiar código animaciones | 5 min |
| 3 | Verificar selectores | 10 min |
| 4 | Probar en navegador | 5 min |
| 5 | Personalizar (si quieres) | 15 min |
| 6 | Optimizar para móvil | 10 min |
| 7 | Debuggear problemas | 15 min |
| 8 | Agregar animaciones extra | 20 min |
| 9 | Testing completo | 15 min |
| **TOTAL** | | **~90 min** |

---

## 🎉 ¡Listo!

Una vez terminado, tu sitio web debe:
- ✅ Animar CADA sección al scroll
- ✅ Tener hover effects elegantes
- ✅ Validación visual en formularios
- ✅ Sentirse profesional y moderno
- ✅ Cargar rápido y sin jerks

---

**Última actualización**: 22 de mayo de 2026  
**Para**: Dra. Wandy Mejía - Nutrióloga Clínica  
**Versión**: 1.0
