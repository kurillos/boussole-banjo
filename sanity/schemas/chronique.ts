import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'chronique',
  title: 'Chroniques',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de la Chronique (Album ou Artiste)',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'coverImage',
      title: 'Image de Couverture',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'rating',
      title: 'Note (en Stetsons 🤠)',
      type: 'number',
      description: 'Note de 1 à 5',
      validation: Rule => Rule.required().min(1).max(5)
    }),
    defineField({
      name: 'spotifyUrl',
      title: 'Lien Spotify',
      type: 'url',
      description: 'Lien direct vers le titre ou l\'album'
    }),
    defineField({
      name: 'direction',
      title: 'Style (Direction Cardinale)',
      type: 'string',
      options: {
        list: [
          { title: 'Nord (Classics / Légendes)', value: 'nord' },
          { title: 'Sud (Southern Rock / Red Dirt)', value: 'sud' },
          { title: 'Ouest (Outlaw / Alt-Country)', value: 'ouest' },
          { title: 'Est (Nashville Pop / Mainstream)', value: 'est' },
        ],
        layout: 'radio'
      }
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'body',
      title: 'Contenu de la chronique',
      type: 'array',
      of: [{ type: 'block' }]
    }),
  ],
})