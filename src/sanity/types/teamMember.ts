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
    hotspot?: {
      x: number
      y: number
      height: number
      width: number
    }
    crop?: {
      top: number
      bottom: number
      left: number
      right: number
    }
  }
  linkedinUrl?: string
  department?: string
  order?: number
  isActive: boolean
}
