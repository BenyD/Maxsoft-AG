import { LinkIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'externalLink',
  title: 'External Link',
  type: 'document',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          { title: 'Booking', value: 'booking' },
          { title: 'Contact', value: 'contact' },
          { title: 'Social', value: 'social' },
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
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Globe Alt', value: 'GlobeAltIcon' },
          { title: 'Calendar', value: 'CalendarIcon' },
          { title: 'Document', value: 'DocumentIcon' },
          { title: 'User', value: 'UserIcon' },
          { title: 'Map Pin', value: 'MapPinIcon' },
          { title: 'Phone', value: 'PhoneIcon' },
          { title: 'Envelope', value: 'EnvelopeIcon' },
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
      title: 'Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'embedContent',
      title: 'Embed Content',
      type: 'boolean',
      description:
        'If checked, the content will be embedded directly on the page instead of redirecting to the external link.',
      initialValue: false,
    }),
    defineField({
      name: 'embedHeight',
      title: 'Embed Height',
      type: 'string',
      description:
        'Height for the embedded content (e.g., "600px", "100vh", "50rem")',
      initialValue: '600px',
      hidden: ({ document }) => !document?.embedContent,
    }),
    defineField({
      name: 'embedTitle',
      title: 'Embed Title',
      type: 'string',
      description: 'Optional title to display above the embedded content',
      hidden: ({ document }) => !document?.embedContent,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      linkType: 'linkType',
      isActive: 'isActive',
      embedContent: 'embedContent',
    },
    prepare({ title, linkType, isActive, embedContent }) {
      const status = isActive ? 'Active' : 'Inactive'
      const embedStatus = embedContent ? ' (Embedded)' : ' (External)'
      return {
        title: title,
        subtitle: `${linkType} - ${status}${embedStatus}`,
      }
    },
  },
})
