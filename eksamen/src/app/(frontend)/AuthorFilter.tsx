"use client"

import React from "react"

export default function AuthorFilter({
  authors,
  selectedAuthor,
}: {
  authors: { id: number | string; name: string }[]
  selectedAuthor: string | null
}) {
  return (
    <div className="filter-container">
      <label htmlFor="author-filter" className="filter-label">
        Filtrer etter forfatter:
      </label>

      <select
        id="author-filter"
        className="filter-select"
        onChange={(e) => {
          const value = e.target.value
          window.location.href = value ? `/?author=${value}` : "/"
        }}
        defaultValue={selectedAuthor ?? ""}
      >
        <option value="">Alle forfattere</option>
        {authors.map((author) => (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        ))}
      </select>
    </div>
  )
}