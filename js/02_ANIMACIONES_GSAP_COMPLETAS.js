// ============================================
// ANIMACIONES GSAP PARA DRA. WANDY MEJÍA
// ============================================
// Agregar este código a tu scripts.js o crear un archivo animaciones.js

// 1. REGISTRAR EL PLUGIN SCROLLTRIGGER
gsap.registerPlugin(ScrollTrigger);

// 2. CONFIGURACIÓN GLOBAL DE EASING
const easeElastic = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const easeSmoooth = "power2.out";

// ============================================
// ANIMACIONES PARA index.html
// ============================================

// --- HERO SECTION MEJORADO ---
function animateHero() {
  const heroVideo = document.getElementById('heroVideo');
  const heroContent = document.querySelector('.hero-content');
  
  if (heroContent) {
    // Fade in y slide up del contenido
    gsap.from(heroContent, {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.3,
      ease: easeSmoooth
    });
    
    // Pulse animation en botón hero
    const btnHero = heroContent.querySelector('a.btn-primary');
    if (btnHero) {
      gsap.fromTo(btnHero, 
        { boxShadow: "0 10px 20px rgba(212, 120, 140, 0.3)" },
        { 
          boxShadow: "0 15px 35px rgba(212, 120, 140, 0.5)",
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          delay: 1.2
        }
      );
    }
  }
  
  // Parallax leve en video
  gsap.to(heroVideo, {
    scale: 1.05,
    ease: "none",
    scrollTrigger: {
      trigger: "#inicio",
      start: "top top",
      end: "bottom top",
      scrub: 1,
      markers: false
    }
  });
}

// --- SECCIÓN "SOBRE MÍ" ANIMADA ---
function animateAboutSection() {
  const profileSection = document.querySelector('.profile-section');
  
  if (!profileSection) return;
  
  // Foto: Scale + fade in
  const photoImg = profileSection.querySelector('.photo-image');
  if (photoImg) {
    gsap.from(photoImg, {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      scrollTrigger: {
        trigger: '#sobre-mi',
        start: "top 70%",
        toggleActions: "play none none none"
      },
      ease: easeSmoooth
    });
  }
  
  // Nombre y título: Slide in desde la derecha
  const nameBlock = profileSection.querySelector('.name-block');
  if (nameBlock) {
    gsap.from(nameBlock, {
      opacity: 0,
      x: 50,
      duration: 0.8,
      delay: 0.3,
      scrollTrigger: {
        trigger: '#sobre-mi',
        start: "top 70%"
      },
      ease: easeSmoooth
    });
  }
  
  // Eyebrow (subtítulo): Fade in
  const eyebrow = profileSection.querySelector('.eyebrow');
  if (eyebrow) {
    gsap.from(eyebrow, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.5,
      scrollTrigger: {
        trigger: '#sobre-mi',
        start: "top 70%"
      },
      ease: easeSmoooth
    });
  }
  
  // Bio text: Fade in
  const bioText = profileSection.querySelector('.bio-text');
  if (bioText) {
    gsap.from(bioText, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.7,
      scrollTrigger: {
        trigger: '#sobre-mi',
        start: "top 70%"
      },
      ease: easeSmoooth
    });
  }
  
  // Quote card: Fade in con estilo
  const quoteCard = profileSection.querySelector('.quote-card');
  if (quoteCard) {
    gsap.from(quoteCard, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.9,
      scrollTrigger: {
        trigger: '#sobre-mi',
        start: "top 70%"
      },
      ease: easeSmoooth
    });
  }
  
  // Specialties: Stagger animation
  const specialtyItems = profileSection.querySelectorAll('.specialty-item');
  gsap.from(specialtyItems, {
    opacity: 0,
    x: 30,
    duration: 0.6,
    stagger: 0.15,
    delay: 1.1,
    scrollTrigger: {
      trigger: '#sobre-mi',
      start: "top 70%"
    },
    ease: easeSmoooth
  });
  
  // Badges: Rotate + fade in
  const badges = profileSection.querySelectorAll('.badge');
  gsap.from(badges, {
    opacity: 0,
    rotation: -15,
    scale: 0.8,
    duration: 0.6,
    stagger: 0.1,
    delay: 1.4,
    scrollTrigger: {
      trigger: '#sobre-mi',
      start: "top 70%"
    },
    ease: easeElastic
  });
  
  // CTA button: Fade in
  const ctaBtn = profileSection.querySelector('.cta-btn');
  if (ctaBtn) {
    gsap.from(ctaBtn, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 1.6,
      scrollTrigger: {
        trigger: '#sobre-mi',
        start: "top 70%"
      },
      ease: easeSmoooth
    });
  }
}

