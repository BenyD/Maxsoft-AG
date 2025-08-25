import { CommentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().max(500),
      description: 'The testimonial quote (max 500 characters)',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'title',
          title: 'Job Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'company',
          title: 'Company',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'photo',
          title: 'Photo',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
          ],
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
      initialValue: 5,
      description: 'Rating out of 5 stars',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Testimonial',
      type: 'boolean',
      initialValue: false,
      description: 'Featured testimonials appear prominently on the homepage',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers appear first',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'dateAdded',
      title: 'Date Added',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'author.name',
      subtitle: 'author.company',
      media: 'author.photo',
      quote: 'quote',
    },
    prepare(selection) {
      const { title, subtitle, quote } = selection
      return {
        title: title,
        subtitle: `${subtitle} - "${quote?.substring(0, 60)}${quote?.length > 60 ? '...' : ''}"`,
        media: selection.media,
      }
    },
  },
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Date Added',
      name: 'dateAddedDesc',
      by: [{ field: 'dateAdded', direction: 'desc' }],
    },
    {
      title: 'Author Name',
      name: 'authorNameAsc',
      by: [{ field: 'author.name', direction: 'asc' }],
    },
  ],
})
