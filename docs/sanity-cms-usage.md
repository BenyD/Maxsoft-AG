# Sanity CMS Usage Guide

## Overview
We use Sanity CMS as our headless content management system for managing job listings, blog posts, team members, and other content. This document explains how Sanity is integrated and how to use it effectively.

## Architecture

### Sanity Configuration
Our Sanity setup is configured in `sanity.config.ts`:

```typescript
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schema'

export default defineConfig({
  name: 'maxsoft',
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
})
```

### Environment Variables
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=your_dataset
NEXT_PUBLIC_SANITY_API_VERSION=2025-07-10
```

## Content Types (Schema)

### Job Listings
```typescript
// src/sanity/schemaTypes/jobListing.ts
export default {
  name: 'jobListing',
  title: 'Job Listing',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Job Category',
      type: 'reference',
      to: [{ type: 'jobCategory' }]
    },
    {
      name: 'description',
      title: 'Job Description',
      type: 'blockContent'
    },
    {
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string'
    },
    {
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full-time', value: 'full-time' },
          { title: 'Part-time', value: 'part-time' },
          { title: 'Contract', value: 'contract' }
        ]
      }
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true
    }
  ]
}
```

### Blog Posts
```typescript
// src/sanity/schemaTypes/post.ts
export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }]
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }]
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime'
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent'
    }
  ]
}
```

### Team Members
```typescript
// src/sanity/schemaTypes/teamMember.ts
export default {
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'position',
      title: 'Position',
      type: 'string'
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text'
    },
    {
      name: 'image',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number'
    }
  ]
}
```

## Client Setup

### Sanity Client
```typescript
// src/sanity/client.ts
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from './env'

const isDevelopment = process.env.NODE_ENV === 'development'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: isDevelopment ? false : true,
})
```

### Image URL Builder
```typescript
// src/sanity/lib/image.ts
import imageUrlBuilder from '@sanity/image-url'
import { client } from '../client'

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}
```

## Content Queries

### Basic Queries
```typescript
// src/sanity/queries.ts
import { groq } from 'next-sanity'

// Get all job listings
export const getJobListings = groq`
  *[_type == "jobListing" && isActive == true] {
    _id,
    title,
    category->{ name },
    location,
    employmentType,
    "slug": slug.current
  } | order(publishedAt desc)
`

// Get a specific job listing
export const getJobListing = groq`
  *[_type == "jobListing" && slug.current == $slug][0] {
    _id,
    title,
    category->{ name },
    description,
    requirements,
    location,
    employmentType,
    "slug": slug.current
  }
`

// Get all blog posts
export const getPosts = groq`
  *[_type == "post" && publishedAt < now()] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    "mainImage": mainImage.asset->url,
    "categories": categories[]->title
  }
`
```

### Using Queries in Components
```typescript
// Server Component
import { client } from '@/sanity/client'
import { getJobListings } from '@/sanity/queries'

export default async function JobListings() {
  const jobListings = await client.fetch(getJobListings)
  
  return (
    <div>
      {jobListings.map((job: any) => (
        <div key={job._id}>
          <h2>{job.title}</h2>
          <p>{job.location}</p>
        </div>
      ))}
    </div>
  )
}
```

## Studio Access

### Studio Route
Our Sanity Studio is accessible at `/studio` route:

```typescript
// src/app/studio/[[...tool]]/page.tsx
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

### Studio Features
- **Structure Tool**: Organize and manage content
- **Vision Tool**: Query and explore your content
- **Real-time Collaboration**: Multiple editors can work simultaneously
- **Custom Input Components**: Extend with custom React components

## Content Management

### Creating Content
1. Navigate to `/studio` in your application
2. Use the structure tool to navigate to the desired content type
3. Click "Create" to add new content
4. Fill in the required fields
5. Click "Publish" to make content live

### Editing Content
1. Find the content you want to edit in the studio
2. Click on the content item
3. Make your changes
4. Click "Publish" to update

### Content Validation
Sanity provides built-in validation:
- Required fields
- Field type validation
- Custom validation rules
- Reference integrity

## Image Management

### Uploading Images
```typescript
// In Sanity Studio
{
  name: 'mainImage',
  title: 'Main Image',
  type: 'image',
  options: {
    hotspot: true, // Enable focal point selection
    crop: true,    // Enable cropping
    accept: 'image/*' // Accept only images
  }
}
```

