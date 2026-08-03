export interface NavItem {
  label: string
  hash: string
}

export interface ServiceItem {
  id: string
  title: string
  description: string
  detail: string
  icon: string
}

export interface TrackItem {
  id: string
  title: string
  artist: string
  src: string
  coverLabel: string
  mood: string
  durationHint: string
}

export interface ProjectItem {
  id: string
  artist: string
  title: string
  year: string
  work: string
  description: string
  imageAlt: string
  accent: string
  trackId?: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  imageAlt: string
  social?: string
}

export interface SocialLink {
  label: string
  href: string
}

export interface ContactInfo {
  address: string
  email: string
  phone: string
  whatsapp: string
  schedule: string
  mapLabel: string
  socials: SocialLink[]
}

export interface BookingForm {
  name: string
  email: string
  phone: string
  service: string
  date: string
  budget: string
  message: string
  privacy: boolean
}

export type BookingErrors = Partial<Record<keyof BookingForm, string>>
