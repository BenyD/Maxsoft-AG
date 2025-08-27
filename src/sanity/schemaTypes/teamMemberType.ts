import { UsersIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { createImageField } from './shared/imageField'

export const teamMemberType = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    createImageField('photo', 'Profile Photo', true),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn Profile URL',
      type: 'url',
      description:
        'Full LinkedIn profile URL (e.g., https://linkedin.com/in/username)',
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          { title: 'Engineering', value: 'engineering' },
          { title: 'Business Development', value: 'business-development' },
          { title: 'Design', value: 'design' },
          { title: 'Product Strategy', value: 'product-strategy' },
          { title: 'Content Strategy', value: 'content-strategy' },
          { title: 'Leadership', value: 'leadership' },
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description:
        'Order in which this team member appears (lower numbers appear first)',
      validation: (Rule) => Rule.positive().integer(),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Whether this team member should be displayed',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'photo',
    },
  },
})
