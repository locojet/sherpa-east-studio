import type { ServiceItem } from '@/types/content'

export const services: ServiceItem[] = [
  {
    id: 'recording',
    title: 'Aufnahme',
    icon: 'REC',
    description: 'Vocal- und Instrumentalaufnahmen mit einer sorgfältig abgestimmten Signalkette.',
    detail:
      'Geführte Sessions, flexible Mikrofonierung und kreative Regie für Energie und Charakter.',
  },
  {
    id: 'production',
    title: 'Musikproduktion',
    icon: 'PRD',
    description: 'Produktion vom ersten Entwurf bis zu Arrangements, die bereit für den Mix sind.',
    detail: 'Struktur, Textur, Programming, Instrumente und kreative Betreuung aus einer Hand.',
  },
  {
    id: 'mixing',
    title: 'Mixing',
    icon: 'MIX',
    description: 'Mixes mit Tiefe, Kontrast und einer räumlichen, filmischen Klangbühne.',
    detail: 'Balance, Automation, analog geprägte Bearbeitung und Abgleich mit Referenzen.',
  },
  {
    id: 'mastering',
    title: 'Mastering',
    icon: 'MST',
    description: 'Finale Veredelung mit Klarheit, Druck und sicherer Übersetzung auf Plattformen.',
    detail: 'Mastering, Stem-Versionen, alternative Exporte und technische Qualitätskontrolle.',
  },
  {
    id: 'live-sessions',
    title: 'Live Sessions',
    icon: 'LIV',
    description: 'Live-Sessions mit intimer, editorialer Ästhetik und sauberem Mehrspurklang.',
    detail: 'Setplanung, Multitrack-Aufnahme, schneller Mix und Begleitung der Performance.',
  },
  {
    id: 'podcast',
    title: 'Podcast-Produktion',
    icon: 'POD',
    description: 'Aufnahme, Schnitt und Klanggestaltung für Stimmen, Gespräche und Serienformate.',
    detail: 'Voice-Setup, Editing, Restaurierung, Musikbetten und komplette Auslieferung.',
  },
  {
    id: 'sound-design',
    title: 'Klangdesign',
    icon: 'SND',
    description: 'Klangidentitäten, Übergänge, Atmosphären und Klänge für Bild und Marke.',
    detail:
      'Organische Layer, Synthese, kreatives Foley und Klanggestaltung mit erzählerischem Fokus.',
  },
]