// --- SECCIÓN "SERVICIOS DESTACADOS" (3 cards) ---
function animateServicesCards() {
  const serviceCards = document.querySelectorAll('.service-card');
  
  if (serviceCards.length === 0) return;
  
  // Stagger entrada de tarjetas
  gsap.from(serviceCards, {
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
      trigger: "#servicios",
      start: "top 75%",
      toggleActions: "play none none none"
    },
    ease: easeSmoooth
  });
  
  // Hover animations para cada tarjeta
  serviceCards.forEach(card => {
    // Hover state
    card.addEventListener('mouseenter', function() {
      gsap.to(this, {
        y: -12,
        boxShadow: "0 20px 50px rgba(212, 120, 140, 0.25)",
        duration: 0.3,
        ease: easeSmoooth
      });
      
      // Animar icono
      const icon = this.querySelector('.service-icon');
      if (icon) {
        gsap.to(icon, {
          scale: 1.2,
          rotation: 15,
          color: "#b85c74",
          duration: 0.3
        });
      }
    });
    
    // Mouse leave
    card.addEventListener('mouseleave', function() {
      gsap.to(this, {
        y: 0,
        boxShadow: "0 4px 15px rgba(212, 120, 140, 0.08)",
        duration: 0.3,
        ease: easeSmoooth
      });
      
      const icon = this.querySelector('.service-icon');
      if (icon) {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          color: "#d4788c",
          duration: 0.3
        });
      }
    });
  });
}

// --- SECCIÓN "TESTIMONIOS" MEJORADA ---
function animateTestimonials() {
  const testimonialSection = document.querySelector('[id*="testimonio"]') || 
                             document.querySelector('.testimonials');
  
  if (!testimonialSection) return;
  
  // Título fade in
  const title = testimonialSection.querySelector('h2');
  if (title) {
    gsap.from(title, {
      opacity: 0,
      y: -30,
      duration: 0.8,
      scrollTrigger: {
        trigger: testimonialSection,
        start: "top 75%"
      },
      ease: easeSmoooth
    });
  }
  
  // Cards del carrusel: Scale + fade
  const testimonialCards = testimonialSection.querySelectorAll('.testimonial-card');
  gsap.from(testimonialCards, {
    opacity: 0,
    scale: 0.9,
    duration: 0.6,
    stagger: 0.15,
    scrollTrigger: {
      trigger: testimonialSection,
      start: "top 70%"
    },
    ease: easeElastic
  });
  
  // Stars rating animation
  const starRatings = testimonialSection.querySelectorAll('.rating');
  starRatings.forEach(rating => {
    const stars = rating.querySelectorAll('.star');
    gsap.from(stars, {
      opacity: 0,
      scale: 0,
      duration: 0.4,
      stagger: 0.1,
      scrollTrigger: {
        trigger: testimonialSection,
        start: "top 70%"
      },
      ease: easeElastic
    });
  });
}

// --- SECCIÓN "CERTIFICACIONES" ---
function animateCertifications() {
  const certSection = document.querySelector('.certifications');
  
  if (!certSection) return;
  
  const title = certSection.querySelector('.certifications-title');
  if (title) {
    gsap.from(title, {
      opacity: 0,
      y: -30,
      duration: 0.8,
      scrollTrigger: {
        trigger: certSection,
        start: "top 75%"
      },
      ease: easeSmoooth
    });
  }
}

// ============================================
// ANIMACIONES PARA servicios.html
// ============================================

// --- 7 TARJETAS DE SERVICIOS CON STAGGER Y 3D ---
function animateServiceCards3D() {
  const serviceCards = document.querySelectorAll('.service-card, .service-item');
  
  if (serviceCards.length === 0) return;
  
  // Entrada escalonada
  gsap.from(serviceCards, {
    opacity: 0,
    y: 60,
    rotation: 2,
    duration: 0.9,
    stagger: 0.15,
    scrollTrigger: {
      trigger: ".services-container, [class*='service']",
      start: "top 75%",
      toggleActions: "play none none none"
    },
    ease: easeSmoooth
  });
  
  // Hover 3D effect
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      gsap.to(this, {
        y: -15,
        rotateY: 5,
        rotateX: -3,
        boxShadow: "0 25px 50px rgba(212, 120, 140, 0.3)",
        borderColor: "#d4788c",
        duration: 0.3,
        ease: easeSmoooth
      });
      
      // Imagen zoom
      const img = this.querySelector('img');
      if (img) {
        gsap.to(img, {
          scale: 1.1,
          filter: "brightness(1.15)",
          duration: 0.3
        });
      }
    });
    
    card.addEventListener('mouseleave', function() {
      gsap.to(this, {
        y: 0,
        rotateY: 0,
        rotateX: 0,
        boxShadow: "0 4px 15px rgba(212, 120, 140, 0.08)",
        borderColor: "var(--gray)",
        duration: 0.3,
        ease: easeSmoooth
      });
      
      const img = this.querySelector('img');
      if (img) {
        gsap.to(img, {
          scale: 1,
          filter: "brightness(1)",
          duration: 0.3
        });
      }
    });
  });
}

