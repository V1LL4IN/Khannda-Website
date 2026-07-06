// lib/legal.ts — contenido de las páginas legales (mínimo viable, bilingüe).
// Señal E-E-A-T y requisito comercial; el copy es genérico y el usuario puede
// afinarlo con asesoría legal.

export interface LegalSection {
    heading: string;
    body: string;
}

export interface LegalDoc {
    title: string;
    updated: string;
    sections: LegalSection[];
}

export const legalContent: Record<'es' | 'en', { terminos: LegalDoc; privacidad: LegalDoc }> = {
    es: {
        terminos: {
            title: 'Términos de Servicio',
            updated: 'Última actualización: julio 2026',
            sections: [
                {
                    heading: 'Alcance de los servicios',
                    body: 'Khannda presta servicios de desarrollo de software a medida, automatización de procesos y consultoría tecnológica. Cada proyecto se rige por una propuesta con alcance, plazos y precio cerrados, acordada por escrito antes de iniciar el trabajo.',
                },
                {
                    heading: 'Propiedad intelectual',
                    body: 'Al completar el pago total del proyecto, el cliente recibe el código fuente completo, la documentación técnica y los accesos de infraestructura a nombre de su empresa. Khannda puede referenciar el proyecto en su portafolio salvo acuerdo de confidencialidad en contrario.',
                },
                {
                    heading: 'Responsabilidad',
                    body: 'Khannda responde por el correcto funcionamiento de lo entregado según el alcance acordado e incluye un mes de soporte post-lanzamiento. No se responsabiliza por modificaciones de terceros posteriores a la entrega ni por daños indirectos derivados del uso del software.',
                },
                {
                    heading: 'Jurisdicción',
                    body: 'Estos términos se rigen por las leyes de la República del Ecuador. Cualquier controversia se someterá a los jueces competentes de la ciudad de Quito.',
                },
            ],
        },
        privacidad: {
            title: 'Política de Privacidad',
            updated: 'Última actualización: julio 2026',
            sections: [
                {
                    heading: 'Responsable',
                    body: 'Khannda, con base en Quito, Ecuador, es responsable del tratamiento de los datos personales recogidos a través de este sitio. Contacto: WhatsApp +593 99 549 8636.',
                },
                {
                    heading: 'Datos que recogemos',
                    body: 'Este sitio usa analítica anónima (Vercel Analytics y Speed Insights) que no identifica personas. Si agendas un diagnóstico, Google Calendar procesa tu nombre, correo y el horario elegido. Si nos escribes por WhatsApp, la conversación se rige por las condiciones de WhatsApp.',
                },
                {
                    heading: 'Finalidad y conservación',
                    body: 'Usamos tus datos exclusivamente para responder a tu solicitud, coordinar reuniones y preparar propuestas. No vendemos ni cedemos datos a terceros. Conservamos la información de contacto solo mientras exista una relación comercial activa o potencial.',
                },
                {
                    heading: 'Tus derechos',
                    body: 'Conforme a la Ley Orgánica de Protección de Datos Personales del Ecuador, puedes solicitar acceso, rectificación, eliminación u oposición al tratamiento de tus datos escribiéndonos por WhatsApp al +593 99 549 8636.',
                },
            ],
        },
    },
    en: {
        terminos: {
            title: 'Terms of Service',
            updated: 'Last updated: July 2026',
            sections: [
                {
                    heading: 'Scope of services',
                    body: 'Khannda provides custom software development, process automation and technology consulting services. Every project is governed by a proposal with a fixed scope, timeline and price, agreed in writing before work begins.',
                },
                {
                    heading: 'Intellectual property',
                    body: 'Upon full payment, the client receives the complete source code, technical documentation and infrastructure access in their company’s name. Khannda may reference the project in its portfolio unless a confidentiality agreement states otherwise.',
                },
                {
                    heading: 'Liability',
                    body: 'Khannda is responsible for the correct operation of deliverables within the agreed scope and includes one month of post-launch support. It is not liable for third-party modifications after delivery or for indirect damages arising from the use of the software.',
                },
                {
                    heading: 'Jurisdiction',
                    body: 'These terms are governed by the laws of the Republic of Ecuador. Any dispute shall be submitted to the competent courts of the city of Quito.',
                },
            ],
        },
        privacidad: {
            title: 'Privacy Policy',
            updated: 'Last updated: July 2026',
            sections: [
                {
                    heading: 'Data controller',
                    body: 'Khannda, based in Quito, Ecuador, is the controller of personal data collected through this site. Contact: WhatsApp +593 99 549 8636.',
                },
                {
                    heading: 'Data we collect',
                    body: 'This site uses anonymous analytics (Vercel Analytics and Speed Insights) that do not identify individuals. If you book an assessment, Google Calendar processes your name, email and chosen time slot. If you message us on WhatsApp, the conversation is governed by WhatsApp’s terms.',
                },
                {
                    heading: 'Purpose and retention',
                    body: 'We use your data exclusively to respond to your request, coordinate meetings and prepare proposals. We do not sell or share data with third parties. We keep contact information only while an active or potential business relationship exists.',
                },
                {
                    heading: 'Your rights',
                    body: 'Under Ecuador’s Organic Law on Personal Data Protection, you may request access, rectification, deletion or objection to the processing of your data by messaging us on WhatsApp at +593 99 549 8636.',
                },
            ],
        },
    },
};
