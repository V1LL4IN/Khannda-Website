// Equipo: fuente única para la sección de la home y para el schema
// Organization (employee). El cargo y la bio viven en los diccionarios i18n
// bajo team.members[id]. `focus` es el object-position de la foto dentro de la
// tarjeta ancha del carrusel (dónde queda la cara al recortar).

export const TEAM = [
    { id: 'matias', name: 'Matías Villarreal', image: '/team/Mati.jpg', focus: '50% 50%' },
    { id: 'jose', name: 'José Terán', image: '/team/Pepe.jpeg', focus: '50% 50%' },
    { id: 'kevin', name: 'Kevin Cano', image: '/team/Kevin.jpg', focus: '50% 30%' },
    { id: 'kenny', name: 'Kenny Pinchao', image: '/team/Kenny.jpg', focus: '50% 50%' },
] as const;

export type TeamMemberId = (typeof TEAM)[number]['id'];