// ============================================
// ANIMACIONES PARA cita.html
// ============================================

// --- 4 TARJETAS DE UBICACIONES CON STAGGER ---
function animateLocationCards() {
  const locationCards = document.querySelectorAll('.consultorio-mini-card');
  
  if (locationCards.length === 0) return;
  
  // Entrada escalonada (0s, 0.2s, 0.4s, 0.6s)
  gsap.from(locationCards, {
    opacity: 0,
    y: 80,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".consultorio-mini-card:first-of-type",
      start: "top 75%",
      toggleActions: "play none none none"
    },
    ease: easeSmoooth
  });
  
  // Hover effect para cada tarjeta
  locationCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      gsap.to(this, {
        y: -10,
        boxShadow: "0 20px 45px rgba(212, 120, 140, 0.25)",
        borderColor: "#d4788c",
        duration: 0.3,
        ease: easeSmoooth
      });
      
      // Zoom en mapa/imagen
      const map = this.querySelector('iframe');
      const img = this.querySelector('img');
      if (map) {
        gsap.to(map, {
          scale: 1.05,
          duration: 0.3
        });
      }
      if (img) {
        gsap.to(img, {
          scale: 1.08,
          duration: 0.3
        });
      }
    });
    
    card.addEventListener('mouseleave', function() {
      gsap.to(this, {
        y: 0,
        boxShadow: "0 4px 15px rgba(212, 120, 140, 0.08)",
        borderColor: "var(--gray)",
        duration: 0.3,
        ease: easeSmoooth
      });
      
      const map = this.querySelector('iframe');
      const img = this.querySelector('img');
      if (map) {
        gsap.to(map, {
          scale: 1,
          duration: 0.3
        });
      }
      if (img) {
        gsap.to(img, {
          scale: 1,
          duration: 0.3
        });
      }
    });
  });
}

// --- BOTONES DE UBICACIONES CON GLOW ---
function animateLocationButtons() {
  const buttons = document.querySelectorAll('.consultorio-mini-card .btn-primary');
  
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      gsap.to(this, {
        scale: 1.05,
        boxShadow: "0 10px 30px rgba(212, 120, 140, 0.5)",
        duration: 0.2
      });
    });
    
    btn.addEventListener('mouseleave', function() {
      gsap.to(this, {
        scale: 1,
        boxShadow: "0 4px 12px rgba(212, 120, 140, 0.2)",
        duration: 0.2
      });
    });
  });
}

// ============================================
// ANIMACIONES PARA registro.html
// ============================================

// --- FORMULARIO CON VALIDACIÓN VISUAL ---
function animateFormFields() {
  const formGroups = document.querySelectorAll('.form-group');
  
  // Entrada staggered
  gsap.from(formGroups, {
    opacity: 0,
    y: 30,
    duration: 0.6,
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".form-card, form",
      start: "top 70%"
    },
    ease: easeSmoooth
  });
  
  // Focus animations
  formGroups.forEach(group => {
    const input = group.querySelector('input, select, textarea');
    
    if (input) {
      input.addEventListener('focus', function() {
        gsap.to(this, {
          boxShadow: "0 0 0 4px rgba(212, 120, 140, 0.2), 0 0 12px rgba(212, 120, 140, 0.3)",
          borderColor: "#d4788c",
          duration: 0.2
        });
        
        // Label float up (si existe)
        const label = group.querySelector('label');
        if (label && this.value === '') {
          gsap.to(label, {
            fontSize: "12px",
            color: "#d4788c",
            duration: 0.2
          });
        }
      });
      
      input.addEventListener('blur', function() {
        if (this.value === '') {
          gsap.to(this, {
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
            borderColor: "var(--gray)",
            duration: 0.2
          });
          
          const label = group.querySelector('label');
          if (label) {
            gsap.to(label, {
              fontSize: "14px",
              color: "#333",
              duration: 0.2
            });
          }
        }
      });
    }
  });
}

