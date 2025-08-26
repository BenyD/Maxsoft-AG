export interface Contact {
  _id: string
  _type: 'contact'
  companyName: string
  officeTitle?: string
  address?: {
    streetLine1?: string
    streetLine2?: string
    doorNumber?: string
    postalCode?: string
    city?: string
    canton?: string
    country: string
  }
  phone?: string
  email?: string
  googleMapsEmbed?: string
  googleMapsDirections?: string
  openingHours?: Array<{
    day: string
    hours: string
    isOpen: boolean
  }>
  description?: string
  isActive: boolean
  order: number
}
