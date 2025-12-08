import React from 'react'
import './(frontend)/styles.css'


export const metadata = {
  description: 'BookDragons nettbutikk',
  title: 'BookDragons',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
          {children}
      </body>
    </html>
  )
}
