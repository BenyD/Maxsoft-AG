export interface Testimonial {
  _id: string
  _type: 'testimonial'
  quote: string
  author: {
    name: string
    title: string
    company: string
    photo?: {
      asset: {
        _ref: string
        _type: 'reference'
      }
      alt?: string
    }
  }
  rating: number
  isFeatured: boolean
  order: number
  isActive: boolean
  dateAdded: string
}
