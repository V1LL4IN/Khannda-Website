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

    // Hero Section — editorial typographic. titleBefore splits on '\n';
    // the <h1> textContent must keep "custom software development" contiguous.
    hero: {
        eyebrow: "Khannda · Quito → LATAM & US · since 2019",
        titleBefore: "Custom\nsoftware",
        titleEmphasis: "development",
        titleAfter: ".",
        description: "Web, mobile and n8n automation systems for companies across LATAM and the US. Fixed scope, code you own, an MVP in production in 4–6 weeks.",
        cta: "Book a diagnostic",
        ctaSecondary: "See the work",
        proof: "Est. 2019 · 10+ systems in production · Fintech / Logistics / Retail / Health",
    },

    // Editorial intro (home)
    intro: {
        title: "What you'll find here.",
        body: "Khannda is a custom software development company based in Quito, Ecuador. Since 2019 we have put 10+ systems into production for fintech, logistics, retail and healthcare. No digital-transformation promises, no 40-slide decks: below is what we do, three real systems, how we charge, and the questions everyone asks before starting. If your case doesn't need custom software, we'll tell you on the first call.",
    },

    // Giant separator words (decorative, aria-hidden; universal terms —
    // intentionally identical in both languages)
    separators: ["Software", "Fintech", "Uptime", "Partner"],

    // About Section — A1 Layered Stack
    about: {
        eyebrow: "How we build it",
        title: "Invisible",
        titleHighlight: "Architecture.",
        subtitle: "Your customer only sees the screen. Behind it run five layers we design, operate, and guarantee.",
        layers: [
            {
                name: "Experience",
                tag: "Web · Mobile · Performance",
                own: "All your user ever sees: web plus iOS and Android apps from a single codebase.",
                stack: ["Next.js", "React", "React Native", "Tailwind CSS"],
                metric: "< 2 s",
                metricLabel: "target load time",
            },
            {
                name: "Integrations",
                tag: "APIs · Webhooks · n8n",
                own: "Your CRM, invoicing, WhatsApp and spreadsheets connected to each other, with nobody copying and pasting.",
                stack: ["n8n", "REST APIs", "Webhooks", "Salesforce"],
                metric: "400+",
                metricLabel: "integrations with n8n",
            },
            {
                name: "Business Logic",
                tag: "Rules · Processes · Calculations",
                own: "The rules, calculations and workflows unique to your operation, custom-built and documented.",
                stack: ["Node.js", "TypeScript"],
                metric: "4–6",
                metricLabel: "weeks to a working MVP",
            },
            {
                name: "Data",
                tag: "Database · Cache · Backups",
                own: "A relational database with automatic daily backups and access in your company's name.",
                stack: ["PostgreSQL", "Redis", "Cloud"],
                metric: "Daily",
                metricLabel: "automatic backups",
            },
            {
                name: "Security",
                tag: "Encryption · Roles · Audit",
                own: "Data encryption, role-based access and an audit trail for every transaction.",
                stack: ["SSL/TLS", "Role-based access", "Audit trail"],
                metric: "100%",
                metricLabel: "of operations audited · fintech case",
            },
        ],
        footerNote: "5 layers · code, documentation and access in your name",
        footerCta: "Explore our technology stack",
    },

    // Services Section
    services: {
        title: "What we do.",
        subtitle: "Four ways to work with us. All are quoted as a fixed scope and end with source code, documentation and support in your hands.",
        items: {
            development: {
                title: "Custom Development",
                description: "Custom web and mobile applications that fit your operation — not the other way around. A working MVP in 4–6 weeks, with an architecture designed to scale from day one.",
                linkText: "Explore custom software development",
                features: ["Microservices", "REST/GraphQL APIs", "Cloud Native"],
            },
            security: {
                title: "High Security & Fintech",
                description: "Software for fintech companies and credit unions with banking-grade standards: data encryption, role-based access and an audit trail for every transaction.",
                linkText: "See the Cooperativa César Terán case study",
                features: ["Data encryption", "Role-based access", "Per-transaction audit"],
            },
            automation: {
                title: "Operational Automation",
                description: "We automate processes with n8n: connecting your CRM, invoicing, WhatsApp and spreadsheets through 400+ integrations. Our clients save an average of 20+ hours of manual work per week.",
                linkText: "How we apply n8n automation",
                features: ["RPA / Bots", "System Integration", "Webhooks & Events"],
            },
            consulting: {
                title: "Technology Consulting",
                description: "We audit your technical debt and deliver a modernization roadmap prioritized by return. It starts with a free 30-minute assessment.",
                linkText: "Start with a free assessment",
                features: ["Code Reviews", "System Design", "Tech Stack Selection"],
            },
        },
        metrics: {
            efficiency: { value: "20+ H", label: "Saved per week", desc: "Manual work our clients save on average with automation." },
            timeToMarket: { value: "4–6 WKS", label: "Working MVP", desc: "Sprints with weekly demos: you see real progress every week." },
            ownership: { value: "100%", label: "Your code", desc: "Source code, documentation and access in your company's name." },
        },
        outroText: "Not sure which of the four you need? That's what the diagnostic is for.",
        outroCta: "Book a free diagnostic",
    },

    // Work Index (home) — rows read from projects.showcase.*
    work: {
        eyebrow: "Selected work",
        title: "Systems in production.",
        subtitle: "Three of the 10+ systems we've kept in production since 2019.",
        statusLabel: "In production",
        completedLabel: "Completed:",
        viewCase: "View case",
        allCases: "See all case studies",
    },

    // Pricing Section
    pricing: {
        title: "Collaboration",
        titleHighlight: "Models",
        subtitle: "Total transparency. No hidden costs.",
        lead: "Every custom software project is quoted as a fixed scope after a free assessment: you know the price and timeline before we start. In both models, you own the source code.",
        leadLink: "Book a free assessment",
        plans: {
            essential: {
                name: "Essential Systematization",
                description: "Ideal for validating products or starting digital transformation.",
                pricing: "Project-Based",
                pricingNote: "Quote based on defined scope",
                features: ["MVP in 4–6 weeks", "Essential UI/UX Design", "Basic Cloud Infrastructure", "1 Month Post-Launch Support"],
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
        title: "Software Solutions that",
        titleHighlight: "Drive",
        flipWords: ["Drive", "Transform", "Power", "Accelerate"],
        titleEnd: "your Business",
        subtitle: "Three ways to fix your operation: automate the repetitive with n8n, build custom software, or start with consulting. All are quoted as a fixed scope.",
        crossCases: "See how we apply it in our case studies",
        crossStack: "Explore our technology stack",
        faqTitle: "Frequently asked questions about these solutions",
        cta: "View details",
        topics: {
            automation: {
                title: "Automation",
                cardTitle: "Automation with n8n",
                description: "We connect your CRM, invoicing, WhatsApp and spreadsheets with n8n, an open-source automation platform. What someone copies and pastes by hand today starts running on its own.",
                highlights: ["Custom workflows running 24/7", "+400 ready-to-use integrations", "Average savings of 20+ hours weekly", "No more copy-and-paste tasks"],
            },
            development: {
                title: "Development",
                cardTitle: "Custom Software",
                description: "Web and mobile applications built around your process, with Next.js, React Native and Node.js. A working MVP in 4–6 weeks and, when we finish, you own the source code.",
                highlights: ["Modern and responsive web apps", "iOS and Android mobile apps", "Cloud-native architectures", "Continuous support and maintenance"],
            },
            consulting: {
                title: "Consulting",
                cardTitle: "Process Optimization",
                description: "We analyze your operation, find the bottlenecks and deliver a modernization roadmap prioritized by return. It starts with a free 30-minute assessment.",
                highlights: ["Deep operations analysis", "Digital transformation roadmap", "Clear and measurable KPIs", "Priorities ranked by return"],
            },
        },
    },

    // Projects Page
    projects: {
        title: "",
        flipWords: ["Real", "Measurable", "Live"],
        titleEnd: "Case Studies",
        subtitle: "How we have transformed businesses in Ecuador and the United States with custom software and automation.",
        crossText: "Does your operation look like one of these cases?",
        crossLink: "Book a free assessment",
        detailLabel: "The cases in detail",
        labels: {
            challenge: "The problem",
            solution: "The solution",
            stack: "Stack",
            results: "Results",
            screenshot: "System screenshot",
            demoData: "Demo data",
        },
        showcase: {
            finance: {
                title: "Cooperativa César Terán",
                type: "Fintech",
                sector: "Fintech · Savings & credit union",
                challenge: "The credit union managed members, savings and loans with manual processes and spreadsheets: slow teller service, error-prone interest calculations and no trace of who touched each record.",
                solution: "We designed and built a custom financial management system: member accounts, savings, loans with automatic amortization tables, cash desk and management reporting. Banking-grade security: data encryption, role-based access and an immutable audit trail for every transaction.",
                stack: ["Next.js", "Node.js", "PostgreSQL", "Cloud + daily backups"],
                results: [
                    "Member service in minutes, no queues",
                    "100% of operations with an audit trail",
                    "Automated daily cash reconciliation",
                    "Interest calculations with zero manual errors",
                ],
            },
            fitness: {
                title: "Gym CT Tulcán",
                type: "Administration System",
                sector: "Fitness · Membership management",
                challenge: "Memberships were tracked on paper and Excel: overdue payments went unnoticed, renewals were lost and there was no visibility into real attendance. Delinquency only surfaced at the end of the month.",
                solution: "We built a web-based management system for the gym: memberships and plans, payment and renewal tracking, attendance check-in and a business metrics dashboard. With n8n we automated WhatsApp renewal reminders, with zero staff involvement.",
                stack: ["Next.js", "Node.js", "PostgreSQL", "n8n"],
                results: [
                    "Delinquency visible and managed in real time",
                    "100% of renewals with automatic WhatsApp reminders",
                    "Live attendance and occupancy dashboard",
                    "Admin hours freed up every week",
                ],
            },
            altus: {
                title: "Altus Commercial Receivables",
                type: "Corporate website",
                sector: "Corporate website · B2B commercial collections (USA)",
                challenge: "Altus, a US B2B commercial receivables recovery firm, needed to rebuild its corporate website on a modern foundation without losing the URLs or search rankings of the previous site, and to connect its forms, chat and calls to the sales team.",
                solution: "We rebuilt the site in Next.js from the design prototype: 50+ service, industry and city pages that keep the previous site's routes and redirects. We integrated Sanity as the CMS for campaign landing pages and articles, forms that create leads in Salesforce, and a pipeline that routes chats and calls to the sales team. It includes an interactive DSO calculator, JSON-LD structured data, a sitemap and llms.txt.",
                stack: ["Next.js", "TypeScript", "Tailwind CSS", "Sanity CMS", "Salesforce"],
                results: [
                    "50+ service, industry and city pages",
                    "Forms that create leads directly in Salesforce",
                    "Landing pages and articles editable from the CMS",
                    "Structured data and llms.txt for search engines and AI assistants",
                ],
            },
        },
    },

    // Technologies Page
    technologies: {
        title: "Our",
        flipWords: ["Modern", "Proven", "Scalable", "Open"],
        titleEnd: "Tech Stack",
        subtitle: "Next.js, React and React Native on the frontend; Node.js and PostgreSQL on the backend; n8n for automation. Technologies with huge communities: your system will never depend on an exotic tool, or on us.",
        details: {
            badge: "Why Choose Us",
            title: "Technology that",
            titleHighlight: "Powers Your Business",
            description: "We don't overwhelm you with technicalities. What matters is how our technology translates into real results for your company.",
            crossProjects: "Backed by 10+ systems in production — see the case studies",
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
                    description: "Grow with your business. The infrastructure expands when demand calls for it.",
                    items: ["Cloud infrastructure that grows with you", "Ready for traffic spikes", "Capacity that expands with demand", "Costs that scale with your success"],
                },
            },
        },
        stackScreen: {
            header: "Tech Stack",
            tagline: "The best tools for exceptional results",
            list: "Next.js, React, TypeScript, Tailwind CSS, Node.js, PostgreSQL, AWS and n8n.",
            footer: "Modern Stack",
            updated: "Updated 2026",
        },
    },

    // Page Actions (WhatsApp Messages)
    pageActions: {
        solutions: "Hi! I'm interested in learning more about your solutions.",
        projects: "Hi! I'd like to see more details about your projects.",
        technologies: "Hi! I'd like to know more about your tech stack.",
    },

    // Footer
    // FAQ Section (home)
    faq: {
        badge: "FAQ",
        title: "Frequently asked",
        titleHighlight: "questions.",
        subtitle: "What everyone asks us before starting — answered straight.",
        items: [
            {
                question: "How much does custom software development cost in Ecuador?",
                answer: "It depends on the scope: we don't sell packages, we quote every project as a fixed scope. After a free 30-minute assessment you get a proposal with a fixed price and a defined timeline — no hidden costs, no mid-project surprises. The assessment carries no commitment.",
            },
            {
                question: "How long does it take to build a custom system?",
                answer: "A working MVP takes 4 to 6 weeks. More complex systems — a financial core or an e-commerce platform with logistics — ship in 2-to-3-month phases. We work in sprints with weekly demos: you see real progress every week, not a surprise at the end.",
            },
            {
                question: "What is n8n and what is it used for?",
                answer: "n8n is a workflow automation platform — similar to Zapier, but open source and self-hostable — with 400+ integrations. We use it to connect your systems (CRM, invoicing, WhatsApp, spreadsheets) and eliminate repetitive tasks. Our clients save an average of 20+ hours of manual work per week.",
            },
            {
                question: "Should I build custom software or use a generic SaaS?",
                answer: "A generic SaaS makes sense when your process is standard and fits its template. Custom software makes sense when your operation is your competitive advantage: you pay for a system that fits your process, with no per-user licenses, and the code becomes an asset of your company. In the free assessment we tell you honestly which one you need — sometimes the answer is a SaaS.",
            },
            {
                question: "What technologies do you work with?",
                answer: "Our core stack is Next.js and React for web, React Native for iOS and Android mobile apps, Node.js on the backend, PostgreSQL and Redis for data, and n8n for automation, on cloud infrastructure. We choose technologies with huge communities: your system will never depend on an exotic tool — or on us.",
            },
            {
                question: "Do you work with companies outside Ecuador?",
                answer: "Yes. We operate from Ecuador for all of Latin America and the United States, 100% remotely. Ecuador shares its time zone with the US East Coast (EST), which enables synchronous work with North American teams. Altus Commercial Receivables, one of our case studies, is a US firm.",
            },
            {
                question: "Who owns the code?",
                answer: "You do. At project close we hand over the complete source code, technical documentation and infrastructure access in your company's name. No lock-in: if tomorrow you want to work with another team, you can. We believe retaining clients through technical hostage-taking is bad engineering.",
            },
            {
                question: "What does the free assessment include?",
                answer: "A 30-minute Google Meet call where we analyze your operation, identify bottlenecks and tell you whether your case is solved with automation, custom software or a tool that already exists. You leave with a concrete action plan, with no obligation to hire us.",
            },
            {
                question: "Do you offer support after delivery?",
                answer: "Every project includes 1 month of post-launch support at no cost. After that you can opt for a monthly maintenance plan or our dedicated-team model with a 99.9% availability SLA, designed for companies that need continuous evolution.",
            },
            {
                question: "Do you build mobile apps for iOS and Android?",
                answer: "Yes, with React Native: a single codebase that runs natively on iOS and Android. That significantly reduces cost and time compared to building two separate apps, and guarantees both platforms evolve together.",
            },
        ],
    },

    // Contact Page
    contact: {
        eyebrow: "Contact",
        title: "Let's talk about your",
        titleHighlight: "project.",
        subtitle: "Book a free 30-minute assessment or message us directly on WhatsApp. We reply within one business day.",
        bookingTitle: "Book your assessment",
        bookingDesc: "30 minutes over Google Meet. We analyze your operation and you leave with an action plan — no strings attached.",
        bookingCta: "Book assessment",
        whatsappTitle: "Message us on WhatsApp",
        whatsappDesc: "Prefer to get straight to the point? Tell us your case in a message and we'll reply the same business day.",
        whatsappCta: "Open WhatsApp",
        infoTitle: "Direct details",
        infoItems: [
            "WhatsApp and phone: +593 99 549 8636",
            "Base: Quito, Ecuador — working remotely across LATAM and the US",
            "Hours: Monday to Friday, 9:00–18:00 (GMT-5, same as EST)",
        ],
        faq: [
            {
                question: "What happens after I book?",
                answer: "You receive the Google Meet invitation instantly. On the call we review your operation, and within a few business days you get a proposal with a fixed scope and price.",
            },
            {
                question: "Do you work in English?",
                answer: "Yes, we work in both Spanish and English.",
            },
            {
                question: "Do you work with companies outside Ecuador?",
                answer: "Yes, we operate remotely across LATAM and the United States; we share the same time zone as the US East Coast.",
            },
        ],
    },

    // Booking overlay (CalendarBooking)
    booking: {
        title: "Book your call",
        benefit1: "Audit of your current processes and identification of bottlenecks.",
        benefit2: "A personalized action plan to automate and scale your business.",
        quote: "Khannda's technology implementation drastically improved our response times. A key strategic ally.",
        quoteAuthor: "Cooperativa Terán",
        quoteRole: "Financial Sector",
    },

    footer: {
        cta: {
            title: "Let's build.",
            subline: "A 30-minute diagnostic over Google Meet. You leave with an action plan — with or without us.",
            button: "Book a free diagnostic",
            whatsappLabel: "or straight on WhatsApp",
            phoneDisplay: "+593 99 549 8636",
        },
        tagline: "Invisible digital architecture for companies that scale.",
        services: {
            title: "Services",
            development: "Custom Development",
            automation: "Automation",
            consulting: "Technology Consulting",
        },
        company: {
            title: "Company",
            about: "About Us",
            cases: "Case Studies",
            contact: "Contact",
        },
        legal: {
            title: "Legal",
            terms: "Terms of Service",
            privacy: "Privacy",
            faq: "FAQ",
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
