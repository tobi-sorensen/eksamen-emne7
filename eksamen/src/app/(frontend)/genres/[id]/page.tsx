import React from "react"

type Media = {
  id: string | number
  url?: string
  alt?: string
}

type Genre = {
  id: string | number
  name: string
  description?: string
}

type Author = {
  id: string | number
  name: string
  bio?: string
}

type Book = {
  id: string | number
  title: string
  description?: string
  stock?: number
  cover?: Media | string | null
  author?: Author | string | number | null
  genres?: (Genre | string | number)[] | null
}

type PayloadListResponse<T> = {
  docs: T[]
  totalDocs: number
  totalPages: number
  page: number
}

const CMS_URL =
  process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:3000"

function normalizeId(value: any): string | null {
  if (value == null) return null
  if (typeof value === "object") return String(value.id)
  return String(value)
}

async function getGenre(id: string): Promise<Genre | null> {
  const res = await fetch(`${CMS_URL}/api/genres/${id}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    console.error("Kunne ikke hente sjanger:", await res.text())
    return null
  }

  return res.json()
}

async function getBooksByGenre(genreId: string): Promise<Book[]> {
  const res = await fetch(
    `${CMS_URL}/api/books?depth=2&where[genres][in]=${genreId}`,
    { cache: "no-store" },
  )

  if (!res.ok) {
    console.error("Kunne ikke hente bøker for sjanger:", await res.text())
    return []
  }

  const data = (await res.json()) as PayloadListResponse<Book>
  return Array.isArray(data.docs) ? data.docs : []
}

type PageProps = {
  params: { id: string }
}

export default async function GenreDetailPage({ params }: PageProps) {
  const genre = await getGenre(params.id)
  const books = genre ? await getBooksByGenre(String(genre.id)) : []

  if (!genre) {
    return (
      <main className="page">
        <h1 className="page-title">Sjanger ikke funnet</h1>
        <p>Beklager! Denne sjangeren finnes ikke.</p>
        <a href="/genres" className="back-link">
          ← Tilbake til alle sjangere
        </a>
      </main>
    )
  }

  return (
    <main className="page">
      <a href="/genres" className="back-link">
        ← Tilbake til alle sjangere
      </a>

      <h1 className="page-title">{genre.name}</h1>

      {genre.description && (
        <p className="genre-description">{genre.description}</p>
      )}

      {books.length === 0 ? (
        <p>Ingen bøker funnet i denne sjangeren.</p>
      ) : (
        <ul className="book-grid">
          {books.map((book) => {
            const coverObj =
              book.cover && typeof book.cover === "object"
                ? (book.cover as Media)
                : null

            const coverUrl = coverObj?.url
              ? coverObj.url.startsWith("http")
                ? coverObj.url
                : `${CMS_URL}${coverObj.url}`
              : null

            const authorObj =
              book.author && typeof book.author === "object"
                ? (book.author as Author)
                : null

            const genres =
              Array.isArray(book.genres)
                ? book.genres.filter(
                    (g): g is Genre =>
                      typeof g === "object" && g !== null,
                  )
                : []

            return (
              <li className="book-card" key={book.id}>
                {coverUrl && (
                  <img
                    className="book-image"
                    src={coverUrl}
                    alt={coverObj?.alt ?? book.title}
                  />
                )}

                <div className="book-content">
                  <h2 className="book-title">{book.title}</h2>

                  {authorObj && (
                    <p className="book-author">
                      Forfatter:{" "}
                      <a
                        href={`/authors/${normalizeId(book.author)}`}
                        className="book-author-link"
                      >
                        {authorObj.name}
                      </a>
                    </p>
                  )}

                  {genres.length > 0 && (
                    <div className="book-genres">
                      {genres.map((g) => (
                        <a
                          key={g.id}
                          href={`/genres/${g.id}`}
                          className="genre-pill"
                        >
                          {g.name}
                        </a>
                      ))}
                    </div>
                  )}

                  {book.description && (
                    <p className="book-description">
                      {book.description}
                    </p>
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