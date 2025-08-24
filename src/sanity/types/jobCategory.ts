export interface JobCategory {
  _id: string
  _type: 'jobCategory'
  name: string
  description?: string
  color: string
  order?: number
  isActive: boolean
}
