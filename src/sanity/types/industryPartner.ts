export interface IndustryPartner {
  _id: string
  _type: 'industryPartner'
  companyName: string
  logo: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    _type: 'image'
  }
  description: string
  industry: string
  websiteUrl?: string
  order?: number
  isActive: boolean
}
