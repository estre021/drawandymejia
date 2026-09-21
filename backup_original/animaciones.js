// ============================================
// ANIMACIONES GSAP PARA DRA. WANDY MEJÍA
// ============================================

// 1. REGISTRAR EL PLUGIN SCROLLTRIGGER
gsap.registerPlugin(ScrollTrigger);

// 2. CONFIGURACIÓN MÓVIL / GLOBAL
const isMobile = window.innerWidth <= 768;
const durationVal = isMobile ? 0.6 : 1.0;
const staggerVal = isMobile ? 0.1 : 0.2;

// ============================================
// ANIMACIONES PARA index.html
// ============================================

// Hero zoom and blur on scroll (Wix Studio style)
function animateHero() {
  const heroSection = document.getElementById('inicio');
  if (!heroSection) return;
  
  const heroVideo = document.getElementById('heroVideo');
  const heroBlur = document.getElementById('heroBlur');
  const heroContent = heroSection.querySelector('.hero-content');
  
  if (heroContent) {
    // Fade in and slide up hero text on load
    gsap.from(heroContent, {
      opacity: 0,
      y: 50,
      duration: durationVal + 0.2,
      delay: 0.3,
      ease: "power2.out"
    });
    
    // Pulse animation for hero button
    const btnHero = heroContent.querySelector('a.btn-primary');
    if (btnHero) {
      gsap.fromTo(btnHero, 
        { boxShadow: "0 10px 20px rgba(212, 120, 140, 0.3)" },
        { 
          boxShadow: "0 15px 35px rgba(212, 120, 140, 0.6)",
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          delay: 1.2
        }
      );
    }
  }
  
  // Parallax / scale video on scroll
  if (heroVideo) {
    gsap.to(heroVideo, {
      scale: 1.15,
      ease: "none",
      scrollTrigger: {
        trigger: "#inicio",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }
  
  // Blur and overlay opacity scroll effect
  if (heroBlur) {
    gsap.fromTo(heroBlur, 
      { backdropFilter: "blur(10px)", backgroundColor: "rgba(18, 18, 29, 0.55)" },
      { 
        backdropFilter: "blur(6px)", 
        duration: 2, 
        delay: 0.3,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(heroBlur, {
            backdropFilter: "blur(0px)",
            backgroundColor: "rgba(18, 18, 29, 0.8)",
            ease: "none",
            scrollTrigger: {
              trigger: "#inicio",
              start: "top top",
              end: "bottom top",
              scrub: true
            }
          });
        }
      }
    );
  }
}

// Background scale animations for other sections
function setupBackgroundVideoScroll() {
  // Services Section Background
  const servicesVideo = document.getElementById('servicesVideo');
  if (servicesVideo) {
    gsap.to(servicesVideo, {
      scale: 1.12,
      ease: "none",
      scrollTrigger: {
        trigger: "#servicios",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }

  // Banner Section Background
  const bannerVideo = document.getElementById('bannerVideo');
  const bannerSection = document.querySelector('.banner-cita');
  if (bannerVideo && bannerSection) {
    gsap.fromTo(bannerVideo, 
      { scale: 1.15 },
      {
        scale: 1.0,
        ease: "none",
        scrollTrigger: {
          trigger: bannerSection,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );
  }
}

// About section animations
function animateAboutSection() {
  const profileSection = document.querySelector('.profile-section');
  if (!profileSection) return;
  
  // Image scale and fade in
  const photoImg = profileSection.querySelector('.photo-image');
  if (photoImg) {
    gsap.from(photoImg, {
      opacity: 0,
      scale: 0.9,
      duration: 0.6,
      scrollTrigger: {
        trigger: '#sobre-mi',
        start: "top 75%",
        toggleActions: "play none none none"
      },
      ease: "power2.out"
    });
  }
  
  // Name block slide in
  const nameBlock = profileSection.querySelector('.name-block');
  if (nameBlock) {
    gsap.from(nameBlock, {
      opacity: 0,
      x: isMobile ? 0 : 50,
      y: isMobile ? 30 : 0,
      duration: 0.55,
      delay: 0.08,
      scrollTrigger: {
        trigger: '#sobre-mi',
        start: "top 75%"
      },
      ease: "power2.out"
    });
  }
  
  // Eyebrow subtitle
  const eyebrow = profileSection.querySelector('.eyebrow');
  if (eyebrow) {
    gsap.from(eyebrow, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      delay: 0.12,
      scrollTrigger: {
        trigger: '#sobre-mi',
        start: "top 75%"
      },
      ease: "power2.out"
    });
  }
  
  // Bio text
  const bioText = profileSection.querySelector('.bio-text');
  if (bioText) {
    gsap.from(bioText, {
      opacity: 0,
      y: 20,
      duration: 0.55,
      delay: 0.16,
      scrollTrigger: {
        trigger: '#sobre-mi',
        start: "top 75%"
      },
      ease: "power2.out"
    });
  }
  
  // Quote card
  const quoteCard = profileSection.querySelector('.quote-card');
  if (quoteCard) {
    gsap.from(quoteCard, {
      opacity: 0,
      y: 30,
      duration: 0.55,
      delay: 0.18,
      scrollTrigger: {
        trigger: '#sobre-mi',
        start: "top 75%"
      },
      ease: "power2.out"
    });
  }
  
  // Specialties stagger
  const specialtyItems = profileSection.querySelectorAll('.specialty-item');
  if (specialtyItems.length > 0) {
    gsap.from(specialtyItems, {
      opacity: 0,
      x: isMobile ? 0 : 30,
      y: isMobile ? 20 : 0,
      duration: 0.5,
      stagger: staggerVal / 2,
      delay: 0.2,
      scrollTrigger: {
        trigger: '#sobre-mi',
        start: "top 75%"
      },
      ease: "power2.out"
    });
  }
  
  // Badges rotate + scale in
  const badges = profileSection.querySelectorAll('.badge');
  if (badges.length > 0) {
    gsap.from(badges, {
      opacity: 0,
      rotation: -15,
      scale: 0.8,
      duration: 0.5,
      stagger: staggerVal / 2,
      delay: 0.25,
      scrollTrigger: {
        trigger: '#sobre-mi',
        start: "top 75%"
      },
      ease: "back.out(1.7)"
    });
  }
  
  // CTA Button
  const ctaBtn = profileSection.querySelector('.cta-btn');
  if (ctaBtn) {
    gsap.from(ctaBtn, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      delay: 0.3,
      scrollTrigger: {
        trigger: '#sobre-mi',
        start: "top 75%"
      },
      ease: "power2.out"
    });
  }
}

// 3 Services cards on index.html
function animateServicesCards() {
  const serviceCards = document.querySelectorAll('.services-grid .service-card');
  if (serviceCards.length === 0) return;
  
  serviceCards.forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      y: 50,
      duration: durationVal,
      delay: isMobile ? 0 : index * staggerVal,
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none none"
      },
      ease: "power2.out"
    });
  });
  
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      gsap.to(this, {
        y: -12,
        boxShadow: "0 20px 50px rgba(212, 120, 140, 0.25)",
        duration: 0.3,
        ease: "power2.out"
      });
      
      const icon = this.querySelector('.service-icon');
      if (icon) {
        gsap.to(icon, {
          scale: 1.25,
          rotation: 15,
          color: "#b85c74",
          duration: 0.3
        });
      }
    });
    
    card.addEventListener('mouseleave', function() {
      gsap.to(this, {
        y: 0,
        boxShadow: "0 4px 15px rgba(212, 120, 140, 0.08)",
        duration: 0.3,
        ease: "power2.out"
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

// Testimonials titles, cards and stars
function animateTestimonials() {
  const testimonialSection = document.getElementById('testimonios');
  if (!testimonialSection) return;
  
  const title = testimonialSection.querySelector('.section-title');
  if (title) {
    gsap.from(title, {
      opacity: 0,
      y: -30,
      duration: durationVal,
      scrollTrigger: {
        trigger: testimonialSection,
        start: "top 75%"
      },
      ease: "power2.out"
    });
  }
  
  const subtitle = testimonialSection.querySelector('.testimonials-subtitle');
  if (subtitle) {
    gsap.from(subtitle, {
      opacity: 0,
      y: -20,
      duration: durationVal,
      delay: 0.2,
      scrollTrigger: {
        trigger: testimonialSection,
        start: "top 75%"
      },
      ease: "power2.out"
    });
  }

  // Animamos el Swiper de testimonios completo para evitar conflictos con Swiper
  const testiSwiper = testimonialSection.querySelector('.testiSwiper');
  if (testiSwiper) {
    gsap.from(testiSwiper, {
      opacity: 0,
      y: 40,
      duration: durationVal + 0.2,
      scrollTrigger: {
        trigger: testimonialSection,
        start: "top 70%"
      },
      ease: "power2.out"
    });
  }
  
  // Animación de estrellas al entrar en pantalla
  const starRatings = testimonialSection.querySelectorAll('.rating');
  starRatings.forEach(rating => {
    const stars = rating.querySelectorAll('.star');
    if (stars.length > 0) {
      gsap.from(stars, {
        opacity: 0,
        scale: 0,
        duration: 0.4,
        stagger: 0.08,
        scrollTrigger: {
          trigger: rating,
          start: "top 85%"
        },
        ease: "back.out(1.7)"
      });
    }
  });
}

// Certifications slide up
function animateCertifications() {
  const certSection = document.querySelector('.certifications');
  if (!certSection) return;
  
  const title = certSection.querySelector('.certifications-title');
  if (title) {
    gsap.from(title, {
      opacity: 0,
      y: -30,
      duration: durationVal,
      scrollTrigger: {
        trigger: certSection,
        start: "top 75%"
      },
      ease: "power2.out"
    });
  }

  // Animamos el Swiper de certificaciones completo para evitar conflictos con loop y clones de Swiper
  const certSwiper = certSection.querySelector('.certSwiper');
  if (certSwiper) {
    gsap.from(certSwiper, {
      opacity: 0,
      y: 40,
      duration: durationVal + 0.2,
      scrollTrigger: {
        trigger: certSection,
        start: "top 75%"
      },
      ease: "power2.out"
    });
  }
}

// Section Why Us animation
function animateWhyUs() {
  const whyUsSection = document.querySelector('.why-us');
  if (!whyUsSection) return;
  
  const title = whyUsSection.querySelector('.section-title');
  if (title) {
    gsap.from(title, {
      opacity: 0,
      y: -30,
      duration: durationVal,
      scrollTrigger: {
        trigger: whyUsSection,
        start: "top 75%"
      },
      ease: "power2.out"
    });
  }
  
  const features = whyUsSection.querySelectorAll('.feature');
  if (features.length > 0) {
    features.forEach((feature, index) => {
      gsap.from(feature, {
        opacity: 0,
        y: 35,
        duration: durationVal,
        delay: isMobile ? 0 : index * staggerVal,
        scrollTrigger: {
          trigger: feature,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        ease: "power2.out"
      });
    });
  }
}

// ============================================
// ANIMACIONES PARA servicios.html (Alt Rows)
// ============================================

function animateServiceRows() {
  const serviceRows = document.querySelectorAll('.servicio-alt-row');
  if (serviceRows.length === 0) return;
  
  serviceRows.forEach(row => {
    const imgCol = row.querySelector('.row-image');
    const textCol = row.querySelector('.row-text');
    const isReverse = row.classList.contains('reverse');
    
    // Slide left/right based on reverse configuration
    const imgX = isReverse ? (isMobile ? 0 : 80) : (isMobile ? 0 : -80);
    const textX = isReverse ? (isMobile ? 0 : -80) : (isMobile ? 0 : 80);
    const imgY = isMobile ? 40 : 0;
    const textY = isMobile ? 40 : 0;
    
    if (imgCol && textCol) {
      gsap.from(imgCol, {
        opacity: 0,
        x: imgX,
        y: imgY,
        duration: durationVal + 0.2,
        scrollTrigger: {
          trigger: row,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        ease: "power2.out"
      });
      
      gsap.from(textCol, {
        opacity: 0,
        x: textX,
        y: textY,
        duration: durationVal + 0.2,
        scrollTrigger: {
          trigger: row,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        ease: "power2.out"
      });
    }

    // Hover effect on service row images and icons
    row.addEventListener('mouseenter', () => {
      if (imgCol) {
        const img = imgCol.querySelector('img');
        if (img) {
          gsap.to(img, {
            scale: 1.08,
            filter: "brightness(1.1)",
            duration: 0.4,
            ease: "power2.out"
          });
        }
      }
      if (textCol) {
        const icon = textCol.querySelector('.servicio-icon');
        if (icon) {
          gsap.to(icon, {
            scale: 1.15,
            rotation: 15,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }
    });
    
    row.addEventListener('mouseleave', () => {
      if (imgCol) {
        const img = imgCol.querySelector('img');
        if (img) {
          gsap.to(img, {
            scale: 1.0,
            filter: "brightness(1)",
            duration: 0.4,
            ease: "power2.out"
          });
        }
      }
      if (textCol) {
        const icon = textCol.querySelector('.servicio-icon');
        if (icon) {
          gsap.to(icon, {
            scale: 1.0,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }
    });
  });

  // Services page hero title reveal
  const headerContent = document.querySelector('.page-header-servicios .hero-content');
  if (headerContent) {
    gsap.from(headerContent, {
      opacity: 0,
      y: 30,
      duration: durationVal,
      ease: "power2.out"
    });
  }

  // Conferences section animations
  const confSection = document.querySelector('.conferencias-section');
  if (confSection) {
    const title = confSection.querySelector('.section-title');
    if (title) {
      gsap.from(title, {
        opacity: 0,
        y: -30,
        duration: durationVal,
        scrollTrigger: {
          trigger: confSection,
          start: "top 75%"
        },
        ease: "power2.out"
      });
    }
    
    // Animamos el Swiper de conferencias completo para evitar conflictos
    const confSwiper = confSection.querySelector('.confSwiper');
    if (confSwiper) {
      gsap.from(confSwiper, {
        opacity: 0,
        y: 40,
        duration: durationVal + 0.2,
        scrollTrigger: {
          trigger: confSection,
          start: "top 75%"
        },
        ease: "power2.out"
      });
    }
  }
}

// ============================================
// ANIMACIONES PARA cita.html
// ============================================

// Location cards staggered entrance
function animateLocationCards() {
  const locationCards = document.querySelectorAll('.consultorio-mini-card');
  if (locationCards.length === 0) return;
  
  locationCards.forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      y: 50,
      duration: durationVal,
      delay: isMobile ? 0 : index * staggerVal,
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none none"
      },
      ease: "power2.out"
    });
  });
  
  locationCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      gsap.to(this, {
        y: -10,
        boxShadow: "0 20px 45px rgba(212, 120, 140, 0.25)",
        borderColor: "#d4788c",
        duration: 0.3,
        ease: "power2.out"
      });
      
      const map = this.querySelector('iframe');
      const img = this.querySelector('img');
      if (map) {
        gsap.to(map, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
      }
      if (img) {
        gsap.to(img, {
          scale: 1.08,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });
    
    card.addEventListener('mouseleave', function() {
      gsap.to(this, {
        y: 0,
        boxShadow: "0 4px 15px rgba(212, 120, 140, 0.08)",
        borderColor: "rgba(0,0,0,0.05)",
        duration: 0.3,
        ease: "power2.out"
      });
      
      const map = this.querySelector('iframe');
      const img = this.querySelector('img');
      if (map) {
        gsap.to(map, {
          scale: 1.0,
          duration: 0.3,
          ease: "power2.out"
        });
      }
      if (img) {
        gsap.to(img, {
          scale: 1.0,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    });
  });
}

function animateLocationButtons() {
  const buttons = document.querySelectorAll('.consultorio-mini-card .btn-primary');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      gsap.to(this, {
        scale: 1.03,
        boxShadow: "0 10px 30px rgba(212, 120, 140, 0.5)",
        duration: 0.2
      });
    });
    
    btn.addEventListener('mouseleave', function() {
      gsap.to(this, {
        scale: 1,
        boxShadow: "none",
        duration: 0.2
      });
    });
  });
}

function animateContactoInfo() {
  const contactoInfo = document.querySelector('.contacto-info');
  if (!contactoInfo) return;

  const title = contactoInfo.querySelector('h4');
  if (title) {
    gsap.from(title, {
      opacity: 0,
      y: 20,
      duration: durationVal,
      scrollTrigger: {
        trigger: contactoInfo,
        start: "top 90%",
        toggleActions: "play none none none"
      },
      ease: "power2.out"
    });
  }

  const cards = contactoInfo.querySelectorAll('.contacto-card');
  if (cards.length > 0) {
    gsap.from(cards, {
      opacity: 0,
      y: 30,
      duration: durationVal,
      stagger: staggerVal,
      scrollTrigger: {
        trigger: contactoInfo,
        start: "top 85%",
        toggleActions: "play none none none"
      },
      ease: "back.out(1.2)"
    });
  }
}

// ============================================
// ANIMACIONES PARA registro.html
// ============================================

// Form fields slide up staggered + glow on focus
function animateFormFields() {
  const formGroups = document.querySelectorAll('.form-group');
  if (formGroups.length === 0) return;
  
  gsap.from(formGroups, {
    opacity: 0,
    y: 30,
    duration: durationVal - 0.2,
    stagger: staggerVal / 2,
    scrollTrigger: {
      trigger: "#citaForm",
      start: "top 80%"
    },
    ease: "power2.out"
  });
  
  formGroups.forEach(group => {
    const input = group.querySelector('input, select, textarea');
    if (input) {
      input.addEventListener('focus', function() {
        gsap.to(this, {
          boxShadow: "0 0 0 4px rgba(212, 120, 140, 0.2), 0 0 12px rgba(212, 120, 140, 0.3)",
          borderColor: "#d4788c",
          duration: 0.2
        });
      });
      
      input.addEventListener('blur', function() {
        gsap.to(this, {
          boxShadow: "none",
          borderColor: "rgba(0, 0, 0, 0.1)",
          duration: 0.2
        });
      });
    }
  });
}

// Shake animation for validation errors
function setupFormValidation() {
  const form = document.getElementById('citaForm');
  if (!form) return;
  
  const submitBtn = form.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.addEventListener('click', function(e) {
      // Find invalid fields
      const invalidFields = form.querySelectorAll('input:invalid, select:invalid, textarea:invalid');
      if (invalidFields.length > 0) {
        invalidFields.forEach(field => {
          // Shake effect
          gsap.to(field, {
            x: -10,
            duration: 0.1,
            repeat: 5,
            yoyo: true,
            onComplete: function() {
              gsap.to(field, { x: 0 });
            }
          });
          
          // Red alert outline
          gsap.to(field, {
            borderColor: "#dc3545",
            boxShadow: "0 0 12px rgba(220, 53, 69, 0.3)",
            duration: 0.2
          });
        });
      }
    });
  }
}

function setupSubmitButton() {
  const submitBtn = document.querySelector('button[type="submit"]');
  if (!submitBtn) return;
  
  submitBtn.addEventListener('mouseenter', function() {
    gsap.to(this, {
      scale: 1.03,
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
// GLOBAL BUTTON EFFECTS
// ============================================

function setupAllButtonHovers() {
  const buttons = document.querySelectorAll('.btn-primary, .btn-outline, .cta-btn, .btn-ver-mas, .btn-banner, .btn-banner-outline');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      gsap.to(this, {
        scale: 1.05,
        duration: 0.2,
        ease: "power2.out"
      });
    });
    
    btn.addEventListener('mouseleave', function() {
      gsap.to(this, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out"
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

// Animación de entrada para los heroes de páginas secundarias (contacto, registro, servicios)
function animateSecondaryPageHeroes() {
  const heroSection = document.querySelector('.hero');
  if (!heroSection) return;
  
  const heroOverlay = heroSection.querySelector('.hero-overlay-pink');
  const heroContent = heroSection.querySelector('.hero-content');
  
  if (heroContent) {
    // Desvanecer y deslizar hacia arriba el texto de forma suave (igual que en la home)
    gsap.from(heroContent, {
      opacity: 0,
      y: 50,
      duration: durationVal + 0.2,
      delay: 0.2,
      ease: "power2.out"
    });
  }
  
  if (heroOverlay) {
    // Animación de desenfoque y opacidad de entrada para el fondo rosa
    gsap.fromTo(heroOverlay, 
      { backdropFilter: "blur(18px)", backgroundColor: "rgba(212, 120, 140, 0.95)" },
      { 
        backdropFilter: "blur(8px)", 
        backgroundColor: "rgba(212, 120, 140, 0.75)",
        duration: 1.5, 
        delay: 0.2,
        ease: "power2.out"
      }
    );
  }
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  // Determinar qué página está activa para evitar conflictos cruzados
  const isIndexPage = document.getElementById('inicio') !== null;
  const isServiciosPage = document.querySelector('.servicios-detalle-page') !== null;
  const isCitaPage = document.querySelector('.consultorio-mini-card') !== null;
  const isRegistroPage = document.getElementById('citaForm') !== null;

  if (isIndexPage) {
    animateHero();
    setupBackgroundVideoScroll();
    animateAboutSection();
    animateServicesCards();
    animateWhyUs();
    animateTestimonials();
    animateCertifications();
  } else {
    // Ejecutar animación del Hero en páginas secundarias
    animateSecondaryPageHeroes();

    if (isServiciosPage) {
      animateServiceRows();
    } else if (isCitaPage) {
      animateLocationCards();
      animateLocationButtons();
      animateContactoInfo();
    } else if (isRegistroPage) {
      animateFormFields();
      setupFormValidation();
      setupSubmitButton();
    }
  }
  
  // Global
  setupAllButtonHovers();
});

// Refresh ScrollTrigger on window load to recalculate section heights
window.addEventListener('load', function() {
  ScrollTrigger.refresh();
});
