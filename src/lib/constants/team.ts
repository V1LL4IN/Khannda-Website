// Equipo: fuente única para la sección de la home y para el schema
// Organization (employee). El cargo y la bio viven en los diccionarios i18n
// bajo team.members[id].

export const TEAM = [
    { id: 'matias', name: 'Matías Villarreal', image: '/team/Mati.jpg' },
    { id: 'jose', name: 'José Terán', image: '/team/Pepe.jpeg' },
    { id: 'kevin', name: 'Kevin Cano', image: '/team/Kevin.jpg' },
    { id: 'kenny', name: 'Kenny Pinchao', image: '/team/Kenny.jpg' },
] as const;

export type TeamMemberId = (typeof TEAM)[number]['id'];
