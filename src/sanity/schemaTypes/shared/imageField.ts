import { defineField } from 'sanity'

export const createImageField = (
  name: string,
  title: string,
  required = false,
) =>
  defineField({
    name,
    title,
    type: 'image',
    options: {
      hotspot: true,
      accept: 'image/*',
    },
    fields: [
      defineField({
        name: 'alt',
        type: 'string',
        title: 'Alternative text',
        description: 'Important for SEO and accessibility.',
        validation: required ? (Rule) => Rule.required() : undefined,
      }),
      defineField({
        name: 'caption',
        type: 'string',
        title: 'Caption',
      }),
    ],
    validation: required ? (Rule) => Rule.required() : undefined,
  })
