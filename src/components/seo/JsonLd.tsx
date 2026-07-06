// components/seo/JsonLd.tsx — inyección de JSON-LD (server component).
// El escape de '<' evita cierre prematuro del <script> si algún texto
// del schema contuviera markup.

export function JsonLd({ data }: { data: object }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(data).replace(/</g, '\\u003c'),
            }}
        />
    );
}
