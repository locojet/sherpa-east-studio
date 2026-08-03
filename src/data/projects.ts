import type { ProjectItem } from '@/types/content'

export const projects: ProjectItem[] = [
  {
    id: 'nocturnal-peak',
    artist: 'Nora Vale',
    title: 'Nächtlicher Gipfel',
    year: '2026',
    work: 'Aufnahme / Mixing',
    description:
      'Nahe Vocals, bearbeitete Gitarren und ein Mix, der wie ein lebendiger Raum atmet.',
    imageAlt: 'Editoriales Porträt einer Künstlerin vor gedämpften Studioleuchten',
    accent: '#d7b56d',
    trackId: 'altitude-session',
  },
  {
    id: 'basement-summit',
    artist: 'Arden Club',
    title: 'Kellergipfel',
    year: '2025',
    work: 'Produktion / Mastering',
    description:
      'Ein Underground-Track mit dichten Bässen, trockener Percussion und kontrolliertem Analog-Glanz.',
    imageAlt: 'Dunkles analoges Equipment im warmen Licht einer goldenen Lampe',
    accent: '#8c7a56',
    trackId: 'summit-master',
  },
  {
    id: 'east-live-room',
    artist: 'The East Tapes',
    title: 'East Live Raum',
    year: '2025',
    work: 'Live Session',
    description: 'Live-Aufnahme mit reduzierten Arrangements und einer filmischen Club-Ästhetik.',
    imageAlt: 'Musiker in einem Aufnahmeraum mit Gegenlicht',
    accent: '#eee0c2',
    trackId: 'warm-console',
  },
]
