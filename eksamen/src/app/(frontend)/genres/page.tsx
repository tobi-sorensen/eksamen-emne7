import React from "react"

type Genre = {
  id: string | number
  name: string
  description?: string
}

type PayloadListResponse<T> = {
  docs: T[]
}

const CMS_URL =
  process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:3000"

async function getGenres(): Promise<Genre[]> {
  const res = await fetch(`${CMS_URL}/api/genres`, {
    cache: "no-store",
  })

  if (!res.ok) {
    console.error("Kunne ikke hente sjangere:", await res.text())
    return []
  }

  const data = (await res.json()) as PayloadListResponse<Genre>
  return Array.isArray(data.docs) ? data.docs : []
}

export default async function GenresPage() {
  const genres = await getGenres()

  return (
    <main className="page">
      <a href="/" className="back-link">
        ← Tilbake til forsiden
      </a>

      <h1 className="page-title">Sjangere</h1>

      {genres.length === 0 ? (
        <p>Ingen sjangere funnet. Legg inn noen i adminpanelet.</p>
      ) : (
        <ul className="genre-grid">
          {genres.map((genre) => (
            <li key={genre.id} className="genre-card">
              <h2 className="genre-title">{genre.name}</h2>

              {genre.description && (
                <p className="genre-description">
                  {genre.description}
                </p>
              )}

              <a
                href={`/genres/${genre.id}`}
                className="genre-link-button"
              >
                Se bøker i denne sjangeren →
              </a>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}