export interface JobListing {
  _id: string
  _type: 'jobListing'
  title: string
  slug: {
    current: string
    _type: 'slug'
  }
  category: {
    _ref: string
    _type: 'reference'
  }
  location: string
  employmentType: string
  salary?: string
  shortDescription: string
  requirements: string[]
  responsibilities: string[]
  benefits?: string[]
  aboutCompany?: string
  howToApply?: string
  order?: number
  isActive: boolean
  isFeatured: boolean
}

// For the expanded job listing data returned by queries
export interface JobListingExpanded {
  _id: string
  title: string
  slug: string
  category: {
    _id: string
    name: string
    color: string
  }
  location: string
  employmentType: string
  salary?: string
  shortDescription: string
  order?: number
}
