import type { SchemaTypeDefinition } from 'sanity'

import contactType from './schemaTypes/contactType'
import externalLinkType from './schemaTypes/externalLinkType'
import { industryPartnerType } from './schemaTypes/industryPartnerType'
import { jobCategoryType } from './schemaTypes/jobCategoryType'
import { jobListingType } from './schemaTypes/jobListingType'
import { serviceCategoryType } from './schemaTypes/serviceCategoryType'
import { serviceType } from './schemaTypes/serviceType'
import { teamMemberType } from './schemaTypes/teamMemberType'
import { technologyPartnerType } from './schemaTypes/technologyPartnerType'
import { testimonialType } from './schemaTypes/testimonialType'
import { authorType } from './types/author'
import { blockContentType } from './types/block-content'
import { categoryType } from './types/category'
import { postType } from './types/post'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    postType,
    categoryType,
    authorType,
    contactType,
    externalLinkType,
    teamMemberType,
    technologyPartnerType,
    industryPartnerType,
    jobCategoryType,
    jobListingType,
    serviceCategoryType,
    serviceType,
    testimonialType,
  ],
}
