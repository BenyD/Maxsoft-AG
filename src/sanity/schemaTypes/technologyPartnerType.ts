import { CogIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { createImageField } from './shared/imageField'

export const technologyPartnerType = defineType({
  name: 'technologyPartner',
  title: 'Technology Partner',
  type: 'document',
  icon: CogIcon,
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
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'partnershipType',
      title: 'Partnership Type',
      type: 'string',
      options: {
        list: [
          { title: 'Cloud Services', value: 'cloud-services' },
          { title: 'Software Solutions', value: 'software-solutions' },
          { title: 'Infrastructure', value: 'infrastructure' },
          { title: 'Security', value: 'security' },
          { title: 'Data & Analytics', value: 'data-analytics' },
          { title: 'AI & Machine Learning', value: 'ai-ml' },
          { title: 'DevOps Tools', value: 'devops-tools' },
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
      subtitle: 'partnershipType',
      media: 'logo',
    },
  },
})
