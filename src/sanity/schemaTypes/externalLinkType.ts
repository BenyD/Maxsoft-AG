import { GlobeAltIcon } from '@heroicons/react/24/outline'
import { defineField, defineType } from 'sanity'

export const externalLinkType = defineType({
  name: 'externalLink',
  title: 'External Link',
  type: 'document',
  icon: GlobeAltIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Link Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g., Microsoft 365 Booking, Support Portal',
    }),
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          { title: 'Booking Form', value: 'booking' },
          { title: 'Support Portal', value: 'support' },
          { title: 'Client Portal', value: 'client-portal' },
          { title: 'Documentation', value: 'documentation' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
      description: 'Full URL including https://',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Brief description of what this link provides',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g., Book Your Consultation, Access Portal',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Globe', value: 'GlobeAltIcon' },
          { title: 'Calendar', value: 'CalendarIcon' },
          { title: 'Document', value: 'DocumentIcon' },
          { title: 'User', value: 'UserIcon' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      linkType: 'linkType',
      url: 'url',
      isActive: 'isActive',
    },
    prepare({ title, linkType, url, isActive }) {
      return {
        title: `${title}${!isActive ? ' (Inactive)' : ''}`,
        subtitle: `${linkType} - ${url}`,
        media: GlobeAltIcon,
      }
    },
  },
})
