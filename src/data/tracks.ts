import altitudeSession from '@/assets/audio/altitude-session-demo.wav'
import summitMaster from '@/assets/audio/summit-master-demo.wav'
import warmConsole from '@/assets/audio/warm-console-demo.wav'
import type { TrackItem } from '@/types/content'

export const tracks: TrackItem[] = [
  {
    id: 'altitude-session',
    title: 'Lesungsskizze',
    artist: 'Sherpa East Studio',
    src: altitudeSession,
    coverLabel: 'Nächtliche Bergsilhouette aus goldenen Audiowellen für Lesung und Stimme',
    mood: 'Stimme / Bühne',
    durationHint: '0:12',
  },
  {
    id: 'warm-console',
    title: 'Filmischer Raum',
    artist: 'Martine Seibert-Raken Doku',
    src: warmConsole,
    coverLabel: 'Analoge Konsole mit warmem Licht und dokumentarischem Studioschatten',
    mood: 'Musik für Bild',
    durationHint: '0:10',
  },
  {
    id: 'summit-master',
    title: 'Atlas Entwurf',
    artist: 'Anbery',
    src: summitMaster,
    coverLabel: 'Abstrakter Gipfel über einem Frequenzspektrum für Albumproduktion',
    mood: 'Albumproduktion',
    durationHint: '0:11',
  },
]
