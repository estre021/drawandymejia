document.documentElement.classList.add('js-enabled');

document.addEventListener('DOMContentLoaded', () => {
    console.log("Navegación por Carrusel ahora está delegada a Puro CSS.");

    /* ======= FUNCION DEL HEADER SCROLL ======= */
    const header = document.querySelector('.navbar');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    /* ======= MENÚ MÓVIL ======= */
    const menuBtn = document.querySelector('.menu-btn');
    const navLinksMobile = document.querySelector('.nav-links-mobile');
    const mobileOverlay = document.querySelector('.overlay');

    const toggleMenu = () => {
        const isActive = navLinksMobile.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        menuBtn.classList.toggle('active');
        document.body.style.overflow = isActive ? 'hidden' : 'auto';
    };

    if (menuBtn && navLinksMobile && mobileOverlay) {
        menuBtn.addEventListener('click', toggleMenu);
        mobileOverlay.addEventListener('click', toggleMenu);

        // Cerrar menú al hacer clic en un enlace
        const mobileLinks = navLinksMobile.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }

    /* ======= ACORDEÓN DE PREGUNTAS FRECUENTES ======= */
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Cerrar todos los demás items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });

                // Si no estaba activo, abrirlo
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    /* ======= ANIMACIONES AL HACER SCROLL (Comentado para usar GSAP ScrollTrigger) =======
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('section').forEach(sec => {
        observer.observe(sec);
    });
    */

    /* ======= CONTROL DE EFECTOS DYNAMIC SCROLL WIX STUDIO (Comentado para usar GSAP ScrollTrigger) =======
    const heroSection = document.getElementById('inicio');
    const heroVideo = document.getElementById('heroVideo');
    const heroBlur = document.getElementById('heroBlur');
    
    const servicesSection = document.getElementById('servicios');
    const servicesVideo = document.getElementById('servicesVideo');
    
    const bannerSection = document.querySelector('.banner-cita');
    const bannerVideo = document.getElementById('bannerVideo');

    // Inicializar blur de entrada suave
    if (heroBlur) {
        heroBlur.style.backdropFilter = 'blur(10px)';
        setTimeout(() => {
            heroBlur.style.transition = 'backdrop-filter 2s ease, background-color 2s ease';
            // Dejamos un blur de 6px fijo para legibilidad, pero cambiable en scroll
            heroBlur.style.backdropFilter = 'blur(6px)';
        }, 300);
    }

    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateScrollAnimations() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

        // 1. Animación del Hero (Escala y desenfoque dinámico)
        if (heroSection && heroVideo) {
            const heroHeight = heroSection.offsetHeight;
            if (scrollY <= heroHeight) {
                const scrollFraction = scrollY / heroHeight;
                // Escala de 1 a 1.15
                const scaleVal = 1 + (scrollFraction * 0.15);
                // Desenfoque disminuye a medida que el texto se va
                const blurVal = Math.max(0, 6 - (scrollFraction * 6));
                
                heroVideo.style.transform = `translate(-50%, -50%) scale(${scaleVal})`;
                if (heroBlur) {
                    heroBlur.style.backdropFilter = `blur(${blurVal}px)`;
                    // Aumentar la opacidad del overlay oscuro a medida que baja
                    heroBlur.style.backgroundColor = `rgba(18, 18, 29, ${0.55 + (scrollFraction * 0.25)})`;
                }
            }
        }

        // 2. Animación de la sección Servicios (Escala en scroll)
        if (servicesSection && servicesVideo) {
            const rect = servicesSection.getBoundingClientRect();
            const sectionTop = rect.top + scrollY;
            const sectionHeight = servicesSection.offsetHeight;
            
            // Si la sección está visible en pantalla
            if (scrollY + windowHeight > sectionTop && scrollY < sectionTop + sectionHeight) {
                const visibleScroll = (scrollY + windowHeight) - sectionTop;
                const scrollFraction = Math.min(1, Math.max(0, visibleScroll / (windowHeight + sectionHeight)));
                // Escala de 1 a 1.12
                const scaleVal = 1 + (scrollFraction * 0.12);
                servicesVideo.style.transform = `translate(-50%, -50%) scale(${scaleVal})`;
            }
        }

        // 3. Animación de la sección Banner (Escala en scroll)
        if (bannerSection && bannerVideo) {
            const rect = bannerSection.getBoundingClientRect();
            const sectionTop = rect.top + scrollY;
            const sectionHeight = bannerSection.offsetHeight;
            
            if (scrollY + windowHeight > sectionTop && scrollY < sectionTop + sectionHeight) {
                const visibleScroll = (scrollY + windowHeight) - sectionTop;
                const scrollFraction = Math.min(1, Math.max(0, visibleScroll / (windowHeight + sectionHeight)));
                // Escala de 1.15 a 1 (efecto zoom-out al entrar)
                const scaleVal = 1.15 - (scrollFraction * 0.15);
                bannerVideo.style.transform = `translate(-50%, -50%) scale(${scaleVal})`;
            }
        }

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateScrollAnimations();
            });
            ticking = true;
        }
    });

    // Ejecutar una vez al cargar
    updateScrollAnimations();
    */

    /* ======= EFECTO DE REVELADO FLUIDO (Wix Studio Reveal) ======= (Comentado para usar GSAP)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        revealObserver.observe(el);
    });
    */

    /* ======= EFECTO INTERACTIVO DE CURSOR EN TESTIMONIOS (WIX STUDIO GLOW) ======= */
    const testimoniosSec = document.getElementById('testimonios');
    const blob1 = document.getElementById('testiGlowBlob1');
    const blob2 = document.getElementById('testiGlowBlob2');

    if (testimoniosSec && blob1 && blob2) {
        let targetX = 0;
        let targetY = 0;
        let currentX1 = 0;
        let currentY1 = 0;
        let currentX2 = 0;
        let currentY2 = 0;
        let isInside = false;

        // Inicializar posiciones una vez que el contenedor tiene tamaño
        setTimeout(() => {
            targetX = testimoniosSec.offsetWidth / 2;
            targetY = testimoniosSec.offsetHeight / 2;
            currentX1 = targetX;
            currentY1 = targetY;
            currentX2 = targetX;
            currentY2 = targetY;
        }, 100);

        function animateBlobs() {
            // Interpolación lineal suave (lerp) para un efecto elástico y moderno continuo
            currentX1 += (targetX - currentX1) * 0.1;
            currentY1 += (targetY - currentY1) * 0.1;

            currentX2 += (targetX - currentX2) * 0.05;
            currentY2 += (targetY - currentY2) * 0.05;

            blob1.style.left = `${currentX1}px`;
            blob1.style.top = `${currentY1}px`;
            blob2.style.left = `${currentX2}px`;
            blob2.style.top = `${currentY2}px`;
            
            requestAnimationFrame(animateBlobs);
        }
        
        animateBlobs();

        testimoniosSec.addEventListener('mousemove', (e) => {
            const rect = testimoniosSec.getBoundingClientRect();
            targetX = e.clientX - rect.left;
            targetY = e.clientY - rect.top;
            isInside = true;
        });

        testimoniosSec.addEventListener('mouseenter', () => {
            isInside = true;
            blob1.style.opacity = '0.8';
            blob2.style.opacity = '0.9';
        });

        testimoniosSec.addEventListener('mouseleave', () => {
            isInside = false;
            blob1.style.opacity = '0.4';
            blob2.style.opacity = '0.5';
            
            // Retornar suavemente al centro (el lerp se encargará del deslizamiento)
            targetX = testimoniosSec.offsetWidth / 2;
            targetY = testimoniosSec.offsetHeight / 2;
        });
    }

    /* ======= EFECTO DOCK SPOTLIGHT EN TARJETAS DE TESTIMONIOS ======= */
    const testiCards = document.querySelectorAll('.testimonial-card');
    testiCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    /* ======= CORRECCIÓN DE NAVEGACIÓN POR HASH AL CARGAR ======= */
    if (window.location.hash) {
        const hash = window.location.hash;
        // Quitar comportamiento de scroll nativo temporalmente para evitar saltos bruscos
        history.replaceState(null, null, ' ');
        
        setTimeout(() => {
            const targetElement = document.querySelector(hash);
            if (targetElement) {
                // Devolver el hash a la URL de forma limpia
                history.replaceState(null, null, hash);
                // Desplazamiento suave al elemento de forma exacta tras render de GSAP
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 550); // Dar suficiente tiempo para que GSAP ScrollTrigger y layouts estabilicen
    }

    /* ======= DYNAMIC EMAIL LINK HANDLER (MOBILE VS DESKTOP) ======= */
    function setupEmailLinks() {
        const email = 'drawandymejiard@gmail.com';
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // Find all links that reference the email or are Gmail links
        const links = document.querySelectorAll('a');
        links.forEach(link => {
            let href = link.getAttribute('href') || '';
            let isEmailLink = false;
            let subject = '';

            // Check if it's a gmail web link or a mailto link
            if (href.includes('mail.google.com/mail') || href.startsWith('mailto:')) {
                isEmailLink = true;
                
                // Try to extract subject
                if (href.includes('su=')) {
                    // Extract from su parameter in Gmail link
                    const match = href.match(/su=([^&]+)/);
                    if (match) subject = decodeURIComponent(match[1]);
                } else if (href.includes('subject=')) {
                    // Extract from subject parameter in mailto link
                    const match = href.match(/subject=([^&]+)/);
                    if (match) subject = decodeURIComponent(match[1]);
                }
            }

            if (isEmailLink) {
                if (isMobile) {
                    // Mobile: Use native mailto protocol so it opens native Gmail/Mail app
                    let mailtoUrl = `mailto:${email}`;
                    if (subject) {
                        mailtoUrl += `?subject=${encodeURIComponent(subject)}`;
                    }
                    link.setAttribute('href', mailtoUrl);
                    link.removeAttribute('target'); // No need for target="_blank" for mailto
                } else {
                    // Laptop/Desktop: Use Gmail web compose link
                    let gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
                    if (subject) {
                        gmailUrl += `&su=${encodeURIComponent(subject)}`;
                    }
                    link.setAttribute('href', gmailUrl);
                    link.setAttribute('target', '_blank');
                }
            }
        });
    }

    setupEmailLinks();
});

