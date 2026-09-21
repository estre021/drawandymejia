/**
 * Asistente de Chatbot FAQ - Dra. Wandy Mejía
 * Soporte bilingüe (ES/EN) con inyección automática de HTML
 * Motor de Búsqueda Semántica y RAG Local (Dynamic Scraper & Fallback Knowledge Base)
 */

document.addEventListener('DOMContentLoaded', () => {
    const isEnglish = window.location.pathname.includes('_en.html');
    
    // 1. Base de conocimiento estática de respaldo (Fallback KB)
    const staticKnowledgeBase = {
        es: {
            fallback: "Disculpe, esa información no se encuentra en la página.",
            status: "En línea",
            doctorTitle: "Asistente de la Dra. Wandy",
            optionsTitle: "Preguntas Frecuentes:",
            welcome: "¡Hola! Soy el asistente virtual de la Dra. Wandy Mejía. Puedo responder preguntas sobre su consulta, especialidades, consultorios y charlas. ¿En qué puedo ayudarte hoy?",
            placeholder: "Escribe tu pregunta sobre la doctora o los servicios...",
            faq: [
                { q: "¿Cómo agendo una cita?", a: "Puedes agendar tu cita haciendo clic en el botón <strong>\"Hacer Cita\"</strong> del menú, o completando el formulario en nuestra sección de <strong><a href=\"registro.html\">Registro</a></strong>. Si prefieres, escríbenos directamente por WhatsApp al 809-459-2222." },
                { q: "¿Ofrece consultas virtuales?", a: "¡Sí! La Dra. Wandy Mejía ofrece <strong>Consultas Virtuales (Online)</strong> con horarios flexibles para pacientes en República Dominicana y el exterior. Puedes registrarte en la página de <strong><a href=\"registro.html\">Registro de Cita</a></strong> eligiendo la opción 'Consultas Virtuales'." },
                { q: "¿Cuáles son los métodos de pago?", a: "Aceptamos pagos seguros en línea mediante <strong>tarjetas de crédito/débito (Visa, Mastercard)</strong>, <strong>PayPal</strong> y <strong>transferencias bancarias</strong> (Banco Popular y BHD León)." },
                { q: "¿Dónde están los consultorios?", a: "La Dra. atiende de manera presencial en Santo Domingo en:<br>1. <strong>SINAD SALUD</strong> (Martes/Jueves)<br>2. <strong>Medkids Center</strong> (Miércoles)<br>3. <strong>INSIGHT</strong> (Viernes)<br>Puedes ver mapas y teléfonos en la sección de <strong><a href=\"contacto.html\">Contacto</a></strong>." },
                { q: "¿Qué especialidades trata la Dra.?", a: "Es especialista en <strong>Nutrición Clínica</strong>, Microbiota Intestinal, control de peso (obesidad), nutrición infantil y pediatría adaptada a condiciones del desarrollo como <strong>Autismo (TEA)</strong>, <strong>TDAH</strong> y selectividad alimentaria severa." }
            ],
            kb: [
                { keys: ["quien", "dra", "doctora", "wandy", "mejia", "perfil", "sobre", "biografia"], response: "La Dra. Wandy Mejía es una destacada Nutrióloga Clínica egresada de la Universidad Autónoma de Santo Domingo (UASD). Se especializa en microbiota intestinal, control de peso metabólico y nutrición para el neurodesarrollo (Autismo/TDAH)." },
                { keys: ["universidad", "estudio", "egresada", "uasd", "graduo"], response: "La Dra. Wandy Mejía es egresada de la prestigiosa Universidad Autónoma de Santo Domingo (UASD), con especialización en Nutrición Clínica." },
                { keys: ["sodonuclim", "sociedad", "miembro"], response: "Es miembro activo de la Sociedad Dominicana de Nutrición Clínica y Metabolismo (SODONUCLIM)." },
                { keys: ["caid", "experiencia caid"], response: "Cuenta con amplia experiencia en el CAID (Centro de Atención Integral para la Discapacidad) en el abordaje nutricional de condiciones del neurodesarrollo." },
                { keys: ["autismo", "tea", "tdah", "neurodesarrollo"], response: "Ofrece planes nutricionales pediátricos para Autismo (TEA) y TDAH, corrigiendo la inflamación digestiva y manejando la selectividad alimentaria." },
                { keys: ["microbiota", "intestino", "segundo cerebro", "digestiva"], response: "Su enfoque clínico incluye el estudio de la microbiota intestinal para restaurar la salud metabólica, inmunológica y digestiva." },
                { keys: ["peso", "obesidad", "adelgazar", "bajar", "metabolismo"], response: "Manejo clínico del sobrepeso con enfoque hormonal y metabólico en mujeres, promoviendo hábitos a largo plazo sin dietas extremas." },
                { keys: ["selectividad", "mal comedores", "no quiere comer", "picky"], response: "Especialista en niños 'mal comedores', aplicando estrategias conductuales para ampliar de forma positiva la variedad de alimentos." },
                { keys: ["cita", "agendar", "programar", "whatsapp", "registro"], response: "Agenda tu cita presencial o virtual completando el formulario de <strong><a href=\"registro.html\">Registro de Citas</a></strong> o escribiendo al WhatsApp 809-459-2222." },
                { keys: ["virtual", "online", "distancia", "zoom", "internacional", "pago"], response: "Ofrecemos consultas virtuales por videoconferencia para pacientes nacionales y extranjeros por $50 USD / RD$ 3,000, pagaderos en línea de forma segura." },
                { keys: ["precio", "costo", "tarifa", "cuanto", "pago"], response: "La consulta virtual cuesta $50 USD. Las charlas grabadas cuestan entre $15 y $25 USD. Aceptamos Tarjetas, PayPal y transferencias." },
                { keys: ["charlas", "webinars", "talleres"], response: "Disponibles charlas virtuales grabadas sobre Autismo ($25 USD), Microbiota ($20 USD) y Hábitos Sostenibles ($15 USD) en la sección de <strong><a href=\"servicios.html\">Servicios</a></strong>." },
                { keys: ["sinad", "sinad salud", "martes", "jueves"], response: "En SINAD SALUD (C. Eugenio Deschamps 2, Santo Domingo), atiende Martes y Jueves de 2:00 pm a 8:00 pm. Tel: 809-542-8898." },
                { keys: ["medkids", "medkids center", "miercoles"], response: "En MedKids Center (Santo Domingo), consulta los Miércoles de 4:00 pm a 8:00 pm. Tel: 809-569-1072." },
                { keys: ["insight", "insight center", "viernes"], response: "En INSIGHT (Santo Domingo), atiende los Viernes de 2:00 pm a 7:00 pm. Tel: 849-262-1997." },
                { keys: ["correo", "email", "gmail", "contacto"], response: "Su correo oficial es <strong>drawandymejiard@gmail.com</strong> para colaboraciones y envío de historial clínico." },
                { keys: ["instagram", "insta", "redes", "sociales"], response: "Síguela en su cuenta oficial: <strong><a href=\"https://instagram.com/drawandymejiard\" target=\"_blank\">@drawandymejiard</a></strong>." },
                { keys: ["telefono", "contacto general", "whatsapp"], response: "El teléfono y WhatsApp principal para atención al cliente es <strong>809-459-2222</strong>." },
                { keys: ["donde", "ubicacion", "direccion", "consultorios", "consultorio", "clinica", "clinicas", "presencial"], response: "La Dra. Wandy Mejía atiende de manera presencial en Santo Domingo en: 1. <strong>SINAD SALUD</strong> (Martes/Jueves), 2. <strong>MedKids Center</strong> (Miércoles) y 3. <strong>INSIGHT</strong> (Viernes). Ver detalles y teléfonos en <strong><a href=\"contacto.html\">Contacto</a></strong>." }
            ]
        },
        en: {
            fallback: "Apologies, that information is not available on the website.",
            status: "Online",
            doctorTitle: "Dr. Wandy's Assistant",
            optionsTitle: "Frequently Asked Questions:",
            welcome: "Hello! I am the virtual assistant of Dr. Wandy Mejía. I can answer questions about her consultation, specialties, clinics, and talks. How can I help you today?",
            placeholder: "Type your question about the doctor or services...",
            faq: [
                { q: "How do I schedule an appointment?", a: "You can schedule your appointment by clicking the <strong>\"HACER CITA\"</strong> button in the menu or by filling out the form in our <strong><a href=\"registro_en.html\">Registration</a></strong> section. You can also write to us via WhatsApp at +1 809-459-2222." },
                { q: "Do you offer virtual consultations?", a: "Yes! Dr. Wandy Mejía offers <strong>Virtual Consultations (Online)</strong> with flexible hours for patients in the Dominican Republic and abroad. You can register on the <strong><a href=\"registro_en.html\">Appointment Registration</a></strong> page by choosing the 'Virtual Consultations' option." },
                { q: "What are the payment methods?", a: "We accept secure online payments via <strong>credit/debit cards (Visa, Mastercard)</strong>, <strong>PayPal</strong>, and <strong>bank transfers</strong> (Banco Popular and BHD León)." },
                { q: "Where are the clinics located?", a: "The doctor consults in person in Santo Domingo at:<br>1. <strong>SINAD SALUD</strong> (Tuesdays/Thursdays)<br>2. <strong>Medkids Center</strong> (Wednesdays)<br>3. <strong>INSIGHT</strong> (Fridays)<br>You can view maps and phone numbers in the <strong><a href=\"contacto_en.html\">Contact</a></strong> section." },
                { q: "What are the doctor's specialties?", a: "She is a specialist in <strong>Clinical Nutrition</strong>, Gut Microbiota, weight control (obesity), pediatric nutrition, and nutritional protocols tailored for developmental conditions such as <strong>Autism (ASD)</strong>, <strong>ADHD</strong>, and severe food selectivity." }
            ],
            kb: [
                { keys: ["who", "dr", "doctor", "wandy", "mejia", "profile", "about", "bio"], response: "Dr. Wandy Mejía is a clinical nutritionist graduated from UASD, specializing in microbiota, weight control, and pediatric nutrition (Autism/ADHD)." },
                { keys: ["university", "study", "graduate", "uasd"], response: "Dr. Wandy Mejía graduated from the prestigious Autonomous University of Santo Domingo (UASD)." },
                { keys: ["sodonuclim", "society", "member"], response: "She is an active member of the Dominican Society of Clinical Nutrition and Metabolism (SODONUCLIM)." },
                { keys: ["caid", "experience caid"], response: "She has clinical experience at CAID managing pediatric nutritional plans for developmental conditions." },
                { keys: ["autism", "asd", "adhd", "neurodevelopment"], response: "Specialized pediatric nutritional approach for children on the Autism Spectrum (ASD) and ADHD, correcting gut inflammation." },
                { keys: ["microbiota", "gut", "second brain"], response: "Her clinical approach highlights the gut microbiota to optimize digestion, immunity, and metabolism." },
                { keys: ["weight", "obesity", "lose weight", "metabolism"], response: "Clinical management of weight and obesity with a hormonal focus for women, building sustainable habits." },
                { keys: ["selectivity", "picky", "picky eater"], response: "Abhors childhood food selectivity by applying conduct strategies to expand food variety." },
                { keys: ["appointment", "schedule", "book", "whatsapp", "registration"], response: "Book an appointment on the <strong><a href=\"registro_en.html\">Appointment Registration</a></strong> page or text us on WhatsApp at +1 809-459-2222." },
                { keys: ["virtual", "online", "zoom", "videocall", "abroad", "payment"], response: "We offer virtual consultations online via video conference for $50 USD / RD$ 3,000, payable securely online with card or PayPal." },
                { keys: ["price", "cost", "fee", "pay"], response: "Virtual consultation costs $50 USD. Lectures cost between $15 and $25 USD. We accept Cards, PayPal, and bank transfers." },
                { keys: ["lectures", "webinars", "talks"], response: "Purchase virtual lectures on Autism ($25 USD), Microbiota ($20 USD), and Habits ($15 USD) in the <strong><a href=\"servicios_en.html\">Services</a></strong> section." },
                { keys: ["sinad", "sinad salud", "tuesday", "thursday"], response: "At SINAD SALUD (C. Eugenio Deschamps 2, Santo Domingo), she consults Tuesdays & Thursdays from 2:00 pm to 8:00 pm. Phone: 809-542-8898." },
                { keys: ["medkids", "medkids center", "wednesday"], response: "At MedKids Center, she consults on Wednesdays from 4:00 pm to 8:00 pm. Phone: 809-569-1072." },
                { keys: ["insight", "insight center", "friday"], response: "At INSIGHT, she consults on Fridays from 2:00 pm to 7:00 pm. Phone: 849-262-1997." },
                { keys: ["email", "gmail", "write", "contact"], response: "Official email: <strong>drawandymejiard@gmail.com</strong> for collaborations and medical records." },
                { keys: ["instagram", "insta", "social"], response: "Follow her on official Instagram: <strong><a href=\"https://instagram.com/drawandymejiard\" target=\"_blank\">@drawandymejiard</a></strong>." },
                { keys: ["phone", "contact", "whatsapp"], response: "General support phone and WhatsApp: <strong>+1 809-459-2222</strong>." },
                { keys: ["where", "location", "address", "clinics", "clinic", "office", "offices", "in person", "presential"], response: "Dr. Wandy Mejía consults in person in Santo Domingo at: 1. <strong>SINAD SALUD</strong> (Tuesdays/Thursdays), 2. <strong>MedKids Center</strong> (Wednesdays), and 3. <strong>INSIGHT</strong> (Fridays). View details and phones in the <strong><a href=\"contacto_en.html\">Contact</a></strong> section." }
            ]
        }
    };

    const lang = isEnglish ? staticKnowledgeBase.en : staticKnowledgeBase.es;
    const currentKb = isEnglish ? staticKnowledgeBase.en : staticKnowledgeBase.es;

    // 2. Inyectar HTML del chatbot
    const chatWidgetHtml = `
        <div class="chatbot-widget">
            <div class="chatbot-bubble" id="chatBubble">
                <i class="fas fa-comment-medical"></i>
                <div class="badge-notify" id="chatBadge">1</div>
            </div>
            <div class="chatbot-window" id="chatWindow">
                <div class="chatbot-header">
                    <div class="chatbot-profile">
                        <img src="assets/images/logo-wandy-mejia.png" alt="Logo Dra. Wandy Mejía" class="chatbot-avatar">
                        <div class="chatbot-info-text">
                            <h4>${lang.doctorTitle}</h4>
                            <p>${lang.status}</p>
                        </div>
                    </div>
                    <button class="chatbot-close" id="chatClose"><i class="fas fa-times"></i></button>
                </div>
                <div class="chatbot-body" id="chatBody">
                    <div class="chat-msg bot">
                        ${lang.welcome}
                    </div>
                    <div class="chat-options" id="chatOptions">
                        <p style="font-size: 0.75rem; color: var(--text-muted); margin: 5px 0 2px 2px; font-weight: 600;">${lang.optionsTitle}</p>
                    </div>
                </div>
                <div class="chatbot-footer">
                    <input type="text" class="chatbot-input" id="chatInput" placeholder="${lang.placeholder}">
                    <button class="chatbot-send" id="chatSend"><i class="fas fa-paper-plane"></i></button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatWidgetHtml);

    const chatBubble = document.getElementById('chatBubble');
    const chatBadge = document.getElementById('chatBadge');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    const chatBody = document.getElementById('chatBody');
    const chatOptions = document.getElementById('chatOptions');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');

    // Cargar FAQ
    lang.faq.forEach(item => {
        const btn = document.createElement('button');
        btn.className = 'chat-option-btn';
        btn.innerHTML = item.q;
        btn.addEventListener('click', () => handleFaqSelection(item.q, item.a));
        chatOptions.appendChild(btn);
    });

    chatBubble.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
        if (chatBadge) chatBadge.style.display = 'none';
        setTimeout(() => chatInput.focus(), 300);
    });

    chatClose.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });

    // ==========================================================
    // 3. RAG LOCAL: INDEXACIÓN DINÁMICA DE LAS PÁGINAS DEL SITIO
    // ==========================================================
    let dynamicBlocks = [];

    const pagesToFetch = isEnglish 
        ? ['index_en.html', 'servicios_en.html', 'contacto_en.html', 'registro_en.html'] 
        : ['index.html', 'servicios.html', 'contacto.html', 'registro.html'];

    function parsePageIntoBlocks(htmlText, url) {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlText, 'text/html');
            
            // Eliminar elementos no textuales o repetitivos para limpiar el índice
            doc.querySelectorAll('script, style, nav, footer, .overlay, .menu-btn, .chatbot-widget').forEach(el => el.remove());
            
            // Extraer bloques de alto valor estructurado
            const selectors = [
                '.consultorio-mini-card',
                '.service-card',
                '.servicio-alt-row',
                '.testimonial-card',
                '.feature',
                '.blog-card',
                '.profile-section',
                '.hero-content'
            ];

            selectors.forEach(selector => {
                doc.querySelectorAll(selector).forEach(el => {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = el.innerHTML;
                    
                    // Limpiar elementos dinámicos o multimedia pesados
                    tempDiv.querySelectorAll('iframe, map, area, video, source, script, style').forEach(sub => sub.remove());
                    
                    // Modificar enlaces para que sean legibles en el chat
                    tempDiv.querySelectorAll('a').forEach(a => {
                        a.setAttribute('target', '_blank');
                        // Corregir enlaces de citas
                        if (a.getAttribute('href') === 'registro.html') a.innerText = isEnglish ? 'Go to Register' : 'Ir al Registro';
                    });

                    const cleanHtml = tempDiv.innerHTML.trim()
                        .replace(/class="[^"]*"/gi, '')
                        .replace(/id="[^"]*"/gi, '')
                        .replace(/style="[^"]*"/gi, '');
                    
                    const cleanText = tempDiv.innerText.toLowerCase();

                    if (cleanText.length > 30) {
                        dynamicBlocks.push({
                            html: cleanHtml,
                            text: cleanText,
                            weight: 2.5, // Mayor peso para bloques de información organizada
                            source: url
                        });
                    }
                    // Eliminar del documento para que no se indexe doble en el escaneo general
                    el.remove();
                });
            });

            // Indexar párrafos, listas y encabezados sueltos restantes
            doc.querySelectorAll('p, li, h2, h3, h4').forEach(el => {
                const text = el.innerText.trim();
                if (text.length > 35) {
                    dynamicBlocks.push({
                        html: el.outerHTML.replace(/class="[^"]*"/gi, '').replace(/id="[^"]*"/gi, ''),
                        text: text.toLowerCase(),
                        weight: 1.0,
                        source: url
                    });
                }
            });
        } catch (err) {
            console.warn("Error parsing page blocks for:", url, err);
        }
    }

    // Iniciar carga asíncrona de páginas (CORS safe con fallback)
    pagesToFetch.forEach(page => {
        fetch(page)
            .then(res => {
                if (!res.ok) throw new Error("Status " + res.status);
                return res.text();
            })
            .then(html => parsePageIntoBlocks(html, page))
            .catch(err => {
                // Falla silenciosa si se abre directamente por protocolo file:///
                console.log(`CORS/Fetch restrict: Fallback a base de datos estática para ${page}. Motivo: ${err.message}`);
            });
    });

    // ==========================================================
    // 4. MOTOR DE RESPUESTA SEMÁNTICA CON EVALUACIÓN DE TOKENS
    // ==========================================================
    const getResponseFromText = (queryText) => {
        // Limpiar entrada
        const cleanQuery = queryText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?¿]/g,"");
        
        // 1. Detectar saludos comunes
        const greetingsEs = ["hola", "buenos dias", "buenas tardes", "buenas noches", "saludos", "que tal", "alo", "hey"];
        const greetingsEn = ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "greetings", "whats up"];
        
        const hasGreetingEs = greetingsEs.some(g => cleanQuery.split(/\s+/).includes(g));
        const hasGreetingEn = greetingsEn.some(g => cleanQuery.split(/\s+/).includes(g));
        
        if (isEnglish && hasGreetingEn) {
            return staticKnowledgeBase.en.welcome;
        } else if (!isEnglish && hasGreetingEs) {
            return staticKnowledgeBase.es.welcome;
        }

        // 2. Detectar agradecimientos y despedidas cortas
        const thanksEs = ["gracias", "muchas gracias", "agradecido", "agradecida", "de acuerdo", "perfecto", "ok", "excelente", "adios", "bye"];
        const thanksEn = ["thank you", "thanks", "thank you so much", "great", "awesome", "ok", "perfect", "excellent", "bye", "goodbye"];
        
        const hasThanksEs = thanksEs.some(t => cleanQuery.includes(t));
        const hasThanksEn = thanksEn.some(t => cleanQuery.includes(t));
        
        if (isEnglish && hasThanksEn) {
            return "You're welcome! Feel free to ask if you need anything else.";
        } else if (!isEnglish && hasThanksEs) {
            return "¡De nada! Quedo a tu entera disposición si necesitas algo más.";
        }

        // Tokenizar excluyendo stopwords comunes
        const stopwords = isEnglish 
            ? ["the", "and", "for", "with", "from", "you", "your", "this", "that", "are", "about", "how", "what", "where", "who", "can", "they", "will"]
            : ["el", "la", "los", "las", "un", "una", "unos", "unas", "de", "del", "al", "en", "para", "con", "por", "que", "como", "esta", "donde", "quien", "este", "es", "su", "sus", "para"];
            
        const queryWords = cleanQuery.split(/\s+/).filter(word => word.length > 2 && !stopwords.includes(word));

        if (queryWords.length === 0) {
            return currentKb.fallback;
        }

        let bestMatchHtml = null;
        let highestScore = 0;

        // A) Búsqueda en los bloques dinámicos extraídos de la web
        if (dynamicBlocks.length > 0) {
            dynamicBlocks.forEach(block => {
                let score = 0;
                let matches = 0;

                queryWords.forEach(word => {
                    if (block.text.includes(word)) {
                        score += block.weight;
                        matches++;
                        
                        // Extra si la palabra está dentro de una etiqueta de cabecera en ese bloque
                        const headerRegex = new RegExp(`<h[1-6][^>]*>[^<]*${word}[^<]*<\/h[1-6]>`, 'i');
                        if (headerRegex.test(block.html)) {
                            score += 2.0;
                        }
                    }
                });

                // Bonificación si coinciden múltiples términos de búsqueda únicos
                if (matches > 1) {
                    score += (matches * 1.5);
                }

                if (score > highestScore) {
                    highestScore = score;
                    bestMatchHtml = block.html;
                }
            });
        }

        // Umbral de coincidencia aceptable para bloques dinámicos
        const dynamicThreshold = 3.5;
        if (highestScore >= dynamicThreshold && bestMatchHtml) {
            return bestMatchHtml;
        }

        // B) Búsqueda en la Base de Conocimiento Estática (Respaldo)
        let bestFallbackText = null;
        let highestFallbackScore = 0;

        for (const item of currentKb.kb) {
            let score = 0;
            
            // 1. Frase clave exacta
            for (const key of item.keys) {
                const cleanKey = key.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                if (cleanQuery.includes(cleanKey)) {
                    score += 5.0;
                }
                
                // 2. Coincidencia por palabra
                const keyWords = cleanKey.split(/\s+/);
                queryWords.forEach(word => {
                    if (keyWords.includes(word)) {
                        score += 1.2;
                    }
                });
            }

            if (score > highestFallbackScore) {
                highestFallbackScore = score;
                bestFallbackText = item.response;
            }
        }

        if (highestFallbackScore >= 2.0 && bestFallbackText) {
            return bestFallbackText;
        }

        // C) Si no supera ningún umbral, retornar la frase de rechazo obligatoria
        return currentKb.fallback;
    };

    // ==========================================================
    // 5. FLUJO DE CHAT Y MENSAJERÍA
    // ==========================================================
    const sendMessage = () => {
        const text = chatInput.value.trim();
        if (!text) return;

        appendMessage(text, 'user');
        chatInput.value = '';
        chatOptions.style.display = 'none';

        showTypingIndicator();

        setTimeout(() => {
            removeTypingIndicator();
            const responseText = getResponseFromText(text);
            appendMessage(responseText, 'bot');
            
            // Restablecer las opciones de FAQ al final de la conversación
            setTimeout(() => {
                chatBody.appendChild(chatOptions);
                chatOptions.style.display = 'flex';
                scrollToBottom();
            }, 300);

            scrollToBottom();
        }, 1100);
    };

    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    const handleFaqSelection = (question, answer) => {
        appendMessage(question, 'user');
        chatOptions.style.display = 'none';
        
        showTypingIndicator();
        
        setTimeout(() => {
            removeTypingIndicator();
            appendMessage(answer, 'bot');
            
            setTimeout(() => {
                chatBody.appendChild(chatOptions);
                chatOptions.style.display = 'flex';
                scrollToBottom();
            }, 300);
        }, 800);
    };

    const appendMessage = (text, sender) => {
        const msg = document.createElement('div');
        msg.className = `chat-msg ${sender}`;
        msg.innerHTML = text;
        chatBody.appendChild(msg);
        scrollToBottom();
    };

    const showTypingIndicator = () => {
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.id = 'typingIndicator';
        indicator.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        chatBody.appendChild(indicator);
        scrollToBottom();
    };

    const removeTypingIndicator = () => {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) indicator.remove();
    };

    const scrollToBottom = () => {
        chatBody.scrollTop = chatBody.scrollHeight;
    };
});