### Using Images in Components
```typescript
import { urlFor } from '@/sanity/lib/image'

export function ImageComponent({ image }: { image: any }) {
  const imageUrl = urlFor(image)
    .width(800)
    .height(600)
    .fit('crop')
    .url()
  
  return <img src={imageUrl} alt="Description" />
}
```

### Image Optimization
```typescript
// Responsive images
const responsiveImage = urlFor(image)
  .width(800)
  .height(600)
  .fit('crop')
  .auto('format')
  .url()

// Multiple sizes for responsive design
const imageSrcSet = urlFor(image)
  .width(400)
  .height(300)
  .fit('crop')
  .url() + ' 400w, ' +
  urlFor(image)
    .width(800)
    .height(600)
    .fit('crop')
    .url() + ' 800w'
```

## Real-time Updates

### Live Preview
```typescript
// src/sanity/live.ts
import { createClient } from '@sanity/preview-kit'

export const previewClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: false,
  perspective: 'published'
})
```

### Using Live Preview
```typescript
'use client'
import { useLiveQuery } from '@sanity/preview-kit'
import { getJobListing } from '@/sanity/queries'

export function LiveJobListing({ data, slug }: { data: any, slug: string }) {
  const [liveData] = useLiveQuery(data, getJobListing, { slug })
  
  return (
    <div>
      <h1>{liveData.title}</h1>
      <p>{liveData.description}</p>
    </div>
  )
}
```

## Type Generation

### Generating Types
```bash
npm run typegen
```

This command:
1. Extracts schema information
2. Generates TypeScript types
3. Updates `sanity-typegen.json`

### Using Generated Types
```typescript
import type { JobListing, Post, TeamMember } from '@/sanity/types'

export function JobListingComponent({ job }: { job: JobListing }) {
  return (
    <div>
      <h2>{job.title}</h2>
      <p>{job.location}</p>
    </div>
  )
}
```

## Content Relationships

### References
```typescript
// One-to-one relationship
{
  name: 'category',
  title: 'Category',
  type: 'reference',
  to: [{ type: 'jobCategory' }]
}

// One-to-many relationship
{
  name: 'categories',
  title: 'Categories',
  type: 'array',
  of: [{ type: 'reference', to: { type: 'category' } }]
}
```

### Cross-references
```typescript
// Query with references
export const getJobWithCategory = groq`
  *[_type == "jobListing" && _id == $id][0] {
    _id,
    title,
    category->{
      _id,
      name,
      description
    },
    requirements
  }
`
```

## Performance Optimization

### CDN Usage
```typescript
const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production
})
```

### Query Optimization
- Use specific field selection
- Limit results with pagination
- Use filters to reduce data transfer
- Cache frequently accessed content

## Security

### API Security
- Sanity handles authentication and authorization
- Content is served through secure APIs
- Studio access can be restricted by IP or authentication

### Content Validation
- Schema-based validation
- Custom validation rules
- Reference integrity checks

## Troubleshooting

### Common Issues

1. **Type Generation Errors**
   - Run `npm run typegen` to regenerate types
   - Check schema syntax
   - Verify environment variables

2. **Image Loading Issues**
   - Check image asset references
   - Verify image uploads completed
   - Check CORS settings

3. **Query Errors**
   - Validate GROQ syntax
   - Check field names match schema
   - Verify reference integrity

### Debugging

1. **Use Vision Tool**
   - Navigate to `/studio/vision`
   - Test queries interactively
   - Check query results

2. **Check Console Logs**
   - Monitor network requests
   - Check for CORS errors
   - Verify API responses

3. **Validate Schema**
   - Check schema syntax
   - Verify field definitions
   - Test content creation

## Best Practices

1. **Schema Design**
   - Keep schemas simple and focused
   - Use descriptive field names
   - Implement proper validation

2. **Content Organization**
   - Use consistent naming conventions
   - Organize content logically
   - Implement proper categorization

3. **Performance**
   - Use CDN in production
   - Optimize image sizes
   - Implement proper caching

4. **Type Safety**
   - Generate types regularly
   - Use TypeScript interfaces
   - Validate data at runtime

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Sanity Studio](https://www.sanity.io/studio)
- [Next.js Integration](https://www.sanity.io/docs/nextjs)
