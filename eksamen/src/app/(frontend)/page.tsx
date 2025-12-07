import type { Book } from '../../payload-types'; 
type BooksResponse = {
  docs: Book[];
  totalDocs: number;
};

async function getBooks(): Promise<Book[]> {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/books?depth=0`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    console.error('Kunne ikke hente bøker', await res.text());
    return [];
  }

  const data = (await res.json()) as BooksResponse;
  return data.docs;
}

export default async function HomePage() {
  const books = await getBooks();

  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Bøker til salgs</h1>

      {books.length === 0 ? (
        <p>Ingen bøker funnet. Legg inn noen i admin-panelet først.</p>
      ) : (
        <ul style={{ display: 'grid', gap: '1rem' }}>
          {books.map((book) => (
            <li
              key={book.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '0.5rem',
                padding: '1rem',
              }}
            >
              <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                {book.title}
              </h2>

              {book.description && (
                <p style={{ marginBottom: '0.5rem' }}>{book.description}</p>
              )}

              <p>
                <strong>På lager:</strong>{' '}
                {typeof book.stock === 'number' ? book.stock : 'Ukjent'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}