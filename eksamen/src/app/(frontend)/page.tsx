import React from "react"

type Media = {
  id: string
  url?: string
  alt?: string
}

type Book = {
  id: string
  title: string
  description?: string
  stock?: number
  cover?: Media | string | null
}

type PayloadListResponse<T> = {
  docs: T[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:3000"

async function getBooks(): Promise<PayloadListResponse<Book>> {
  const res = await fetch(`${CMS_URL}/api/books?depth=2`, {
    cache: "no-store",
  })

  if (!res.ok) {
    console.error("Kunne ikke hente bøker:", await res.text())
    throw new Error("Feil ved API-kall")
  }

  return res.json()
}

export default async function HomePage() {
  let books: Book[] = []

  try {
    const data = await getBooks()
    books = Array.isArray(data?.docs) ? data.docs : []
  } catch (err) {
    console.error(err)
  }

  return (
    <main>
      <h1>Bøker til salgs</h1>

      {books.length === 0 ? (
        <p>Ingen bøker funnet. Legg til noen i adminpanelet.</p>
      ) : (
        <ul className="book-grid">
          {books.map((book) => {

            const cover =
              book.cover && typeof book.cover === "object"
                ? (book.cover as Media)
                : null

            const coverUrl = cover?.url
              ? cover.url.startsWith("http")
                ? cover.url
                : `${CMS_URL}${cover.url}`
              : null

            return (
              <li className="book-card" key={book.id}>
                {coverUrl && (
                  <img
                    className="book-image"
                    src={coverUrl}
                    alt={cover?.alt ?? book.title}
                  />
                )}

                <div className="book-content">
                  <h2 className="book-title">{book.title}</h2>

                  {book.description && (
                    <p className="book-description">{book.description}</p>
                  )}

                  <p
                    className={
                      "book-stock " +
                      (book.stock === 0 ? "out-of-stock" : "in-stock")
                    }
                  >
                    På lager: {book.stock}
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