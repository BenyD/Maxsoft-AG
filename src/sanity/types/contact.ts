export interface ContactInfo {
  _id: string
  title: string
  contactType: 'main-office' | 'regional-office' | 'phone' | 'email' | 'other'
  icon: string
  address?: string
  phone?: string
  email?: string
  description?: string
  isActive: boolean
  order: number
}
