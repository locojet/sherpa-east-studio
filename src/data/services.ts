import type { ServiceItem } from '@/types/content'

export const services: ServiceItem[] = [
  {
    id: 'recording',
    title: 'Tonaufnahmen',
    icon: 'REC',
    description: 'Vocal-, Instrumental- und Sprachaufnahmen mit Ruhe, Präzision und Regie.',
    detail:
      'Verbindliche Termine, saubere Vorbereitung und eine Atmosphäre, in der Performance wachsen kann.',
  },
  {
    id: 'production',
    title: 'Komposition & Produktion',
    icon: 'CMP',
    description: 'Musikalische Begleitung vom ersten Motiv bis zur finalen Veröffentlichung.',
    detail: 'Arrangement, Soundauswahl, Dramaturgie und klare Entscheidungen im kreativen Prozess.',
  },
  {
    id: 'mixing',
    title: 'Mixing & Mastering',
    icon: 'MIX',
    description: 'Mixes und Master mit Tiefe, Druck und sicherer Übersetzung auf Plattformen.',
    detail:
      'Balance, Automation, finale Qualitätskontrolle und Versionen nach individueller Absprache.',
  },
  {
    id: 'documentary',
    title: 'Dokumentarfilm',
    icon: 'DOC',
    description: 'Filmische Begleitung für Künstler, Menschen und Projekte mit eigener Haltung.',
    detail: 'Vom langfristigen Beobachten bis zu Musik, Schnitt und erzählerischer Verdichtung.',
  },
  {
    id: 'brand-film',
    title: 'Marken- & Imagefilm',
    icon: 'IMG',
    description: 'Hochwertige Filme für Unternehmen, Vereine und öffentliche Kommunikation.',
    detail: 'Kamera, Ton, Musik und Schnitt mit Fokus auf Identität statt austauschbarer Werbung.',
  },
  {
    id: 'readings',
    title: 'Lesungen & Auftritte',
    icon: 'LIV',
    description: 'Proben, Betonung und musikalische Verdichtung für Bühne, Text und Stimme.',
    detail: 'Gemeinsame Entwicklung von Ideen, Timing, Klangfarben und szenischem Ausdruck.',
  },
  {
    id: 'sound-design',
    title: 'Musik für Bild',
    icon: 'SND',
    description: 'Kompositionen und Klangräume, die Szenen tragen, ohne sie zu überreden.',
    detail:
      'Passende Musik pro Szene, atmosphärische Übergänge und Sounddesign mit erzählerischem Fokus.',
  },
]
