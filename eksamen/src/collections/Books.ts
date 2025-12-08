import type { CollectionConfig } from 'payload'

export const Books: CollectionConfig = {
  slug: 'books',
  labels: {
    singular: 'Bok',
    plural: 'Bøker',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'stock', 'createdAt'],
  },
  access: {
  read: () => true,
},

  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Tittel',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'authors',
      label: 'Forfatter',
      hasMany: false,
      required: false,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beskrivelse / tilstand',
    },
    {
      name: 'stock',
      type: 'number',
      label: 'Antall på lager',
      required: true,
      defaultValue: 1,
      min: 0,
    },
    {
      name: 'genres',
      type: 'relationship',
      relationTo: 'genres',
      hasMany: true,
      label: 'Sjangere',
    },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      label: 'Omslagsbilde',
    },
    {
      name: 'ageGroup',
      type: 'select',
      label: 'Anbefalt aldersgruppe',
      options: [
        { label: 'Barn', value: 'barn' },
        { label: 'Ungdom', value: 'ungdom' },
        { label: 'Voksen', value: 'voksen' },
      ],
      admin: {
        isClearable: true,
      },
    },
  ],
}
