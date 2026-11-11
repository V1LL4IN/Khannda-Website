// src/lib/i18n/translations/es.ts
// Spanish translations

export const es = {
    // Navigation
    nav: {
        solutions: "Soluciones",
        projects: "Proyectos",
        technologies: "Tecnologías",
        startProject: "Inicia tu proyecto",
    },

    // Hero Section — tipográfico editorial. titleBefore se parte por '\n'
    // (control del salto de línea por idioma); el textContent del <h1> debe
    // mantener la keyword "desarrollo de software a medida" contigua.
    hero: {
        eyebrow: "Khannda · Quito → LATAM & EE. UU. · desde 2019",
        titleBefore: "Desarrollo de\nsoftware",
        titleEmphasis: "a medida",
        titleAfter: ".",
        description: "Sistemas web, móviles y automatización con n8n para empresas de LATAM y EE. UU. Alcance cerrado, código tuyo, un MVP en producción en 4–6 semanas.",
        cta: "Agendar diagnóstico",
        ctaSecondary: "Ver el trabajo",
        proof: "Est. 2019 · 50+ sistemas en producción · Fintech / Logística / Retail / Salud",
    },

    // Intro editorial (home) — declaración de posicionamiento
    intro: {
        title: "Lo que vas a encontrar aquí.",
        body: "Ni promesas de transformación digital ni presentaciones de 40 láminas. Abajo está lo que hacemos, tres sistemas reales en producción, cómo cobramos y las preguntas que todos hacen antes de empezar. Si tu caso no necesita software a medida, te lo decimos en la primera llamada.",
    },

    // Palabras separadoras gigantes entre secciones (decorativas, aria-hidden;
    // términos universales — idénticos en ambos idiomas a propósito)
    separators: ["Software", "Fintech", "Uptime", "Partner"],

    // About Section — A1 Layered Stack
    about: {
        eyebrow: "Cómo lo construimos",
        title: "Arquitectura",
        titleHighlight: "Invisible.",
        subtitle: "Tu cliente solo ve la pantalla. Detrás corren cinco capas que diseñamos, operamos y garantizamos. Pasa el mouse por cualquiera.",
        layers: [
            {
                name: "Experiencia",
                tag: "UX · UI · Performance",
                own: "Lo único que el usuario ve. Carga < 1.2s, accesible, offline-ready.",
                stack: ["Next.js", "React Native", "Framer Motion", "WCAG AA"],
                metric: "+34%",
                metricLabel: "conversión post-rediseño",
            },
            {
                name: "API Surface",
                tag: "Gateway · Auth · Contract",
                own: "Una sola superficie versionada. Tu equipo y tus partners hablan el mismo idioma.",
                stack: ["tRPC", "GraphQL Federation", "OAuth 2.1", "OpenAPI 3.1"],
                metric: "< 80ms",
                metricLabel: "p95 global · 6 regiones",
            },
            {
                name: "Lógica de Negocio",
                tag: "Microservicios · Eventos · Workflows",
                own: "Donde vive tu modelo de negocio. Aislado, testeado, observable, reemplazable.",
                stack: ["Node 22", "Go", "Temporal", "Kafka", "SQS"],
                metric: "94%",
                metricLabel: "cobertura de tests · main",
            },
            {
                name: "Datos",
                tag: "OLTP · Warehouse · Cache",
                own: "Replicación multi-región, backups verificados, RTO < 15 min, RPO < 1 min.",
                stack: ["Postgres 16", "Redis", "ClickHouse", "dbt"],
                metric: "99.99%",
                metricLabel: "durabilidad anualizada",
            },
            {
                name: "Seguridad",
                tag: "Zero-trust · Audit · Compliance",
                own: "Cifrado E2E, secretos rotados, auditoría inmutable, alertas en tiempo real.",
                stack: ["mTLS", "Vault", "SIEM", "PCI-DSS", "SOC 2"],
                metric: "0",
                metricLabel: "incidentes Sev-1 · 24m",
            },
        ],
        footerNote: "5 capas · 1 contrato SLA · cero monolitos",
        footerCta: "Ver arquitectura referencia →",
        seoOutro: "Estas cinco capas son la base de más de 50 sistemas en producción que hemos construido desde 2019 para fintech, logística, retail y salud en Ecuador y LATAM.",
        seoLink: "Míralos en nuestros casos de éxito",
    },

    // Services Section
    services: {
        title: "Lo que hacemos.",
        subtitle: "Cuatro formas de trabajar con nosotros. Todas terminan con código tuyo.",
        seoIntro: "Somos una empresa de desarrollo de software en Ecuador que trabaja para toda LATAM. Cada servicio se cotiza por alcance cerrado y se entrega con código fuente, documentación y soporte incluido.",
        items: {
            development: {
                title: "Desarrollo a Medida",
                description: "Arquitectura de software diseñada para escalar. Código limpio, modular y mantenible.",
                detail: "Desarrollamos aplicaciones web y móviles a medida que encajan con tu operación, no al revés. Un MVP funcional en 4–6 semanas, con arquitectura pensada para escalar desde el primer día.",
                linkText: "Conoce el desarrollo de software a medida",
                features: ["Microservicios", "APIs REST/GraphQL", "Cloud Native"],
            },
            security: {
                title: "Alta Seguridad & Fintech",
                description: "Infraestructura crítica con estándares bancarios. Protección de datos y transaccionalidad garantizada.",
                detail: "Construimos software para fintech y cooperativas de ahorro y crédito con estándares bancarios: cifrado de extremo a extremo, roles por perfil y auditoría de cada transacción.",
                linkText: "Mira el caso de la Cooperativa César Terán",
                features: ["Encriptación E2E", "Compliance PCI-DSS", "Auditoría Continua"],
            },
            automation: {
                title: "Automatización Operativa",
                description: "Eliminamos el trabajo manual. Bots, scripts y flujos de trabajo inteligentes que trabajan 24/7.",
                detail: "Automatizamos procesos con n8n: conectamos tu CRM, facturación, WhatsApp y hojas de cálculo con más de 400 integraciones. Nuestros clientes ahorran en promedio más de 20 horas semanales de trabajo manual.",
                linkText: "Así aplicamos la automatización con n8n",
                features: ["RPA / Bots", "Integración de Sistemas", "Webhooks & Eventos"],
            },
            consulting: {
                title: "Consultoría Tecnológica",
                description: "Auditoría de deuda técnica y roadmap de modernización para empresas establecidas.",
                detail: "Nuestra consultoría tecnológica audita tu deuda técnica y entrega un roadmap de modernización priorizado por retorno. Empieza con un diagnóstico gratuito de 30 minutos.",
                linkText: "Empieza con un diagnóstico gratuito",
                features: ["Code Reviews", "System Design", "Tech Stack Selection"],
            },
        },
        metrics: {
            efficiency: { value: "+40%", label: "Eficiencia Operativa", desc: "Reducción promedio de carga manual." },
            timeToMarket: { value: "4 WKS", label: "Time-to-Market", desc: "Ciclos de desarrollo ágiles y rápidos." },
            ownership: { value: "2x", label: "Más Rápido", desc: "Desarrollo ágil y entregas frecuentes." },
        },
        outroText: "¿No sabes cuál de las cuatro necesitas? Para eso existe el diagnóstico.",
        outroCta: "Agendar diagnóstico gratuito",
    },

    // Work Index (home) — las filas leen projects.showcase.*
    work: {
        eyebrow: "Trabajo seleccionado",
        title: "Sistemas en producción.",
        subtitle: "Tres de los más de 50 sistemas que mantenemos en producción desde 2019.",
        statusLabel: "En producción",
        completedLabel: "Completado:",
        viewCase: "Ver caso",
        allCases: "Ver todos los casos de éxito",
    },

    // Pricing Section
    pricing: {
        title: "Modelos de",
        titleHighlight: "Colaboración",
        subtitle: "Transparencia total. Sin costos ocultos.",
        seoNote: "Todo proyecto de software a medida se cotiza por alcance cerrado tras un diagnóstico gratuito: sabes el precio y el plazo antes de empezar. En ambos modelos, el código fuente es tuyo.",
        seoLink: "Agenda un diagnóstico gratuito",
        plans: {
            essential: {
                name: "Sistematización Esencial",
                description: "Ideal para validar productos o iniciar la transformación digital.",
                pricing: "Project-Based",
                pricingNote: "Cotización por alcance definido",
                features: ["MVP en 4-6 semanas", "Diseño UI/UX Esencial", "Infraestructura Cloud Básica", "1 Mes de Soporte Post-Launch"],
                cta: "Iniciar Conversación",
            },
            enterprise: {
                name: "Transformación Total",
                tier: "Enterprise",
                description: "Para empresas que requieren evolución continua y escalabilidad.",
                pricing: "Retainer / Partner",
                pricingNote: "Equipo dedicado + Evolución continua",
                features: ["Equipo de Ingeniería Dedicado", "Arquitectura Escalable & Microservicios", "Auditoría de Seguridad Continua", "SLA Garantizado 99.9%"],
                cta: "Agendar Consultoría",
            },
        },
    },

    // Team Section
    team: {
        badge: "Leadership",
        title: "Nuestro",
        titleHighlight: "Equipo",
        subtitle: "Empatía, técnica y pasión por resolver problemas reales con código.",
        members: {
            matias: {
                role: "Data Analyst & AI Master",
                description: "Experto en extraer valor de los datos e implementar soluciones de inteligencia artificial. Matías transforma información compleja en decisiones estratégicas y construye sistemas de IA que optimizan tus operaciones comerciales.",
            },
            jose: {
                role: "Estrategia Tecnológica",
                description: "Visionario de sistemas escalables. José transforma ideas abstractas en arquitecturas de software robustas. Su enfoque asegura que tu inversión tecnológica no solo funcione hoy, sino que sea la base sólida para el crecimiento futuro de tu empresa.",
            },
            kevin: {
                role: "Innovación y Producto",
                description: "Diseñador de experiencias funcionales. Kevin se asegura de que la complejidad del código se traduzca en interfaces simples e intuitivas. Su obsesión es que usar nuestro software sea más fácil que usar un cuaderno.",
            },
            kenny: {
                role: "Full Stack Developer",
                description: "Desarrollador integral que domina tanto el frontend como el backend. Kenny construye aplicaciones robustas de principio a fin, asegurando que cada línea de código aporte valor y rendimiento a tu negocio.",
            },
        },
    },

    // Solutions Page
    solutions: {
        title: "Soluciones de Software que",
        titleHighlight: "Impulsan",
        flipWords: ["Impulsan", "Transforman", "Potencian", "Aceleran"],
        titleEnd: "tu Negocio",
        subtitle: "Desde la automatización de flujos complejos hasta el desarrollo de plataformas robustas. Creamos el ecosistema digital que tu empresa necesita.",
        crossCases: "Mira cómo lo aplicamos en nuestros casos de éxito",
        crossStack: "Conoce nuestro stack tecnológico",
        faqTitle: "Preguntas frecuentes sobre estas soluciones",
        cta: "Ver detalles",
        topics: {
            automation: {
                title: "Automatización",
                cardTitle: "Automatización con n8n",
                description: "Conecta tus aplicaciones favoritas y automatiza tareas repetitivas. Flujos de trabajo inteligentes que ahorran horas de trabajo manual cada semana.",
                tagline: "Conecta tus apps. Elimina lo repetitivo. Escala sin límites.",
                highlights: ["Flujos personalizados que trabajan 24/7", "+400 integraciones listas para usar", "Ahorro promedio de 20+ horas semanales", "Cero errores manuales"],
            },
            development: {
                title: "Desarrollo",
                cardTitle: "Software a la Medida",
                description: "Desarrollo de aplicaciones web y móviles personalizadas. Soluciones escalables construidas con las últimas tecnologías del mercado.",
                tagline: "Código que escala. Diseño que enamora. Resultados que importan.",
                highlights: ["Web apps modernas y responsive", "Apps móviles iOS y Android", "Arquitecturas cloud-native", "Soporte y mantenimiento continuo"],
            },
            consulting: {
                title: "Consultoría",
                cardTitle: "Optimización de Procesos",
                description: "Analizamos y digitalizamos tus operaciones comerciales. Transformamos procesos lentos en sistemas ágiles y eficientes.",
                tagline: "Transformamos operaciones. Digitalizamos procesos. Multiplicamos resultados.",
                highlights: ["Análisis profundo de operaciones", "Roadmap de transformación digital", "KPIs claros y medibles", "ROI garantizado"],
            },
        },
    },

    // Projects Page
    projects: {
        title: "Casos de",
        titleHighlight: "Éxito",
        flipWords: ["Éxito", "Impacto", "Valor", "Resultados"],
        subtitle: "Así hemos transformado negocios reales en Ecuador y Estados Unidos con software a medida y automatización.",
        crossText: "¿Tu operación se parece a alguno de estos casos?",
        crossLink: "Agenda un diagnóstico gratuito",
        detailLabel: "Los casos en detalle",
        labels: {
            challenge: "El problema",
            solution: "La solución",
            stack: "Stack",
            results: "Resultados",
            screenshot: "Captura del sistema",
            demoData: "Datos de demostración",
        },
        showcase: {
            finance: {
                title: "Cooperativa César Terán",
                type: "Cooperativa Terán",
                sector: "Fintech · Cooperativa de ahorro y crédito",
                challenge: "La cooperativa gestionaba socios, ahorros y créditos con procesos manuales y hojas de cálculo: atención lenta en ventanilla, riesgo de errores en los cálculos de interés y ninguna trazabilidad sobre quién modificó cada registro.",
                solution: "Diseñamos y construimos un sistema de gestión financiera a medida: módulos de socios, cuentas de ahorro, créditos con tabla de amortización automática, caja y reportería gerencial. Seguridad de nivel bancario: cifrado de datos, roles por perfil y auditoría inmutable de cada transacción.",
                stack: ["Next.js", "Node.js", "PostgreSQL", "Cloud + backups diarios"],
                results: [
                    "Atención por socio en minutos, sin filas",
                    "100% de las operaciones con registro de auditoría",
                    "Cierre de caja diario automatizado",
                    "Cálculo de intereses sin errores manuales",
                ],
            },
            fitness: {
                title: "Gym CT Tulcán",
                type: "Gym Tulcán",
                sector: "Fitness · Gestión de membresías",
                challenge: "Las membresías se controlaban en papel y Excel: pagos vencidos sin detectar, renovaciones perdidas y ninguna visibilidad de la asistencia real. La morosidad solo se descubría a fin de mes.",
                solution: "Construimos un sistema web de gestión para el gimnasio: membresías y planes, control de pagos y renovaciones, check-in de asistencia y panel con métricas del negocio. Con n8n automatizamos los recordatorios de renovación por WhatsApp, sin intervención del personal.",
                stack: ["Next.js", "Node.js", "PostgreSQL", "n8n"],
                results: [
                    "Morosidad visible y gestionada en tiempo real",
                    "100% de renovaciones con recordatorio automático por WhatsApp",
                    "Panel de asistencia y ocupación en vivo",
                    "Horas administrativas liberadas cada semana",
                ],
            },
            retail: {
                title: "GSZ Academy USA",
                type: "E-Commerce",
                sector: "E-commerce · Educación (EE. UU.)",
                challenge: "Una academia con operación en Estados Unidos vendía sus programas por mensajes directos y cobraba de forma manual: matrículas lentas, pagos difíciles de conciliar y cero capacidad de venta fuera del horario de atención.",
                solution: "Desarrollamos una plataforma e-commerce a medida: catálogo de programas, checkout con pagos en línea y panel de administración de alumnos, pedidos e ingresos. La venta quedó disponible 24/7 para el mercado estadounidense.",
                stack: ["Next.js", "Node.js", "PostgreSQL", "Pagos en línea"],
                results: [
                    "Ventas online 24/7 sin intervención manual",
                    "Matrícula en minutos, antes tomaba días",
                    "Conciliación de pagos automática",
                    "Operación remota Ecuador → EE. UU. en el mismo huso horario",
                ],
            },
        },
    },

    // Technologies Page
    technologies: {
        title: "Nuestro",
        titleHighlight: "Stack",
        flipWords: ["Stack", "Arsenal", "Motor", "Core"],
        titleEnd: "Tecnológico",
        subtitle: "Utilizamos las tecnologías más modernas y robustas del mercado para construir soluciones que escalan con tu negocio.",
        details: {
            badge: "Por qué elegirnos",
            title: "Tecnología que",
            titleHighlight: "Potencia tu Negocio",
            description: "No te abrumamos con tecnicismos. Lo que importa es cómo nuestra tecnología se traduce en resultados reales para tu empresa.",
            crossProjects: "Más de 50 sistemas en producción lo respaldan — mira los casos de éxito",
            cta: {
                text: "¿Quieres conocer más sobre nuestra arquitectura técnica?",
                button: "Conversemos",
            },
            benefits: {
                performance: {
                    title: "Rendimiento",
                    description: "Aplicaciones ultra-rápidas que tus usuarios amarán. Cada milisegundo cuenta.",
                    items: ["Tiempos de carga menores a 2 segundos", "Optimización automática de imágenes", "Caché inteligente para navegación instantánea", "Experiencia fluida en cualquier dispositivo"],
                },
                security: {
                    title: "Seguridad",
                    description: "Protección de nivel empresarial para ti y tus clientes. Tu tranquilidad es nuestra prioridad.",
                    items: ["Encriptación SSL/TLS en todas las conexiones", "Protección contra ataques DDoS", "Backups automáticos diarios", "Cumplimiento con normativas de datos"],
                },
                scalability: {
                    title: "Escalabilidad",
                    description: "Crece sin límites. Tu plataforma se adapta automáticamente a la demanda.",
                    items: ["Infraestructura cloud que crece contigo", "Sin caídas en momentos de alto tráfico", "Capacidad ilimitada de usuarios", "Costos que escalan con tu éxito"],
                },
            },
        },
        stackScreen: {
            header: "Stack Tecnológico",
            tagline: "Las mejores herramientas para resultados excepcionales",
            footer: "Stack Moderno",
            updated: "Actualizado 2024",
        },
    },

    // Page Actions (WhatsApp Messages)
    pageActions: {
        solutions: "¡Hola! Me interesa conocer más sobre sus soluciones.",
        projects: "¡Hola! Me gustaría ver más detalles de sus proyectos.",
        technologies: "¡Hola! Quisiera saber más sobre su stack tecnológico.",
    },

    // Footer
    // FAQ Section (home) — respuestas autocontenidas para snippets/AI Overviews
    faq: {
        badge: "FAQ",
        title: "Preguntas",
        titleHighlight: "frecuentes.",
        subtitle: "Lo que todo el mundo nos pregunta antes de empezar — respondido sin rodeos.",
        items: [
            {
                question: "¿Cuánto cuesta desarrollar software a medida en Ecuador?",
                answer: "Depende del alcance: no vendemos paquetes, cotizamos cada proyecto por alcance cerrado. Tras un diagnóstico gratuito de 30 minutos entregamos una propuesta con precio fijo y plazo definido, sin costos ocultos ni sorpresas a mitad de proyecto. El diagnóstico no tiene compromiso.",
            },
            {
                question: "¿Cuánto tiempo toma desarrollar un sistema a medida?",
                answer: "Un MVP funcional toma entre 4 y 6 semanas. Sistemas más complejos —un core financiero o un e-commerce con logística— se entregan por fases de 2 a 3 meses. Trabajamos en sprints con demos semanales: ves avances reales cada semana, no una sorpresa al final.",
            },
            {
                question: "¿Qué es n8n y para qué sirve?",
                answer: "n8n es una plataforma de automatización de flujos de trabajo, similar a Zapier pero de código abierto y auto-alojable, con más de 400 integraciones. La usamos para conectar tus sistemas —CRM, facturación, WhatsApp, hojas de cálculo— y eliminar tareas repetitivas. Nuestros clientes ahorran en promedio más de 20 horas semanales de trabajo manual.",
            },
            {
                question: "¿Me conviene software a medida o un SaaS genérico?",
                answer: "Un SaaS genérico conviene cuando tu proceso es estándar y cabes en su plantilla. El software a medida conviene cuando tu operación es tu ventaja competitiva: pagas por un sistema que encaja con tu proceso, sin licencias por usuario, y el código queda como activo de tu empresa. En el diagnóstico gratuito te decimos honestamente cuál necesitas — a veces la respuesta es un SaaS.",
            },
            {
                question: "¿Con qué tecnologías trabajan?",
                answer: "Nuestro stack principal es Next.js y React para web, React Native para apps móviles iOS y Android, Node.js en backend, PostgreSQL y Redis para datos, y n8n para automatización, sobre infraestructura cloud. Elegimos tecnologías con comunidades enormes: tu sistema nunca dependerá de una herramienta exótica ni de nosotros.",
            },
            {
                question: "¿Trabajan con empresas fuera de Ecuador?",
                answer: "Sí. Operamos desde Ecuador para toda Latinoamérica y Estados Unidos, 100% en remoto. Ecuador comparte huso horario con la costa este de EE. UU. (EST), lo que permite trabajo sincrónico con equipos norteamericanos. GSZ Academy, uno de nuestros casos de éxito, opera en Estados Unidos.",
            },
            {
                question: "¿Quién es dueño del código?",
                answer: "Tú. Al cerrar el proyecto entregamos el código fuente completo, la documentación técnica y los accesos de infraestructura a nombre de tu empresa. Sin lock-in: si mañana quieres trabajar con otro equipo, puedes hacerlo. Creemos que retener clientes por secuestro técnico es mala ingeniería.",
            },
            {
                question: "¿Qué incluye el diagnóstico gratuito?",
                answer: "Una reunión de 30 minutos por Google Meet donde analizamos tu operación, identificamos cuellos de botella y te decimos si tu caso se resuelve con automatización, software a medida o una herramienta que ya existe. Sales con un plan de acción concreto, sin compromiso de contratar.",
            },
            {
                question: "¿Ofrecen soporte después de la entrega?",
                answer: "Todo proyecto incluye 1 mes de soporte post-lanzamiento sin costo. Después puedes optar por un plan de mantenimiento mensual o por nuestro modelo de equipo dedicado con SLA de 99.9% de disponibilidad, pensado para empresas que necesitan evolución continua.",
            },
            {
                question: "¿Desarrollan aplicaciones móviles para iOS y Android?",
                answer: "Sí, con React Native: una sola base de código que corre de forma nativa en iOS y Android. Eso reduce significativamente el costo y el tiempo frente a construir dos apps separadas, y garantiza que ambas plataformas evolucionen a la par.",
            },
        ],
    },

    // Contact Page
    contact: {
        eyebrow: "Contacto",
        title: "Conversemos sobre tu",
        titleHighlight: "proyecto.",
        subtitle: "Agenda un diagnóstico gratuito de 30 minutos o escríbenos directo por WhatsApp. Respondemos en menos de 24 horas hábiles.",
        bookingTitle: "Agenda tu diagnóstico",
        bookingDesc: "30 minutos por Google Meet. Analizamos tu operación y sales con un plan de acción — sin compromiso.",
        bookingCta: "Agendar diagnóstico",
        whatsappTitle: "Escríbenos por WhatsApp",
        whatsappDesc: "¿Prefieres ir al grano? Cuéntanos tu caso en un mensaje y te respondemos el mismo día hábil.",
        whatsappCta: "Abrir WhatsApp",
        infoTitle: "Datos directos",
        infoItems: [
            "WhatsApp y teléfono: +593 99 549 8636",
            "Base: Quito, Ecuador — trabajamos en remoto para toda LATAM y EE. UU.",
            "Horario: lunes a viernes, 9:00–18:00 (GMT-5, mismo huso que EST)",
        ],
        faq: [
            {
                question: "¿Qué pasa después de agendar?",
                answer: "Recibes la invitación de Google Meet al instante. En la llamada revisamos tu operación y en pocos días hábiles te enviamos una propuesta con alcance y precio cerrado.",
            },
            {
                question: "¿Atienden en inglés?",
                answer: "Sí, atendemos en español e inglés.",
            },
            {
                question: "¿Trabajan con empresas fuera de Ecuador?",
                answer: "Sí, operamos en remoto para LATAM y Estados Unidos; compartimos huso horario con la costa este de EE. UU.",
            },
        ],
    },

    // Overlay de booking (CalendarBooking)
    booking: {
        title: "Agenda tu llamada",
        benefit1: "Auditoría de procesos actuales e identificación de cuellos de botella.",
        benefit2: "Plan de acción personalizado para automatizar y escalar tu negocio.",
        quote: "La implementación tecnológica de Khannda optimizó drásticamente nuestros tiempos de respuesta. Un aliado estratégico clave.",
        quoteAuthor: "Cooperativa Terán",
        quoteRole: "Sector Financiero",
    },

    footer: {
        cta: {
            title: "Construyamos.",
            subline: "Un diagnóstico de 30 minutos por Google Meet. Sales con un plan de acción — con o sin nosotros.",
            button: "Agendar diagnóstico gratuito",
            whatsappLabel: "o directo por WhatsApp",
            phoneDisplay: "+593 99 549 8636",
        },
        tagline: "Arquitectura digital invisible para empresas que escalan.",
        services: {
            title: "Servicios",
            development: "Desarrollo a Medida",
            automation: "Automatización",
            consulting: "Consultoría Cloud",
        },
        company: {
            title: "Compañía",
            about: "Sobre Nosotros",
            cases: "Casos de Éxito",
            contact: "Contacto",
        },
        legal: {
            title: "Legal",
            terms: "Términos de Servicio",
            privacy: "Privacidad",
            faq: "Preguntas Frecuentes",
        },
        copyright: "Todos los derechos reservados.",
        systemStatus: "SYSTEM NORMAL",
    },

    // WhatsApp FAB
    whatsapp: {
        home: "¡Hola! Me interesa conocer más sobre sus servicios.",
        solutions: "¡Hola! Me interesa conocer más sobre sus soluciones.",
        projects: "¡Hola! Me gustaría ver más detalles de sus proyectos.",
        technologies: "¡Hola! Quisiera saber más sobre su stack tecnológico.",
    },

    // Calendar Booking
    calendar: {
        badge: "Consultoría",
        title: "Agenda tu Consultoría",
        subtitle: "Selecciona el horario que mejor se adapte a ti y comienza tu transformación digital.",
        loading: "Cargando calendario...",
        alternative: "¿Prefieres escribirnos directamente?",
        whatsapp: "Escríbenos por WhatsApp",
        benefit1Title: "Consultoría personalizada",
        benefit1Desc: "Analizamos tu caso específico y tus objetivos de negocio.",
        benefit2Title: "Propuesta a medida",
        benefit2Desc: "Recibe un plan de acción adaptado a tus necesidades.",
        benefit3Title: "Sin compromisos",
        benefit3Desc: "Reunión gratuita por Google Meet de 30 minutos.",
    },
};

// Type helper for deep structure matching (allows different string values)
type DeepStringify<T> = T extends string
    ? string
    : T extends readonly string[]
    ? string[]
    : T extends object
    ? { [K in keyof T]: DeepStringify<T[K]> }
    : T;

export type Translations = DeepStringify<typeof es>;
