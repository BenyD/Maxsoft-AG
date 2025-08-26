export interface ExternalLink {
  _id: string
  title: string
  linkType: 'booking' | 'contact' | 'social' | 'other'
  url: string
  description?: string
  buttonText: string
  icon: string
  isActive: boolean
  order: number
  embedContent: boolean
  embedHeight?: string
  embedTitle?: string
}
