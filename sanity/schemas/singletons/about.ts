import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: 'Manifeste',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Contenu du Manifeste',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }]
    }),
  ],
})