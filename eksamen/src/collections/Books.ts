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
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      label: 'Omslagsbilde',
    },
  ],
}
