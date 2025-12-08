import React from "react"
import AuthorFilter from "./AuthorFilter"

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

type PayloadListResponse<T> = {
  docs: T[]
}

function normalizeId(value: any): string | null {
  if (value == null) return null

  // Hvis object → ta id-feltet
  if (typeof value === "object") {
    return String(value.id)
  }

  // Hvis tall eller string → returner som string
  return String(value)
}

const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:3000"

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

async function getAuthors() {
  const res = await fetch(`${CMS_URL}/api/authors?depth=0`, {
    cache: "no-store",
  })

  if (!res.ok) return []

  const data = await res.json()
  return data.docs ?? []
}

export default async function HomePage({ searchParams }: any) {
  const selectedAuthor = searchParams?.author ?? null

  const authors = await getAuthors()
  const books = await getBooks()

  const filteredBooks = selectedAuthor
  ? books.filter((b) => normalizeId(b.author) === String(selectedAuthor))
  : books

  return (
    <main>
      <AuthorFilter authors={authors} selectedAuthor={selectedAuthor} />
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
                      <a href={`/authors/${normalizeId(book.author)}`} className="book-author-link">
                        {authorObj.name}
                         </a>
                    </p>
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