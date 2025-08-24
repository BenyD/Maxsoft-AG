export interface TechnologyPartner {
  _id: string
  _type: 'technologyPartner'
  companyName: string
  logo: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    _type: 'image'
  }
  description: string
  partnershipType: string
  websiteUrl?: string
  order?: number
  isActive: boolean
}
