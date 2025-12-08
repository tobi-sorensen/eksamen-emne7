import type { CollectionConfig } from 'payload'

export const Orders: CollectionConfig = {
  slug: 'orders',
  labels: {
    singular: 'Bestilling',
    plural: 'Bestillinger',
  },
  admin: {
    useAsTitle: 'customerName',
    defaultColumns: ['customerName', 'status', 'createdAt'],
  },
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'customerName',
      type: 'text',
      label: 'Kundens navn',
      required: true,
    },
    {
      name: 'customerEmail',
      type: 'email',
      label: 'E-post',
      required: true,
    },
    {
      name: 'customerPhone',
      type: 'text',
      label: 'Telefon',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      defaultValue: 'new',
      options: [
        { label: 'Ny', value: 'new' },
        { label: 'Plukket', value: 'picked' },
        { label: 'Hentet', value: 'completed' },
        { label: 'Avlyst', value: 'cancelled' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      label: 'Bestilte bøker',
      required: true,
      fields: [
        {
          name: 'book',
          type: 'relationship',
          relationTo: 'books',
          label: 'Bok',
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          label: 'Antall',
          required: true,
          min: 1,
          defaultValue: 1,
        },
      ],
    },
  ],
}