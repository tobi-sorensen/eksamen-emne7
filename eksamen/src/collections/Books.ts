import { CollectionConfig } from 'payload';

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
  ],
};

export default Books;
