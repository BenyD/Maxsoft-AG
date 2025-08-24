import type { PortableTextBlock } from '@portabletext/types'
import type { ServiceCategory } from './serviceCategory'

export interface Service {
  _id: string
  _type: 'service'
  title: string
  slug: {
    current: string
  }
  category: {
    _ref: string
    _type: 'reference'
  }
  shortDescription: string
  fullDescription?: PortableTextBlock[]
  featuredImage?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
  benefits?: string[]
  duration?: string
  deliveryMethod?: 'on-site' | 'remote' | 'hybrid' | 'online'
  prerequisites?: string
  targetAudience?: string
  pricing?: string
  isFeatured: boolean
  order: number
  isActive: boolean
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

export interface ServiceExpanded extends Omit<Service, 'category'> {
  category: ServiceCategory
}
