import type { CollectionConfig } from 'payload'

export const Authors: CollectionConfig = {
  slug: 'authors',

  labels: {
    singular: 'Forfatter',
    plural: 'Forfattere',
  },

  access: {
    read: () => true,     
  },

  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'createdAt'],
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'bio',
      type: 'textarea',
    },
  ],
}