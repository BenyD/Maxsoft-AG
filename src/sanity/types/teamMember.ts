export interface TeamMember {
  _id: string
  _type: 'teamMember'
  name: string
  title: string
  photo: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    _type: 'image'
  }
  linkedinUrl?: string
  department?: string
  order?: number
  isActive: boolean
}
