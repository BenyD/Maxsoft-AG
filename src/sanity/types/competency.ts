import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export interface Competency {
  _id: string
  title: string
  eyebrow: string
  description: string
  image: SanityImageSource
  order: number
}

export interface CompetencyResponse {
  data: Competency[]
}
