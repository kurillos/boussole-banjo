import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'partenaire',
  title: 'Partenaires',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom du partenaire',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description courte',
      type: 'text',
      rows: 3,
      description: 'Quelques mots sur ce partenaire (métier, lien avec la culture country...)',
      validation: Rule => Rule.required().max(200)
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Sellier / Maroquinerie', value: 'sellier' },
          { title: 'Tatoueur', value: 'tatoueur' },
          { title: 'Luthier / Musique', value: 'musique' },
          { title: 'Mode & Chapellerie', value: 'mode' },
          { title: 'Bar & Restauration', value: 'bar' },
          { title: 'Autre', value: 'autre' },
        ],
        layout: 'radio'
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'website',
      title: 'Site web',
      type: 'url',
      description: 'Lien vers le site ou les réseaux du partenaire (optionnel)'
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: 'Les partenaires sont triés par ce chiffre (1 = en premier)',
    }),
  ],
  orderings: [
    {
      title: 'Ordre d\'affichage',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'logo'
    }
  }
})
