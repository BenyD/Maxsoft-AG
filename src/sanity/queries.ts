import { defineQuery } from 'next-sanity'
import { sanityFetch } from './live'

const TOTAL_POSTS_QUERY = defineQuery(/* groq */ `count(*[
  _type == "post"
  && defined(slug.current)
  && (isFeatured != true || defined($category))
  && select(defined($category) => $category in categories[]->slug.current, true)
])`)

export async function getPostsCount(category?: string) {
  return await sanityFetch({
    query: TOTAL_POSTS_QUERY,
    params: { category: category ?? null },
  })
}

const POSTS_QUERY = defineQuery(/* groq */ `*[
  _type == "post"
  && defined(slug.current)
  && (isFeatured != true || defined($category))
  && select(defined($category) => $category in categories[]->slug.current, true)
]|order(publishedAt desc)[$startIndex...$endIndex]{
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  author->{
    name,
    image,
  },
}`)

export async function getPosts(
  startIndex: number,
  endIndex: number,
  category?: string,
) {
  return await sanityFetch({
    query: POSTS_QUERY,
    params: {
      startIndex,
      endIndex,
      category: category ?? null,
    },
  })
}

const FEATURED_POSTS_QUERY = defineQuery(/* groq */ `*[
  _type == "post"
  && isFeatured == true
  && defined(slug.current)
]|order(publishedAt desc)[0...$quantity]{
  title,
  "slug": slug.current,
  publishedAt,
  mainImage,
  excerpt,
  author->{
    name,
    image,
  },
}`)

export async function getFeaturedPosts(quantity: number) {
  return await sanityFetch({
    query: FEATURED_POSTS_QUERY,
    params: { quantity },
  })
}

const FEED_POSTS_QUERY = defineQuery(/* groq */ `*[
  _type == "post"
  && defined(slug.current)
]|order(isFeatured, publishedAt desc){
  title,
  "slug": slug.current,
  publishedAt,
  mainImage,
  excerpt,
  author->{
    name,
  },
}`)

export async function getPostsForFeed() {
  return await sanityFetch({
    query: FEED_POSTS_QUERY,
  })
}

const POST_QUERY = defineQuery(/* groq */ `*[
  _type == "post"
  && slug.current == $slug
][0]{
  publishedAt,
  title,
  mainImage,
  excerpt,
  body,
  author->{
    name,
    image,
  },
  categories[]->{
    title,
    "slug": slug.current,
  }
}
`)

export async function getPost(slug: string) {
  return await sanityFetch({
    query: POST_QUERY,
    params: { slug },
  })
}

const CATEGORIES_QUERY = defineQuery(/* groq */ `*[
  _type == "category"
  && count(*[_type == "post" && defined(slug.current) && ^._id in categories[]._ref]) > 0
]|order(title asc){
  title,
  "slug": slug.current,
}`)

export async function getCategories() {
  return await sanityFetch({
    query: CATEGORIES_QUERY,
  })
}

const CONTACT_INFO_QUERY = defineQuery(/* groq */ `*[
  _type == "contact"
  && isActive == true
]|order(order asc){
  title,
  contactType,
  icon,
  address,
  phone,
  email,
  description
}`)

export async function getContactInfo() {
  return await sanityFetch({
    query: CONTACT_INFO_QUERY,
  })
}

const OFFICE_LOCATIONS_QUERY = defineQuery(/* groq */ `*[
  _type == "officeLocation"
  && isActive == true
]|order(order asc){
  _id,
  title,
  locationType,
  address,
  city,
  country,
  description,
  googleMapsEmbed,
  coordinates
}`)

export async function getOfficeLocations() {
  return await sanityFetch({
    query: OFFICE_LOCATIONS_QUERY,
  })
}

const EXTERNAL_LINKS_QUERY = defineQuery(/* groq */ `*[
  _type == "externalLink"
  && isActive == true
]|order(order asc){
  _id,
  title,
  linkType,
  url,
  description,
  buttonText,
  icon
}`)

export async function getExternalLinks() {
  return await sanityFetch({
    query: EXTERNAL_LINKS_QUERY,
  })
}

