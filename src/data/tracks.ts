import altitudeSession from '@/assets/audio/altitude-session-demo.wav'
import summitMaster from '@/assets/audio/summit-master-demo.wav'
import warmConsole from '@/assets/audio/warm-console-demo.wav'
import type { TrackItem } from '@/types/content'

export const tracks: TrackItem[] = [
  {
    id: 'altitude-session',
    title: 'Höhen-Session',
    artist: 'Nora Vale',
    src: altitudeSession,
    coverLabel: 'Nächtliche Bergsilhouette aus goldenen Audiowellen',
    mood: 'Live-Raum / Soul',
    durationHint: '0:12',
  },
  {
    id: 'warm-console',
    title: 'Warme Konsole',
    artist: 'The East Tapes',
    src: warmConsole,
    coverLabel: 'Analoge Konsole mit warmem Licht und Studioschatten',
    mood: 'Analoge Produktion',
    durationHint: '0:10',
  },
  {
    id: 'summit-master',
    title: 'Gipfel-Master',
    artist: 'Arden Club',
    src: summitMaster,
    coverLabel: 'Abstrakter Gipfel über einem Frequenzspektrum',
    mood: 'Mastering-Durchlauf',
    durationHint: '0:11',
  },
]
