import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortVersion',
      title: 'Short Version',
      type: 'text',
      description: 'A brief summary of the about content',
      validation: (Rule) => Rule.required().max(500),
    }),
    defineField({
      name: 'longVersion',
      title: 'Long Version',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility.',
              options: {
                isHighlighted: true,
              },
            },
          ],
          options: {hotspot: true},
        },
      ],
      description: 'The full, detailed about content',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
})