const TEAM_MEMBERS_QUERY = defineQuery(/* groq */ `*[
  _type == "teamMember"
  && isActive == true
]|order(order asc, name asc){
  _id,
  name,
  title,
  photo,
  linkedinUrl,
  department,
  order
}`)

export async function getTeamMembers() {
  return await sanityFetch({
    query: TEAM_MEMBERS_QUERY,
  })
}

const TECHNOLOGY_PARTNERS_QUERY = defineQuery(/* groq */ `*[
  _type == "technologyPartner"
  && isActive == true
]|order(order asc, companyName asc){
  _id,
  companyName,
  logo,
  description,
  partnershipType,
  websiteUrl,
  order
}`)

export async function getTechnologyPartners() {
  return await sanityFetch({
    query: TECHNOLOGY_PARTNERS_QUERY,
  })
}

const INDUSTRY_PARTNERS_QUERY = defineQuery(/* groq */ `*[
  _type == "industryPartner"
  && isActive == true
]|order(order asc, companyName asc){
  _id,
  companyName,
  logo,
  description,
  industry,
  websiteUrl,
  order
}`)

export async function getIndustryPartners() {
  return await sanityFetch({
    query: INDUSTRY_PARTNERS_QUERY,
  })
}

const JOB_CATEGORIES_QUERY = defineQuery(/* groq */ `*[
  _type == "jobCategory"
  && isActive == true
]|order(order asc, name asc){
  _id,
  name,
  description,
  color,
  order
}`)

export async function getJobCategories() {
  return await sanityFetch({
    query: JOB_CATEGORIES_QUERY,
  })
}

const JOB_LISTINGS_QUERY = defineQuery(/* groq */ `*[
  _type == "jobListing"
  && isActive == true
]|order(order asc, title asc){
  _id,
  title,
  "slug": slug.current,
  category->{
    _id,
    name,
    color
  },
  location,
  employmentType,
  salary,
  shortDescription,
  order
}`)

export async function getJobListings() {
  return await sanityFetch({
    query: JOB_LISTINGS_QUERY,
  })
}

const JOB_LISTING_QUERY = defineQuery(/* groq */ `*[
  _type == "jobListing"
  && slug.current == $slug
  && isActive == true
][0]{
  _id,
  title,
  "slug": slug.current,
  category->{
    _id,
    name,
    color
  },
  location,
  employmentType,
  salary,
  shortDescription,
  requirements,
  responsibilities,
  benefits,
  aboutCompany,
  howToApply
}`)

export async function getJobListing(slug: string) {
  return await sanityFetch({
    query: JOB_LISTING_QUERY,
    params: { slug },
  })
}

// Service Categories Queries
const SERVICE_CATEGORIES_QUERY = defineQuery(/* groq */ `*[
  _type == "serviceCategory"
  && isActive == true
]|order(order asc, name asc){
  _id,
  name,
  "slug": slug.current,
  description,
  icon,
  color,
  order
}`)

export async function getServiceCategories() {
  return await sanityFetch({
    query: SERVICE_CATEGORIES_QUERY,
  })
}

// Services Queries
const SERVICES_QUERY = defineQuery(/* groq */ `*[
  _type == "service"
  && isActive == true
]|order(order asc, title asc){
  _id,
  title,
  "slug": slug.current,
  category->{
    _id,
    name,
    "slug": slug.current,
    color,
    icon
  },
  shortDescription,
  duration,
  deliveryMethod,
  pricing,
  isFeatured,
  order
}`)

export async function getServices() {
  return await sanityFetch({
    query: SERVICES_QUERY,
  })
}

const SERVICE_QUERY = defineQuery(/* groq */ `*[
  _type == "service"
  && slug.current == $slug
  && isActive == true
][0]{
  _id,
  title,
  "slug": slug.current,
  category->{
    _id,
    name,
    "slug": slug.current,
    color,
    icon
  },
  shortDescription,
  fullDescription,
  featuredImage,
  benefits,
  duration,
  deliveryMethod,
  prerequisites,
  targetAudience,
  pricing,
  isFeatured,
  seo
}`)

