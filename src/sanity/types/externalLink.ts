export interface ExternalLink {
  _id: string
  title: string
  linkType: 'booking' | 'support' | 'client-portal' | 'documentation' | 'other'
  url: string
  description?: string
  buttonText: string
  icon: string
  isActive: boolean
  order: number
}
