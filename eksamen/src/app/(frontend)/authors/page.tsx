import React from "react"

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:3000"

type Author = {
  id: string
  name: string
  bio?: string
}

type ResponseList<T> = { docs: T[] }

async function getAuthors(): Promise<Author[]> {
  const res = await fetch(`${CMS_URL}/api/authors?depth=0`, { cache: "no-store" })
  const data = (await res.json()) as ResponseList<Author>
  return data.docs ?? []
}

export default async function AuthorsPage() {
  const authors = await getAuthors()

  return (
    <main>
      <h1>Forfattere</h1>

      {authors.length === 0 && <p>Ingen forfattere registrert.</p>}

      <ul className="book-grid">
        {authors.map((author) => (
          <li className="book-card" key={author.id}>
            <div className="book-content">
              <h2 className="book-title">{author.name}</h2>
              {author.bio && <p className="book-description">{author.bio}</p>}

              <a className="book-author" href={`/authors/${author.id}`}>
                Se bøker av denne forfatteren →
              </a>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}