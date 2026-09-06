import type { PackageItem } from '@/types/content'

export const packages: PackageItem[] = [
  {
    id: 'session',
    title: 'Studio Session',
    scope: 'Aufnahme, Regie und technische Betreuung',
    priceNote: 'Nach Umfang',
    features: [
      'Vocal-, Instrumental- oder Sprachaufnahme',
      'Vorbereitung der Signalkette',
      'Export der vereinbarten Takes',
    ],
  },
  {
    id: 'produktion',
    title: 'Produktion',
    scope: 'Komposition, Arrangement, Mixing und Mastering',
    priceNote: 'Individuell kalkuliert',
    features: [
      'Künstlerische Begleitung',
      'Mix und Master nach Absprache',
      'Optionale Anzahlung bei größeren Projekten',
    ],
  },
  {
    id: 'film',
    title: 'Film & Marke',
    scope: 'Dokumentation, Imagefilm und Musik für Bild',
    priceNote: 'Projektangebot',
    features: ['Konzept und Drehplanung', 'Kamera, Ton und Schnitt', 'Musik passend zur Szene'],
  },
]
