import { HomeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { createImageField } from './shared/imageField'

export const industryPartnerType = defineType({
  name: 'industryPartner',
  title: 'Industry Partner',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    createImageField('logo', 'Company Logo', true),
    defineField({
      name: 'description',
      title: 'Partnership Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      options: {
        list: [
          { title: 'Finance & Banking', value: 'finance-banking' },
          { title: 'Healthcare', value: 'healthcare' },
          { title: 'Manufacturing', value: 'manufacturing' },
          { title: 'Retail & E-commerce', value: 'retail-ecommerce' },
          { title: 'Technology', value: 'technology' },
          { title: 'Education', value: 'education' },
          { title: 'Government', value: 'government' },
          { title: 'Energy & Utilities', value: 'energy-utilities' },
          {
            title: 'Transportation & Logistics',
            value: 'transportation-logistics',
          },
          { title: 'Media & Entertainment', value: 'media-entertainment' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Company Website',
      type: 'url',
      description: 'Official company website URL',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description:
        'Order in which this partner appears (lower numbers appear first)',
      validation: (Rule) => Rule.positive().integer(),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Whether this partner should be displayed',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'companyName',
      subtitle: 'industry',
      media: 'logo',
    },
  },
})
