import { MapPinIcon } from '@heroicons/react/24/outline'
import { defineField, defineType } from 'sanity'

export const officeLocationType = defineType({
  name: 'officeLocation',
  title: 'Office Location',
  type: 'document',
  icon: MapPinIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Office Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g., Zürich - Headquarters, Geneva - Regional Office',
    }),
    defineField({
      name: 'locationType',
      title: 'Location Type',
      type: 'string',
      options: {
        list: [
          { title: 'Headquarters', value: 'headquarters' },
          { title: 'Regional Office', value: 'regional' },
          { title: 'Branch Office', value: 'branch' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Full Address',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description:
        'e.g., Main Office & Consulting Hub, International Business & Partnerships',
    }),
    defineField({
      name: 'googleMapsEmbed',
      title: 'Google Maps Embed URL',
      type: 'url',
      description:
        'Full Google Maps embed URL from Google Maps share/embed feature',
    }),
    defineField({
      name: 'coordinates',
      title: 'Coordinates',
      type: 'object',
      fields: [
        { name: 'lat', type: 'number', title: 'Latitude' },
        { name: 'lng', type: 'number', title: 'Longitude' },
      ],
      description: 'Optional: Exact coordinates for custom map integration',
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
      city: 'city',
      country: 'country',
      isActive: 'isActive',
    },
    prepare({ title, city, country, isActive }) {
      return {
        title: `${title}${!isActive ? ' (Inactive)' : ''}`,
        subtitle: `${city}, ${country}`,
        media: MapPinIcon,
      }
    },
  },
})