export async function getService(slug: string) {
  return await sanityFetch({
    query: SERVICE_QUERY,
    params: { slug },
  })
}

const SERVICES_BY_CATEGORY_QUERY = defineQuery(/* groq */ `*[
  _type == "service"
  && category->slug.current == $categorySlug
  && isActive == true
]|order(order asc, title asc){
  _id,
  title,
  "slug": slug.current,
  category->{
    _id,
    name,
    "slug": slug.current,
    color,
    icon
  },
  shortDescription,
  duration,
  deliveryMethod,
  pricing,
  isFeatured,
  order
}`)

export async function getServicesByCategory(categorySlug: string) {
  return await sanityFetch({
    query: SERVICES_BY_CATEGORY_QUERY,
    params: { categorySlug },
  })
}

// Testimonials Queries
const TESTIMONIALS_QUERY = defineQuery(/* groq */ `*[
  _type == "testimonial"
  && isActive == true
]|order(order asc, dateAdded desc){
  _id,
  quote,
  author{
    name,
    title,
    company,
    photo
  },
  rating,
  isFeatured,
  order,
  dateAdded
}`)

export async function getTestimonials() {
  return await sanityFetch({
    query: TESTIMONIALS_QUERY,
  })
}

// Job Applications Queries
const JOB_APPLICATIONS_QUERY = defineQuery(/* groq */ `*[
  _type == "jobApplication"
]|order(submittedAt desc){
  _id,
  applicationId,
  jobListing->{
    _id,
    title,
    slug,
    category->{
      _id,
      name,
      color
    },
    location,
    employmentType
  },
  personalInfo,
  status,
  priority,
  rating,
  submittedAt,
  lastUpdated,
  assignedTo
}`)

const JOB_APPLICATION_QUERY = defineQuery(/* groq */ `*[
  _type == "jobApplication"
  && _id == $applicationId
][0]{
  _id,
  applicationId,
  jobListing->{
    _id,
    title,
    slug,
    category->{
      _id,
      name,
      color
    },
    location,
    employmentType,
    shortDescription,
    requirements,
    responsibilities
  },
  personalInfo,
  coverLetter,
  experience,
  skills,
  expectedSalary,
  availabilityDate,
  workAuthorization,
  resume,
  additionalDocuments,
  status,
  priority,
  rating,
  internalNotes,
  interviews,
  communications,
  source,
  gdprConsent,
  submittedAt,
  lastUpdated,
  assignedTo
}`)

const JOB_APPLICATIONS_BY_STATUS_QUERY = defineQuery(/* groq */ `*[
  _type == "jobApplication"
  && status == $status
]|order(submittedAt desc){
  _id,
  applicationId,
  jobListing->{
    _id,
    title,
    slug,
    category->{
      _id,
      name,
      color
    },
    location,
    employmentType
  },
  personalInfo,
  status,
  priority,
  rating,
  submittedAt,
  lastUpdated,
  assignedTo
}`)

const JOB_APPLICATIONS_BY_JOB_QUERY = defineQuery(/* groq */ `*[
  _type == "jobApplication"
  && jobListing._ref == $jobId
]|order(submittedAt desc){
  _id,
  applicationId,
  personalInfo,
  status,
  priority,
  rating,
  submittedAt,
  lastUpdated,
  assignedTo
}`)

export async function getJobApplications() {
  return await sanityFetch({
    query: JOB_APPLICATIONS_QUERY,
  })
}

export async function getJobApplication(applicationId: string) {
  return await sanityFetch({
    query: JOB_APPLICATION_QUERY,
    params: { applicationId },
  })
}

export async function getJobApplicationsByStatus(status: string) {
  return await sanityFetch({
    query: JOB_APPLICATIONS_BY_STATUS_QUERY,
    params: { status },
  })
}

export async function getJobApplicationsByJob(jobId: string) {
  return await sanityFetch({
    query: JOB_APPLICATIONS_BY_JOB_QUERY,
    params: { jobId },
  })
}
