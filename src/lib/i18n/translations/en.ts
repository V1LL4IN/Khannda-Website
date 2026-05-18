// src/lib/i18n/translations/en.ts
// English translations

import { Translations } from './es';

export const en: Translations = {
    // Navigation
    nav: {
        solutions: "Solutions",
        projects: "Projects",
        technologies: "Technologies",
        startProject: "Start Project",
    },

    // Hero Section — H1d Outcome Dark
    hero: {
        statusEst: "Khannda — est. 2019",
        statusCount: "50+ systems in production",
        eyebrow: "· Custom software engineering",
        titleBefore: "Custom software,",
        titleEmphasis: "built",
        titleAfter: "for businesses that scale.",
        description: "We design and operate custom software for businesses that scale. Web, mobile, and automation — no rewrites every three years.",
        cta: "Book a diagnostic",
        ctaSecondary: "See how we work",
        sectors: "Fintech · Logistics · Retail · Health",
        scroll: "scroll ↓",
    },

    // About Section — A1 Layered Stack
    about: {
        eyebrow: "Why Khannda · 01",
        title: "Invisible",
        titleHighlight: "Architecture.",
        subtitle: "Your customer only sees the screen. Behind it run five layers we design, operate, and guarantee. Hover any of them.",
        layers: [
            {
                name: "Experience",
                tag: "UX · UI · Performance",
                own: "All your user ever sees. Loads in under 1.2s, accessible, offline-ready.",
                stack: ["Next.js", "React Native", "Framer Motion", "WCAG AA"],
                metric: "+34%",
                metricLabel: "conversion post-redesign",
            },
            {
                name: "API Surface",
                tag: "Gateway · Auth · Contract",
                own: "A single versioned surface. Your team and your partners speak the same language.",
                stack: ["tRPC", "GraphQL Federation", "OAuth 2.1", "OpenAPI 3.1"],
                metric: "< 80ms",
                metricLabel: "global p95 · 6 regions",
            },
            {
                name: "Business Logic",
                tag: "Microservices · Events · Workflows",
                own: "Where your business model lives. Isolated, tested, observable, replaceable.",
                stack: ["Node 22", "Go", "Temporal", "Kafka", "SQS"],
                metric: "94%",
                metricLabel: "test coverage · main",
            },
            {
                name: "Data",
                tag: "OLTP · Warehouse · Cache",
                own: "Multi-region replication, verified backups, RTO < 15 min, RPO < 1 min.",
                stack: ["Postgres 16", "Redis", "ClickHouse", "dbt"],
                metric: "99.99%",
                metricLabel: "annualized durability",
            },
            {
                name: "Security",
                tag: "Zero-trust · Audit · Compliance",
                own: "E2E encryption, rotated secrets, immutable audit log, real-time alerts.",
                stack: ["mTLS", "Vault", "SIEM", "PCI-DSS", "SOC 2"],
                metric: "0",
                metricLabel: "Sev-1 incidents · 24m",
            },
        ],
        footerNote: "5 layers · 1 SLA contract · zero monoliths",
        footerCta: "See reference architecture →",
    },

    // Services Section
    services: {
        badge: "Capabilities",
        title: "Our",
        titleHighlight: "Services",
        subtitle: "World-class software engineering to solve complex business challenges.",
        items: {
            development: {
                title: "Custom Development",
                description: "Software architecture designed to scale. Clean, modular, and maintainable code.",
                features: ["Microservices", "REST/GraphQL APIs", "Cloud Native"],
            },
            security: {
                title: "High Security & Fintech",
                description: "Critical infrastructure with banking standards. Data protection and guaranteed transactionality.",
                features: ["E2E Encryption", "PCI-DSS Compliance", "Continuous Auditing"],
            },
            automation: {
                title: "Operational Automation",
                description: "We eliminate manual work. Bots, scripts, and intelligent workflows that work 24/7.",
                features: ["RPA / Bots", "System Integration", "Webhooks & Events"],
            },
            consulting: {
                title: "Technology Consulting",
                description: "Technical debt audit and modernization roadmap for established companies.",
                features: ["Code Reviews", "System Design", "Tech Stack Selection"],
            },
        },
        metrics: {
            efficiency: { value: "+40%", label: "Operational Efficiency", desc: "Average reduction in manual workload." },
            timeToMarket: { value: "4 WKS", label: "Time-to-Market", desc: "Agile and fast development cycles." },
            ownership: { value: "2x", label: "Faster", desc: "Agile development and frequent deliveries." },
        },
    },

    // Pricing Section
    pricing: {
        badge: "Investment",
        title: "Collaboration",
        titleHighlight: "Models",
        subtitle: "Total transparency. No hidden costs.",
        plans: {
            essential: {
                name: "Essential Systematization",
                description: "Ideal for validating products or starting digital transformation.",
                pricing: "Project-Based",
                pricingNote: "Quote based on defined scope",
                features: ["MVP in 4-6 weeks", "Essential UI/UX Design", "Basic Cloud Infrastructure", "1 Month Post-Launch Support"],
                cta: "Start Conversation",
            },
            enterprise: {
                name: "Total Transformation",
                tier: "Enterprise",
                description: "For companies that require continuous evolution and scalability.",
                pricing: "Retainer / Partner",
                pricingNote: "Dedicated team + Continuous evolution",
                features: ["Dedicated Engineering Team", "Scalable Architecture & Microservices", "Continuous Security Audit", "Guaranteed 99.9% SLA"],
                cta: "Schedule Consultation",
            },
        },
    },

    // Team Section
    team: {
        badge: "Leadership",
        title: "Our",
        titleHighlight: "Team",
        subtitle: "Empathy, technique, and passion for solving real problems with code.",
        cta: {
            question: "Ready to digitize your business?",
            action: "Let's Talk",
        },
        members: {
            matias: {
                role: "Data Analyst & AI Master",
                description: "Expert in extracting value from data and implementing artificial intelligence solutions. Matías transforms complex information into strategic decisions and builds AI systems that optimize your business operations.",
            },
            jose: {
                role: "Technology Strategy",
                description: "Visionary of scalable systems. José transforms abstract ideas into robust software architectures. His approach ensures your technology investment not only works today but is the solid foundation for your company's future growth.",
            },
            kevin: {
                role: "Innovation & Product",
                description: "Designer of functional experiences. Kevin ensures the complexity of code translates into simple and intuitive interfaces. His obsession is making our software easier to use than a notebook.",
            },
            kenny: {
                role: "Full Stack Developer",
                description: "Integral developer who masters both frontend and backend. Kenny builds robust applications from start to finish, ensuring every line of code adds value and performance to your business.",
            },
        },
    },

    // Solutions Page
    solutions: {
        title: "Technology that",
        titleHighlight: "Drives",
        flipWords: ["Drives", "Transforms", "Powers", "Accelerates"],
        titleEnd: "your Business",
        subtitle: "From making complex workflows automatic to building robust platforms. We create the digital ecosystem your company needs.",
        cta: "View details",
        topics: {
            automation: {
                title: "Automation",
                cardTitle: "Automation with n8n",
                description: "Connect your favorite apps and automate repetitive tasks. Intelligent workflows that save hours of manual work every week.",
                tagline: "Connect your apps. Eliminate the repetitive. Scale without limits.",
                highlights: ["Custom workflows running 24/7", "+400 ready-to-use integrations", "Average savings of 20+ hours weekly", "Zero manual errors"],
            },
            development: {
                title: "Development",
                cardTitle: "Custom Software",
                description: "Custom web and mobile application development. Scalable solutions built with the latest market technologies.",
                tagline: "Code that scales. Design that captivates. Results that matter.",
                highlights: ["Modern and responsive web apps", "iOS and Android mobile apps", "Cloud-native architectures", "Continuous support and maintenance"],
            },
            consulting: {
                title: "Consulting",
                cardTitle: "Process Optimization",
                description: "We analyze and digitize your business operations. We transform slow processes into agile and efficient systems.",
                tagline: "We transform operations. We digitize processes. We multiply results.",
                highlights: ["Deep operations analysis", "Digital transformation roadmap", "Clear and measurable KPIs", "Guaranteed ROI"],
            },
        },
    },

    // Projects Page
    projects: {
        title: "Success",
        titleHighlight: "Stories",
        flipWords: ["Stories", "Cases", "Results", "Wins"],
        subtitle: "Discover how we have transformed businesses with custom technological solutions.",
        showcase: {
            finance: {
                title: "Cooperativa César Terán",
                type: "Fintech",
            },
            fitness: {
                title: "Gym CT Tulcán",
                type: "Administration System",
            },
            retail: {
                title: "GZS Academy USA",
                type: "E-Commerce",
            },
        },
    },

    // Technologies Page
    technologies: {
        title: "Our",
        titleHighlight: "Tech",
        flipWords: ["Tech", "Digital", "Cloud", "Dev"],
        titleEnd: "Stack",
        subtitle: "We use the most modern and robust technologies on the market to build solutions that scale with your business.",
        details: {
            badge: "Why Choose Us",
            title: "Technology that",
            titleHighlight: "Powers Your Business",
            description: "We don't overwhelm you with technicalities. What matters is how our technology translates into real results for your company.",
            cta: {
                text: "Want to know more about our technical architecture?",
                button: "Let's Talk",
            },
            benefits: {
                performance: {
                    title: "Performance",
                    description: "Ultra-fast applications that your users will love. Every millisecond counts.",
                    items: ["Load times under 2 seconds", "Automatic image optimization", "Smart caching for instant navigation", "Smooth experience on any device"],
                },
                security: {
                    title: "Security",
                    description: "Enterprise-level protection for you and your customers. Your peace of mind is our priority.",
                    items: ["SSL/TLS encryption on all connections", "DDoS protection", "Daily automatic backups", "Data compliance"],
                },
                scalability: {
                    title: "Scalability",
                    description: "Grow without limits. Your platform automatically adapts to demand.",
                    items: ["Cloud infrastructure that grows with you", "No downtime during high traffic", "Unlimited user capacity", "Costs that scale with your success"],
                },
            },
        },
        stackScreen: {
            header: "Tech Stack",
            tagline: "The best tools for exceptional results",
            footer: "Modern Stack",
            updated: "Updated 2024",
        },
    },

    // Page Actions (WhatsApp Messages)
    pageActions: {
        solutions: "Hi! I'm interested in learning more about your solutions.",
        projects: "Hi! I'd like to see more details about your projects.",
        technologies: "Hi! I'd like to know more about your tech stack.",
    },

    // Footer
    footer: {
        tagline: "Invisible digital architecture for companies that scale.",
        services: {
            title: "Services",
            development: "Custom Development",
            automation: "Automation",
            consulting: "Cloud Consulting",
        },
        company: {
            title: "Company",
            about: "About Us",
            careers: "Careers",
            partners: "Partners",
        },
        legal: {
            title: "Legal",
            terms: "Terms of Service",
            privacy: "Privacy",
            status: "Status",
        },
        copyright: "All rights reserved.",
        systemStatus: "SYSTEM NORMAL",
    },

    // WhatsApp FAB
    whatsapp: {
        home: "Hello! I'm interested in learning more about your services.",
        solutions: "Hello! I'm interested in learning more about your solutions.",
        projects: "Hello! I'd like to see more details about your projects.",
        technologies: "Hello! I'd like to know more about your tech stack.",
    },

    // Calendar Booking
    calendar: {
        badge: "Consultation",
        title: "Book Your Consultation",
        subtitle: "Select a time that works best for you and start your digital transformation.",
        loading: "Loading calendar...",
        alternative: "Prefer to message us directly?",
        whatsapp: "Message us on WhatsApp",
        benefit1Title: "Personalized consultation",
        benefit1Desc: "We analyze your specific case and business goals.",
        benefit2Title: "Custom proposal",
        benefit2Desc: "Receive an action plan tailored to your needs.",
        benefit3Title: "No strings attached",
        benefit3Desc: "Free 30-minute Google Meet session.",
    },
};
