"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Author = {
  id: string;
  name: string;
  email: string;
  bio: string;
  nationallity: string;
  birthYear: number;
  books: {
    id: string;
    title: string;
    publishedYear: number | null;
    pages: number | null;
    genre: string | null;
  }[];
};

type Stats = {
  totalBooks: number;
  firstYear: number | null;
  lastYear: number | null;
  averagePages: number | null;
  genres: string[];
  maxPagesBook: any;
  minPagesBook: any;
};

export default function AuthorPage() {
  const params = useParams();
  const id = params.id as string;

  const [author, setAuthor] = useState<Author | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);

  // edit form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [nationallity, setNationallity] = useState("");
  const [birthYear, setBirthYear] = useState("");

  async function loadAuthor() {
    const res = await fetch(`/api/authors/${id}`);
    const data = await res.json();

    setAuthor(data);

    // preload form
    setName(data.name);
    setEmail(data.email);
    setBio(data.bio);
    setNationallity(data.nationallity);
    setBirthYear(String(data.birthYear));
  }

  async function loadStats() {
    const res = await fetch(`/api/authors/${id}/stats`);
    const data = await res.json();
    setStats(data);
  }

  async function updateAuthor() {
    await fetch(`/api/authors/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name,
        email,
        bio,
        nationallity,
        birthYear: Number(birthYear)
      })
    });

    loadAuthor();
    alert("Autor actualizado");
  }

  useEffect(() => {
    loadAuthor();
    loadStats();
  }, []);

  if (!author) return <p className="p-6">Cargando...</p>;

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">{author.name}</h1>

      {/* === INFO DEL AUTOR === */}
      <div className="border p-4 rounded">
        <p><strong>Email:</strong> {author.email}</p>
        <p><strong>País:</strong> {author.nationallity}</p>
        <p><strong>Nacimiento:</strong> {author.birthYear}</p>
        <p><strong>Bio:</strong> {author.bio}</p>
      </div>

      {/* === ESTADÍSTICAS === */}
      {stats && (
        <div className="border p-4 rounded bg-gray-100">
          <h2 className="text-xl font-semibold mb-2">Estadísticas del autor</h2>

          <p><strong>Total libros:</strong> {stats.totalBooks}</p>
          <p><strong>Primer libro:</strong> {stats.firstYear ?? "N/A"}</p>
          <p><strong>Último libro:</strong> {stats.lastYear ?? "N/A"}</p>
          <p><strong>Promedio páginas:</strong> {stats.averagePages ?? "N/A"}</p>

          <p><strong>Géneros:</strong> {stats.genres.join(", ")}</p>

          <div className="mt-3">
            <p><strong>Libro más largo:</strong> {stats.maxPagesBook?.title ?? "N/A"}</p>
            <p><strong>Libro más corto:</strong> {stats.minPagesBook?.title ?? "N/A"}</p>
          </div>
        </div>
      )}

      {/* === EDITAR AUTOR === */}
      <div className="border p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">Editar Autor</h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            className="border p-2"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="border p-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="border p-2"
            placeholder="Nacionalidad"
            value={nationallity}
            onChange={(e) => setNationallity(e.target.value)}
          />

          <input
            className="border p-2"
            placeholder="Año nacimiento"
            type="number"
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
          />

          <textarea
            className="border p-2 col-span-2"
            placeholder="Biografía"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <button
          onClick={updateAuthor}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Guardar cambios
        </button>
      </div>

      {/* === LISTA DE LIBROS === */}
      <div>
        <h2 className="text-2xl font-bold mb-2">
          Libros de {author.name}
        </h2>

        <a
          href={`/books/create?authorId=${author.id}`}
          className="mb-3 inline-block bg-green-600 text-white px-4 py-2 rounded"
        >
          Agregar nuevo libro
        </a>

        <div className="space-y-4 mt-4">
          {author.books.map((book) => (
            <div key={book.id} className="border p-4 rounded">
              <h3 className="font-semibold text-lg">{book.title}</h3>
              <p>Género: {book.genre ?? "N/A"}</p>
              <p>Año: {book.publishedYear ?? "N/A"}</p>
              <p>Páginas: {book.pages ?? "N/A"}</p>

              <a
                href={`/books/${book.id}`}
                className="mt-2 inline-block bg-blue-700 text-white px-3 py-1 rounded"
              >
                Editar libro
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
