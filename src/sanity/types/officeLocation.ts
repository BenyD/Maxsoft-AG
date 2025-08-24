export interface OfficeLocation {
  _id: string
  title: string
  locationType: 'headquarters' | 'regional' | 'branch'
  address: string
  city: string
  country: string
  description?: string
  googleMapsEmbed?: string
  coordinates?: {
    lat: number
    lng: number
  }
  isActive: boolean
  order: number
}
