export interface ServiceCategory {
  _id: string
  _type: 'serviceCategory'
  name: string
  slug: string
  description?: string
  icon?: string
  color: string
  order: number
  isActive: boolean
}
