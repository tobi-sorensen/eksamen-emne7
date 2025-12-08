import type { CollectionConfig } from 'payload'

export const Genres: CollectionConfig = {
  slug: 'genres',
  labels: {
    singular: 'Sjanger',
    plural: 'Sjangere',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'createdAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Navn',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Beskrivelse',
    },
  ],
}