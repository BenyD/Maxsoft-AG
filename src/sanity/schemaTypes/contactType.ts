import { EnvelopeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact Information',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'officeTitle',
      title: 'Office Title/Description',
      type: 'string',
      description: 'e.g., "Main Office", "Headquarters", "Swiss Branch"',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        defineField({
          name: 'streetLine1',
          title: 'Street Line 1',
          type: 'string',
          description: 'Street name and number',
        }),
        defineField({
          name: 'streetLine2',
          title: 'Street Line 2',
          type: 'string',
          description: 'Additional address information (optional)',
        }),
        defineField({
          name: 'doorNumber',
          title: 'Door/Apartment Number',
          type: 'string',
          description: 'Door number, apartment, suite, etc.',
        }),
        defineField({
          name: 'postalCode',
          title: 'Postal Code',
          type: 'string',
          description: 'Swiss postal code (e.g., 8001)',
        }),
        defineField({
          name: 'city',
          title: 'City',
          type: 'string',
          description: 'City name (e.g., Zürich)',
        }),
        defineField({
          name: 'canton',
          title: 'Canton',
          type: 'string',
          description: 'Swiss canton (e.g., Zürich, Geneva, Bern)',
        }),
        defineField({
          name: 'country',
          title: 'Country',
          type: 'string',
          default: 'Switzerland',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'Include country code (e.g., +41 44 123 45 67)',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'email',
    }),
    defineField({
      name: 'googleMapsEmbed',
      title: 'Google Maps Embed URL',
      type: 'url',
      description: 'Full Google Maps embed URL for the location',
    }),
    defineField({
      name: 'googleMapsDirections',
      title: 'Google Maps Directions URL',
      type: 'url',
      description: 'URL for getting directions to this location',
    }),
    defineField({
      name: 'openingHours',
      title: 'Opening Hours',
      type: 'array',
      of: [
        defineType({
          type: 'object',
          name: 'openingHour',
          fields: [
            defineField({
              name: 'day',
              title: 'Day',
              type: 'string',
              options: {
                list: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday',
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'hours',
              title: 'Hours',
              type: 'string',
              description: 'e.g., "9:00 AM - 6:00 PM" or "Closed"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'isOpen',
              title: 'Is Open',
              type: 'boolean',
              description: 'Check if this day is open for business',
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              day: 'day',
              hours: 'hours',
              isOpen: 'isOpen',
            },
            prepare({ day, hours, isOpen }) {
              return {
                title: day,
                subtitle: isOpen ? hours : 'Closed',
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Additional information about the office or location',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Whether this contact information is currently active',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this contact should be displayed',
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      company: 'companyName',
      office: 'officeTitle',
      city: 'address.city',
      canton: 'address.canton',
    },
    prepare({ company, office, city, canton }) {
      return {
        title: company,
        subtitle: office
          ? `${office} - ${city}, ${canton}`
          : `${city}, ${canton}`,
      }
    },
  },
})
