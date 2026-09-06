import type { LegalItem } from '@/types/content'

export const faqItems: LegalItem[] = [
  {
    id: 'booking',
    title: 'Wie kann ich ein Projekt anfragen?',
    points: [
      'Am einfachsten über das Kontaktformular oder direkt per E-Mail an info@sherpaeaststudio.com.',
      'Termine werden nach Bestätigung verbindlich reserviert.',
    ],
  },
  {
    id: 'services',
    title: 'Welche Leistungen bietet Sherpa East an?',
    points: [
      'Tonaufnahmen, Mixing und Mastering, Komposition, Musikproduktion, Dokumentation, Imagefilm und Musik für Bild.',
      'Weitere Leistungen werden individuell nach Projektziel und Produktionsumfang vereinbart.',
    ],
  },
  {
    id: 'rights',
    title: 'Wie werden Nutzungsrechte geregelt?',
    points: [
      'Die konkrete Nutzung wird schriftlich vereinbart.',
      'Kommerzielle Weiterverwertung erfolgt nur im Rahmen der bestätigten Vereinbarung.',
    ],
  },
]

export const termsItems: LegalItem[] = [
  {
    id: 'appointments',
    title: 'Buchung und Stornierung',
    points: [
      'Änderungen oder Absagen sollen mindestens 48 Stunden vor dem Termin mitgeteilt werden.',
      'Bei verspäteter Absage oder Nichterscheinen kann eine Stornogebühr von 50 Prozent des vereinbarten Preises anfallen.',
    ],
  },
  {
    id: 'payment',
    title: 'Preise und Zahlung',
    points: [
      'Preise verstehen sich zuzüglich gesetzlicher Mehrwertsteuer.',
      'Bei größeren Projekten kann eine Anzahlung von bis zu 50 Prozent vereinbart werden.',
    ],
  },
  {
    id: 'studio-use',
    title: 'Studio, Daten und Vertraulichkeit',
    points: [
      'Studioeinrichtung und Geräte sind sorgsam und fachgerecht zu nutzen.',
      'Projektinformationen werden vertraulich behandelt. Kundinnen und Kunden bleiben für eigene Daten-Backups verantwortlich.',
    ],
  },
]