// --- VALIDACIÓN CON ANIMACIONES ---
function setupFormValidation() {
  const form = document.getElementById('citaForm');
  
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fields = this.querySelectorAll('input[required], select[required], textarea[required]');
    let hasErrors = false;
    
    fields.forEach(field => {
      const isValid = field.value.trim() !== '';
      
      if (!isValid) {
        // Shake animation para error
        gsap.to(field, {
          x: -10,
          duration: 0.1,
          repeat: 5,
          yoyo: true,
          onComplete: function() {
            gsap.to(field, { x: 0 });
          }
        });
        
        // Borde rojo
        gsap.to(field, {
          borderColor: "#dc3545",
          boxShadow: "0 0 12px rgba(220, 53, 69, 0.3)",
          duration: 0.2
        });
        
        hasErrors = true;
      } else {
        // Borde verde (éxito)
        gsap.to(field, {
          borderColor: "#7ba58b",
          duration: 0.2
        });
      }
    });
    
    if (!hasErrors) {
      // Animación de envío
      gsap.to(form, {
        opacity: 0.5,
        duration: 0.5,
        onComplete: function() {
          form.submit();
        }
      });
    }
  });
}

// --- BOTÓN SUBMIT CON RIPPLE EFFECT ---
function setupSubmitButton() {
  const submitBtn = document.querySelector('button[type="submit"]');
  
  if (!submitBtn) return;
  
  submitBtn.addEventListener('mouseenter', function() {
    gsap.to(this, {
      scale: 1.05,
      boxShadow: "0 15px 35px rgba(212, 120, 140, 0.4)",
      duration: 0.2
    });
  });
  
  submitBtn.addEventListener('mouseleave', function() {
    gsap.to(this, {
      scale: 1,
      boxShadow: "0 10px 20px rgba(212, 120, 140, 0.3)",
      duration: 0.2
    });
  });
}

// ============================================
// EFECTOS GLOBALES PARA TODOS
// ============================================

// --- HOVER EFFECT EN TODOS LOS BOTONES ---
function setupAllButtonHovers() {
  const buttons = document.querySelectorAll('.btn-primary, .btn-outline, .cta-btn');
  
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      if (!this.classList.contains('disabled')) {
        gsap.to(this, {
          scale: 1.05,
          duration: 0.2,
          ease: easeSmoooth
        });
      }
    });
    
    btn.addEventListener('mouseleave', function() {
      gsap.to(this, {
        scale: 1,
        duration: 0.2
      });
    });
    
    btn.addEventListener('mousedown', function() {
      gsap.to(this, {
        scale: 0.98,
        duration: 0.1
      });
    });
    
    btn.addEventListener('mouseup', function() {
      gsap.to(this, {
        scale: 1.05,
        duration: 0.1
      });
    });
  });
}

// --- CURSOR FOLLOWER (BLOBS LUMINOSOS) ---
function setupCursorFollower() {
  if (window.innerWidth < 768) return; // Skip en móvil
  
  const section = document.querySelector('[id*="testimonio"], .testimonials');
  if (!section) return;
  
  let mouse = { x: 0, y: 0 };
  
  section.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX - section.getBoundingClientRect().left;
    mouse.y = e.clientY - section.getBoundingClientRect().top;
    
    const blobs = section.querySelectorAll('.blob, .particle');
    blobs.forEach((blob, index) => {
      gsap.to(blob, {
        x: mouse.x + (Math.random() - 0.5) * 100,
        y: mouse.y + (Math.random() - 0.5) * 100,
        duration: 0.5 + index * 0.1,
        overwrite: 'auto'
      });
    });
  });
}

// ============================================
// EJECUTAR TODAS LAS ANIMACIONES
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  // index.html
  animateHero();
  animateAboutSection();
  animateServicesCards();
  animateTestimonials();
  animateCertifications();
  
  // servicios.html
  animateServiceCards3D();
  
  // cita.html
  animateLocationCards();
  animateLocationButtons();
  
  // registro.html
  animateFormFields();
  setupFormValidation();
  setupSubmitButton();
  
  // Global
  setupAllButtonHovers();
  setupCursorFollower();
});

// Reiniciar ScrollTrigger después de que todas las imágenes carguen
window.addEventListener('load', function() {
  ScrollTrigger.refresh();
});
