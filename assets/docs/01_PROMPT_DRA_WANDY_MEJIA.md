# 🎯 BRIEF EXIGENTE DE REDISEÑO - DRA. WANDY MEJÍA NUTRIÓLOGA CLÍNICA

## 📋 INFORMACIÓN DEL PROYECTO

**Cliente**: Dra. Wandy Mejía  
**Especialidad**: Nutrióloga Clínica  
**Ubicación**: Santo Domingo, República Dominicana  
**Objetivos principales**:
1. Convertir la landing page en una **experiencia visual impactante** desde el primer scroll
2. Elevar la percepción de **profesionalismo y confianza**
3. Animar TODAS las secciones (no solo el hero)
4. Hacer que **cita.html y registro.html sean irresistibles** para agendar

---

## 🎨 ANÁLISIS ACTUAL - PROBLEMAS Y OPORTUNIDADES

### ✅ Lo que está BIEN
- ✓ Hero con video de fondo está bien
- ✓ Estructura HTML sólida y semántica
- ✓ Navbar funcional y clara
- ✓ Contenido bien organizado
- ✓ Paleta de colores rosa (#d4788c) y verde (#7ba58b) es coherente

### ❌ Lo que NECESITA MEJORAR
- **index.html**: Secciones "Sobre mí", "Servicios", "Testimonios" son planas sin animaciones
- **servicios.html**: Tarjetas de servicios sin movimiento, no tienen atractivo visual
- **cita.html**: 4 ubicaciones con mapas integrados pero SIN animaciones, se ve funcional pero aburrido
- **registro.html**: Formulario básico sin validación visual, sin feedback al usuario
- **Animaciones generales**: Solo el hero tiene animaciones, todo lo demás está estático al scroll

### 🎯 Oportunidades de mejora inmediata
1. **Scroll reveals**: Las secciones deben aparecer con animaciones elegantes
2. **Hover effects**: Botones, tarjetas y enlaces deben tener feedback visual
3. **Focus states**: Formularios necesitan validación visual clara
4. **Ubicaciones en cita.html**: Los 4 consultorios deben diferenciarse con animaciones y entrar escalonadamente
5. **Servic ios en servicios.html**: Cada servicio debe tener efecto 3D sutil al hover

---

## 🏥 SERVICIOS ESPECÍFICOS DE LA DRA. WANDY (que deben animarse)

### En **index.html** - Servicios destacados:
1. **Consultas Virtuales** - Online, flexible
2. **Nutrición Funcional** - Metabolismo e intestinal
3. **Control de Peso** - Enfoque hormonal y metabólico

### En **servicios.html** - Todos los servicios:
1. **Consultas Virtuales** - Conexión segura, privacidad
2. **Nutrición Funcional** - Microbiota, metabolismo humano
3. **Control de Peso** - Mujeres con enfoque metabólico/hormonal
4. **Nutrición Pediátrica** - Infancia y selectividad alimentaria
5. **Autismo (TEA)** - Abordaje nutricional especializado
6. **TDAH** - Nutrición para mejora cognitiva
7. **Mal Comedor** - Selectividad alimentaria infantil

### Ubicaciones en **cita.html** - 4 Consultorios:
1. **Consultas Virtuales** - Flexible, desde casa
   - Horario: Flexible (previa cita)
   - Imagen: Foto de la doctora en video call

2. **SINAD SALUD**
   - Días: Martes y Jueves
   - Horario: 2:00pm - 8:00pm
   - Teléfono: 809-542-8898
   - Dirección: C. Eugenio Deschamps 2, Santo Domingo
   - Mapa: Ya integrado

3. **MedKids Center**
   - Días: Miércoles
   - Horario: 4:00pm - 8:00pm
   - Teléfono: 809-569-1072
   - Ubicación: Santo Domingo
   - Mapa: Ya integrado

4. **INSIGHT**
   - Días: Viernes
   - Horario: 2:00pm - 7:00pm
   - Teléfono: 849-262-1997
   - Ubicación: Santo Domingo
   - Mapa: Ya integrado

---

## ✨ ANIMACIONES REQUERIDAS POR PÁGINA

### **index.html**

#### Hero (Ya está bien, solo mejorar)
- ✓ Video zoom sutil al scroll
- ✓ Blur dinámico en overlay
- ✓ Texto con reveal (palabra por palabra)
- ✓ Botón "AGENDAR CITA" con pulse animation

#### Sección "Sobre Mí"
- 🔴 Foto de la doctora: Scale up + fade in al entrar en viewport
- 🔴 Nombre y título: Slide in desde la derecha
- 🔴 Especialidades (3 items): Cada una aparece con stagger delay
- 🔴 Badges (SODONUCLIM, CAID, etc): Aparecen rotando sutilmente
- 🔴 Botón "Agendar consulta": Hover con glow rosa

#### Sección "Certificaciones"
- 🔴 Títulos: Fade in + slide down
- 🔴 Cards del slider: Cada una entra con scale + fade
- 🔴 Slider automático ya está, solo mejorar transiciones

#### Sección "Servicios" (3 servicios destacados)
- 🔴 Tarjeta 1 (Virtuales): Slide in desde la izquierda
- 🔴 Tarjeta 2 (Funcional): Slide in desde el centro con delay
- 🔴 Tarjeta 3 (Peso): Slide in desde la derecha
- 🔴 Hover en cada tarjeta: Levantamiento suave (lift) + shadow glow
- 🔴 Iconos dentro: Rotación + cambio de color al hover
- 🔴 Botones: Scale + glow rosa

#### Sección "¿Por Qué Elegirnos?" (3 beneficios)
- 🔴 Cards: Aparecen con stagger
- 🔴 Números: Counter animation (0 → 100%)
- 🔴 Iconos: Pulsing animation sutil

#### Sección "Testimonios"
- 🔴 Carrusel: Fade + scale transitions suaves
- 🔴 Estrellas de rating: Aparecen animadas
- 🔴 Cards: Parallax efecto sutil
- 🔴 Cursor follower mejorado: Blobs luminosos rosa que siguen el cursor

#### Sección "Blog/Conferencias"
- 🔴 Slider ya existe, mejorar transiciones
- 🔴 Títulos: Aparecen con reveal
- 🔴 Números de año/eventos: Counter animation

---

### **servicios.html**

#### Hero
- 🔴 Título: Slide down con fade
- 🔴 Fondo: Parallax sutil
- 🔴 Overlay: Fade in elegante

#### Cada tarjeta de servicio (7 total)
- 🔴 Entrada: Staggered desde abajo (delay entre 0.1s, 0.2s, 0.3s, etc.)
- 🔴 Hover effect 3D sutil:
  - `transform: rotateY(5deg) rotateX(-5deg)`
  - Elevation con shadow
  - Border color change a primary
- 🔴 Imagen: Zoom on hover (1.05x) con filter brightness
- 🔴 Botón "Agendar": Scale + glow
- 🔴 Descripción: Reveal text con animation

#### Sección "Conferencias"
- 🔴 Título: Fade in
- 🔴 Slider: Transiciones suaves
- 🔴 Cards: Imagen zoom, texto fade in

#### Banner final con CTA
- 🔴 Video background con ken burns effect (zoom muy lento)
- 🔴 Botones: Floating animation + glow
- 🔴 Texto: Aparece con reveal

---

### **cita.html**

#### Hero
- 🔴 Igual que servicios.html

#### Título "Consulta Nuestras Ubicaciones"
- 🔴 H3: Fade in + slide down
- 🔴 Párrafo descriptivo: Fade in con delay

#### 4 Tarjetas de Ubicaciones
- 🔴 **VIRTUAL (primera)**:
  - Slide in desde la izquierda
  - Hover: Elevation + border glow rosa
  
- 🔴 **SINAD SALUD (segunda)**:
  - Slide in desde arriba con delay 0.2s
  - Mapa: Zoom fade in al hover
  - Teléfono e info: Reveal con animation
  
- 🔴 **MedKids Center (tercera)**:
  - Slide in con delay 0.4s
  - Mismo efecto que SINAD
  
- 🔴 **INSIGHT (cuarta)**:
  - Slide in con delay 0.6s
  - Mismo efecto

#### Botones "Ir al Registro de Cita"
- 🔴 Hover: Scale + glow + pulse animation
- 🔴 Color: Primary rosa (#d4788c)

#### Sección "Contacto Directo"
- 🔴 Fade in + slide up

---

### **registro.html**

#### Hero
- 🔴 Igual estructura

#### Formulario
- 🔴 **Campos (nombre, email, teléfono, etc)**:
  - Fade in staggered
  - Focus state: Border glow rosa, shadow expande
  - Labels: Float up on focus (material design)
  
- 🔴 **Select "Consultorio de preferencia"**:
  - Focus: Border color primary, glow
  - Hover: Slight elevation
  
- 🔴 **Textarea "Motivo de consulta"**:
  - Focus: Glow effect
  - Resize allowed con cursor
  
- 🔴 **Botón "PROGRAMAR CITA POR WHATSAPP"**:
  - Hover: Scale(1.05) + glow rosa intenso
  - Click: Ripple effect
  - Disabled state: Opacidad reducida
  
- 🔴 **Mensaje de seguridad**:
  - Fade in debajo del formulario
  - Icono de candado con pequeña animación

#### Validación de campos
- 🔴 Error: Shake animation + border roja
- 🔴 Éxito: Checkmark animation (opcional)
- 🔴 Messages de error: Slide in desde abajo

---

## 🎨 PALETA DE COLORES - USO COHERENTE

```
Primary (Rosa):       #d4788c  → Para botones, hover, acciones
Primary Light:        #e8a4b8  → Para backgrounds sutiles, overlays
Primary Dark:         #b85c74  → Para hover oscuro, text en rosa

Secondary (Verde):    #7ba58b  → Para acentos, badges
Secondary Light:      #9bc0ab  → Para backgrounds verdes

Neutral:              #ffffff  → Backgrounds
Gray Light:           #f5f5f5  → Backgrounds secciones
Gray:                 #e0e0e0  → Bordes
Text Dark:            #2c2c2c  → Títulos principales
Text Muted:           #666666  → Descripción
```

### Uso específico en animaciones:
- **Botones**: Background primary (#d4788c), hover darker (#b85c74)
- **Glow effects**: Usar primary con opacity 0.3-0.5
- **Overlays en hover**: Usar primary-light con 10-20% opacity
- **Borders on focus**: Usar primary con 2px width
- **Text on colored**: Usar text-dark o white dependiendo contraste

---

## 🎬 TÉCNICAS DE ANIMACIÓN ESPECÍFICAS

### Para scroll reveals (GSAP ScrollTrigger)
```javascript
gsap.from(".elemento", {
  opacity: 0,
  y: 30,  // Slide up desde 30px abajo
  duration: 0.8,
  scrollTrigger: {
    trigger: ".elemento",
    start: "top 80%",  // Cuando 80% del viewport de arriba alcanza el elemento
    toggleActions: "play none none none"
  }
});
```

### Para stagger (entrada escalonada)
```javascript
gsap.from(".service-card", {
  opacity: 0,
  y: 40,
  duration: 0.8,
  stagger: 0.15,  // 150ms de delay entre cada elemento
  scrollTrigger: { trigger: ".services", start: "top 80%" }
});
```

### Para hover 3D sutil
```css
.service-card:hover {
  transform: translateY(-8px) rotateY(2deg) rotateX(-2deg);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### Para glow effects
```css
.btn-primary:hover {
  box-shadow: 0 0 20px rgba(212, 120, 140, 0.5);
}
```

### Para counter animations
```javascript
let obj = { value: 0 };
gsap.to(obj, {
  value: 100,
  duration: 2,
  onUpdate: () => {
    document.querySelector(".counter").textContent = Math.round(obj.value);
  },
  scrollTrigger: { trigger: ".counter", start: "top 80%" }
});
```

---

## 📊 MÉTRICAS DE ÉXITO

- ✅ **Cada sección tiene animación**: Ninguna sección debe verse plana
- ✅ **Cita.html es atractiva**: Las 4 ubicaciones diferenciadas y animadas
- ✅ **Registro.html motiva**: Form con validación visual clara
- ✅ **Colores integrados**: Todos los hover/focus usan paleta rosa/verde
- ✅ **Performance**: LCP < 2.5s, sin janky animations
- ✅ **Mobile friendly**: Animaciones funcionen en dispositivos pequeños

---

## 🚀 PRIORIDADES DE IMPLEMENTACIÓN

### Fase 1 (CRÍTICA)
- [ ] Instalar GSAP 3.12+ y ScrollTrigger CDN
- [ ] Animar Hero index.html (mejorar lo existente)
- [ ] Animar sección "Sobre Mí"
- [ ] Animar "Servicios destacados" (3 cards)

### Fase 2 (ALTA)
- [ ] Animar sección "Testimonios"
- [ ] Animar sección "Certificaciones"
- [ ] Mejorar servicios.html (7 tarjetas stagger)
- [ ] Animar cita.html (4 ubicaciones)

### Fase 3 (MEDIA)
- [ ] Animar registro.html (formulario)
- [ ] Validación visual en campos
- [ ] Focus animations en inputs
- [ ] Hover effects en botones

### Fase 4 (POLISH)
- [ ] Optimizar performance
- [ ] Test responsive en móvil
- [ ] Cumplir prefers-reduced-motion
- [ ] QA y ajustes finales

---

## 📚 LIBRERÍAS A USAR

**Obligatorio:**
- GSAP 3.12+ (animaciones principales)
- ScrollTrigger plugin (scroll-based animations)
- Font Awesome 6.5+ (ya está en proyecto)
- Swiper 11 (ya está en proyecto)

**Opcional pero recomendado:**
- AOS (para animaciones simples como fallback)

---

## 💬 TONO Y VIBE GENERAL

La doctora es **profesional, cercana y confiable**. Las animaciones deben reflejar:
- ✨ Elegancia pero accesible
- ✨ Confianza sin arrogancia
- ✨ Movimiento suave, no caótico
- ✨ Colores rosa y verde transmitiendo calidez y frescura
- ✨ Cada animación debe tener propósito (guiar, informar, confortar)

---

## 📝 NOTAS FINALES

1. **Coherencia es clave**: Todas las animaciones deben sentirse parte del mismo sistema
2. **Timing matters**: Duración 0.6-1s para la mayoría, más cortas (0.3s) para hover
3. **Easing personalizado**: Usa `cubic-bezier(0.34, 1.56, 0.64, 1)` para efecto "bouncy" elegante
4. **Accesibilidad**: Respeta `prefers-reduced-motion` en todos los casos
5. **Test constante**: Prueba en Chrome, Firefox, Safari, Edge, móvil iOS y Android

---

**Documento creado**: 22 de mayo de 2026  
**Especialización**: 100% Dra. Wandy Mejía Nutrióloga Clínica  
**Versión**: 1.0 - Ready to implement
