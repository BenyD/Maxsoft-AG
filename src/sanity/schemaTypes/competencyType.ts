import { defineField, defineType } from 'sanity'
import { CubeIcon } from '@sanity/icons'
import { createImageField } from './shared/imageField'

export const competencyType = defineType({
  name: 'competency',
  title: 'Competency',
  type: 'document',
  icon: CubeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow (Subheading)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    createImageField('image', 'Image', true),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this competency should appear (lower numbers appear first)',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Whether this competency should be displayed',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      eyebrow: 'eyebrow',
      media: 'image',
    },
    prepare(selection) {
      const { title, eyebrow, media } = selection
      return {
        title: title,
        subtitle: eyebrow,
        media: media,
      }
    },
  },
})
