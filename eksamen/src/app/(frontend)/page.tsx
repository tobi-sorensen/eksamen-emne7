import React from "react"
import AuthorFilter from "./AuthorFilter"
import GenreFilter from "./GenreFilter"

type Media = {
  id: string | number
  url?: string
  alt?: string
}

type Author = {
  id: string | number
  name: string
  bio?: string
}

type Genre = {
  id: string | number
  name: string
  description?: string
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
}

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:3000"

function normalizeId(value: unknown): string | null {
  if (value == null) return null

  if (typeof value === "object" && "id" in (value as any)) {
    return String((value as any).id)
  }

  return String(value)
}

async function getBooks(): Promise<Book[]> {
  const res = await fetch(`${CMS_URL}/api/books?depth=2`, {
    cache: "no-store",
  })

  if (!res.ok) {
    console.error("Kunne ikke hente bøker:", await res.text())
    throw new Error("Feil ved API-kall")
  }

  const data = (await res.json()) as PayloadListResponse<Book>
  return data.docs ?? []
}

async function getAuthors(): Promise<Author[]> {
  const res = await fetch(`${CMS_URL}/api/authors?depth=0`, {
    cache: "no-store",
  })

  if (!res.ok) return []

  const data = (await res.json()) as PayloadListResponse<Author>
  return data.docs ?? []
}

async function getGenres(): Promise<Genre[]> {
  const res = await fetch(`${CMS_URL}/api/genres?depth=0`, {
    cache: "no-store",
  })

  if (!res.ok) return []

  const data = (await res.json()) as PayloadListResponse<Genre>
  return data.docs ?? []
}

type PageProps = {
  searchParams?: {
    author?: string
    genre?: string
  }
}

export default async function HomePage({ searchParams }: PageProps) {
  const selectedAuthor = searchParams?.author ?? null
  const selectedGenre = searchParams?.genre ?? null

  const [authors, genres, books] = await Promise.all([
    getAuthors(),
    getGenres(),
    getBooks(),
  ])

  const filteredBooks = books.filter((book) => {
    const matchesAuthor = selectedAuthor
      ? normalizeId(book.author) === String(selectedAuthor)
      : true

    const matchesGenre = selectedGenre
      ? Array.isArray(book.genres) &&
        book.genres.some((g) => normalizeId(g) === String(selectedGenre))
      : true

    return matchesAuthor && matchesGenre
  })

  return (
    <main>
      <div className="filters-row">
        <AuthorFilter authors={authors} selectedAuthor={selectedAuthor} />
        <GenreFilter genres={genres} selectedGenre={selectedGenre} />
      </div>

      <h1>Bøker til salgs</h1>

      {books.length === 0 ? (
        <p>Ingen bøker funnet. Legg inn noen i adminpanelet.</p>
      ) : (
        <ul className="book-grid">
          {filteredBooks.map((book) => {
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

            const genresArray = Array.isArray(book.genres)
              ? (book.genres as (Genre | string | number)[])
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

                  {genresArray.length > 0 && (
                    <div className="book-genres">
                      <span className="book-genres-label">Sjanger:</span>
                      <div className="book-genres-list">
                        {genresArray.map((g, index) => {
                          const genreObj =
                            typeof g === "object" ? (g as Genre) : null
                          const genreId = normalizeId(g)
                          if (!genreId) return null

                          return (
                            <a
                              key={`${book.id}-${genreId}-${index}`}
                              href={`/genres/${genreId}`}
                              className="genre-pill"
                            >
                              {genreObj?.name ?? `Sjanger ${genreId}`}
                            </a>
                          )
                        })}
                      </div>
                    </div>
                  )}

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