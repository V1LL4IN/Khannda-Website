// src/lib/i18n/translations/es.ts
// Spanish translations

export const es = {
    // Navigation
    nav: {
        solutions: "Soluciones",
        projects: "Proyectos",
        technologies: "Tecnologías",
        startProject: "Start Project",
    },

    // Hero Section — H1d Outcome Dark
    hero: {
        eyebrow: "· Ingeniería de software a medida",
        titleBefore: "Desarrollo de software",
        titleEmphasis: "a medida",
        titleAfter: "para empresas que escalan.",
        description: "Diseñamos y operamos software a medida para empresas que escalan. Web, móvil y automatización — sin reescribir nada en tres años.",
        cta: "Agendar diagnóstico",
        ctaSecondary: "Ver cómo trabajamos",
        sectors: "Fintech · Logística · Retail · Salud",
        scroll: "scroll ↓",
    },

    // About Section — A1 Layered Stack
    about: {
        eyebrow: "Why Khannda · 01",
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
    },

    // Services Section
    services: {
        badge: "Capabilities",
        title: "Nuestros",
        titleHighlight: "Servicios",
        subtitle: "Ingeniería de software de primer nivel para resolver desafíos de negocio complejos.",
        items: {
            development: {
                title: "Desarrollo a Medida",
                description: "Arquitectura de software diseñada para escalar. Código limpio, modular y mantenible.",
                features: ["Microservicios", "APIs REST/GraphQL", "Cloud Native"],
            },
            security: {
                title: "Alta Seguridad & Fintech",
                description: "Infraestructura crítica con estándares bancarios. Protección de datos y transaccionalidad garantizada.",
                features: ["Encriptación E2E", "Compliance PCI-DSS", "Auditoría Continua"],
            },
            automation: {
                title: "Automatización Operativa",
                description: "Eliminamos el trabajo manual. Bots, scripts y flujos de trabajo inteligentes que trabajan 24/7.",
                features: ["RPA / Bots", "Integración de Sistemas", "Webhooks & Eventos"],
            },
            consulting: {
                title: "Consultoría Tecnológica",
                description: "Auditoría de deuda técnica y roadmap de modernización para empresas establecidas.",
                features: ["Code Reviews", "System Design", "Tech Stack Selection"],
            },
        },
        metrics: {
            efficiency: { value: "+40%", label: "Eficiencia Operativa", desc: "Reducción promedio de carga manual." },
            timeToMarket: { value: "4 WKS", label: "Time-to-Market", desc: "Ciclos de desarrollo ágiles y rápidos." },
            ownership: { value: "2x", label: "Más Rápido", desc: "Desarrollo ágil y entregas frecuentes." },
        },
    },

    // Pricing Section
    pricing: {
        badge: "Investment",
        title: "Modelos de",
        titleHighlight: "Colaboración",
        subtitle: "Transparencia total. Sin costos ocultos.",
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
        cta: {
            question: "¿Listo para digitalizar tu negocio?",
            action: "Conversemos",
        },
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
        title: "Tecnología que",
        titleHighlight: "Impulsa",
        flipWords: ["Impulsa", "Transforma", "Potencia", "Acelera"],
        titleEnd: "tu Negocio",
        subtitle: "Desde la automatización de flujos complejos hasta el desarrollo de plataformas robustas. Creamos el ecosistema digital que tu empresa necesita.",
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
        subtitle: "Descubre cómo hemos transformado negocios con soluciones tecnológicas a medida.",
        showcase: {
            finance: {
                title: "Cooperativa César Terán",
                type: "Cooperativa Terán",
            },
            fitness: {
                title: "Gym CT Tulcán",
                type: "Gym Tulcán",
            },
            retail: {
                title: "GSZ Academy USA",
                type: "E-Commerce",
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
    footer: {
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
            careers: "Carreras",
            partners: "Partners",
        },
        legal: {
            title: "Legal",
            terms: "Términos de Servicio",
            privacy: "Privacidad",
            status: "Status",
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
