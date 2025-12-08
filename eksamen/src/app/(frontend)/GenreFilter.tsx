"use client"

import { useRouter, useSearchParams } from "next/navigation"

type Genre = {
  id: string | number
  name: string
}

type GenreFilterProps = {
  genres: Genre[]
  selectedGenre: string | null
}

export default function GenreFilter({ genres, selectedGenre }: GenreFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value
    const params = new URLSearchParams(searchParams.toString())

    if (!value) {
      params.delete("genre")
    } else {
      params.set("genre", value)
    }

    const query = params.toString()
    router.push(query ? `/?${query}` : "/")
  }

  return (
    <div className="filter-wrapper">
      <label htmlFor="genre-filter" className="filter-label">
        Filtrer på sjanger
      </label>
      <select
        id="genre-filter"
        className="filter-select"
        onChange={handleChange}
        defaultValue={selectedGenre ?? ""}
      >
        <option value="">Alle sjangere</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  )
}