import React from "react"

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:3000"

type Media = {
  id: string
  url?: string
  alt?: string
}

type Author = {
  id: string
  name: string
  bio?: string
}

type Book = {
  id: string
  title: string
  description?: string
  stock?: number
  cover?: Media | string | null
  author?: Author | string | null
}

type SingleResponse<T> = { doc: T }
type ListResponse<T> = { docs: T[] }

async function getAuthor(id: string): Promise<Author | null> {
  const res = await fetch(`${CMS_URL}/api/authors/${id}`, {
    cache: "no-store",
  })

  if (!res.ok) return null

  const data = await res.json()
  return data ?? null     // payload returnerer objektet direkte
}

async function getBooksByAuthor(id: string): Promise<Book[]> {
  const res = await fetch(`${CMS_URL}/api/books?where[author][equals]=${id}&depth=2`,
    { cache: "no-store" }
  )
  const data = (await res.json()) as ListResponse<Book>
  return data.docs ?? []
}

export default async function AuthorPage({ params }: { params: { id: string } }) {
  const author = await getAuthor(params.id)
  const books = await getBooksByAuthor(params.id)

  if (!author) {
    return (
      <main>
        <h1>Forfatter ikke funnet</h1>
        <p>Beklager! Denne forfatteren finnes ikke.</p>
      </main>
    )
  }

  return (
    <main>
        <a href="/" style={{
  display: "inline-block",
  marginBottom: "1rem",
  color: "#60a5fa",
  textDecoration: "none",
  fontWeight: 600
}}>
  ← Tilbake
</a>
      <h1>{author.name}</h1>

      {author.bio && <p className="book-description">{author.bio}</p>}

      <h2 style={{ marginTop: "2rem" }}>Bøker av {author.name}</h2>

      {books.length === 0 ? (
        <p>Ingen bøker funnet for denne forfatteren.</p>
      ) : (
        <ul className="book-grid">
          {books.map((book) => {
            const cover = typeof book.cover === "object" ? (book.cover as Media) : null

            const coverUrl = cover?.url
              ? cover.url.startsWith("http")
                ? cover.url
                : `${CMS_URL}${cover.url}`
              : null

            return (
              <li className="book-card" key={book.id}>
                {coverUrl && (
                  <img className="book-image" src={coverUrl} alt={cover?.alt ?? book.title} />
                )}

                <div className="book-content">
                  <h3 className="book-title">{book.title}</h3>

                  {book.description && (
                    <p className="book-description">{book.description}</p>
                  )}

                  <p
                    className={
                      "book-stock " +
                      (book.stock === 0 ? "out-of-stock" : "in-stock")
                    }
                  >
                    På lager: {book.stock ?? 0}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </main>
  )
}