import { TagIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const jobCategoryType = defineType({
  name: 'jobCategory',
  title: 'Job Category',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Category Description',
      type: 'text',
      rows: 2,
      description: 'Brief description of this job category (optional)',
    }),
    defineField({
      name: 'color',
      title: 'Category Color',
      type: 'string',
      description: 'CSS color for category styling (optional)',
      options: {
        list: [
          { title: 'Default Gray', value: 'bg-gray-50' },
          { title: 'Light Blue', value: 'bg-blue-50' },
          { title: 'Light Green', value: 'bg-green-50' },
          { title: 'Light Purple', value: 'bg-purple-50' },
          { title: 'Light Orange', value: 'bg-orange-50' },
        ],
      },
      initialValue: 'bg-gray-50',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description:
        'Order in which this category appears (lower numbers appear first)',
      validation: (Rule) => Rule.positive().integer(),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Whether this category should be displayed',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
    },
  },
})
