import { MapPinIcon } from '@heroicons/react/24/outline'
import { defineField, defineType } from 'sanity'

export const contactType = defineType({
  name: 'contact',
  title: 'Contact Information',
  type: 'document',
  icon: MapPinIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contactType',
      title: 'Contact Type',
      type: 'string',
      options: {
        list: [
          { title: 'Main Office', value: 'main-office' },
          { title: 'Regional Office', value: 'regional-office' },
          { title: 'Phone', value: 'phone' },
          { title: 'Email', value: 'email' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Map Pin', value: 'MapPinIcon' },
          { title: 'Phone', value: 'PhoneIcon' },
          { title: 'Envelope', value: 'EnvelopeIcon' },
          { title: 'Globe', value: 'GlobeIcon' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
      hidden: ({ document }) =>
        !['main-office', 'regional-office'].includes(
          document?.contactType as string,
        ),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      hidden: ({ document }) => document?.contactType !== 'phone',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      hidden: ({ document }) => document?.contactType !== 'email',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Additional details like office hours, department, etc.',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Whether this contact method is currently active',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description:
        'Order in which to display this contact method (lower numbers first)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      contactType: 'contactType',
      isActive: 'isActive',
    },
    prepare({ title, contactType, isActive }) {
      return {
        title: `${title}${!isActive ? ' (Inactive)' : ''}`,
        subtitle: contactType,
        media: MapPinIcon,
      }
    },
  },
  orderings: [
    {
      name: 'orderAsc',
      title: 'Order (Low to High)',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      name: 'orderDesc',
      title: 'Order (High to Low)',
      by: [{ field: 'order', direction: 'desc' }],
    },
  ],
})
