import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Mediafil',
    plural: 'Mediafiler',
  },
  access: {
    read: () => true,
  },
  upload: {
  
    staticDir: 'media', 
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 400,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt-tekst',
      required: true,
    },
  ],
};

export default Media;
