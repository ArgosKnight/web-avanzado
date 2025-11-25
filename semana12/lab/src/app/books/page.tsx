"use client";

import { useEffect, useState } from "react";

type Book = {
  id: string;
  title: string;
  genre: string | null;
  publishedYear: number | null;
  pages: number | null;
  authorId: string;
  author: {
    id: string;
    name: string;
  };
};

type BooksResponse = {
  data: Book[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
};

type Author = {
  id: string;
  name: string;
};

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [pagination, setPagination] =
    useState<BooksResponse["pagination"]>();

  // filtros
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);

  const limit = 10;

  // loading state
  const [loading, setLoading] = useState(false);

  async function loadAuthors() {
    const res = await fetch("/api/authors");
    const data = await res.json();
    setAuthors(data);
  }

  async function loadBooks() {
    setLoading(true);

    const params = new URLSearchParams({
      search,
      genre,
      authorName: "", // no lo usamos aquí
      authorId,
      sortBy,
      order,
      page: String(page),
      limit: String(limit),
    });

    const res = await fetch(`/api/books/search?${params.toString()}`);
    const data: BooksResponse = await res.json();

    setBooks(data.data);
    setPagination(data.pagination);
    setLoading(false);
  }

  useEffect(() => {
    loadAuthors();
    loadBooks();
  }, []);

  useEffect(() => {
    loadBooks();
  }, [search, genre, authorId, sortBy, order, page]);

  // eliminar libro
  async function deleteBook(id: string) {
    if (!confirm("¿Eliminar este libro?")) return;

    await fetch(`/api/books/${id}`, { method: "DELETE" });

    loadBooks();
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Buscar Libros</h1>

      {/* ==== Crear libro ==== */}
      <div className="border p-4 rounded mb-6">
        <h2 className="font-semibold text-lg mb-2">Crear libro</h2>

        {/* Podríamos crear un formulario luego */}
        <a
          href="/books/create"
          className="bg-blue-600 text-white px-4 py-2 rounded inline-block"
        >
          Crear nuevo libro
        </a>
      </div>

      {/* ==== Filtros ==== */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Filtro título */}
        <input
          className="border p-2 rounded w-full"
          placeholder="Buscar por título..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Filtro género */}
        <select
          className="border p-2"
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="">Todos los géneros</option>
          <option value="Novela">Novela</option>
          <option value="Drama">Drama</option>
          <option value="Sci-fi">Sci-fi</option>
          <option value="Fantasía">Fantasía</option>
        </select>

        {/* Filtro autor */}
        <select
          className="border p-2"
          onChange={(e) => setAuthorId(e.target.value)}
        >
          <option value="">Todos los autores</option>
          {authors.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>

        {/* Ordenamiento */}
        <select
          className="border p-2"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="createdAt">Fecha creación</option>
          <option value="title">Título</option>
          <option value="publishedYear">Año publicación</option>
        </select>

        <select
          className="border p-2"
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="desc">Descendente</option>
          <option value="asc">Ascendente</option>
        </select>
      </div>

      {/* === Loading === */}
      {loading && <p className="text-gray-500">Cargando...</p>}

      {/* ==== Lista de libros ==== */}
      <div className="space-y-4">
        {books.map((b) => (
          <div key={b.id} className="border p-4 rounded flex justify-between">
            <div>
              <h2 className="font-semibold text-lg">{b.title}</h2>
              <p>Género: {b.genre ?? "N/A"}</p>
              <p>Año: {b.publishedYear ?? "N/A"}</p>
              <p>Páginas: {b.pages ?? "N/A"}</p>
              <p>Autor: {b.author.name}</p>
            </div>

            <div className="flex gap-2">
              <a
                href={`/books/${b.id}`}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Editar
              </a>
              <button
                onClick={() => deleteBook(b.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ==== Paginación ==== */}
      {pagination && (
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={!pagination.hasPrev}
            className="px-4 py-2 border rounded disabled:opacity-30"
          >
            Anterior
          </button>

          <span>
            Página {pagination.page} / {pagination.totalPages}
          </span>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={!pagination.hasNext}
            className="px-4 py-2 border rounded disabled:opacity-30"
          >
            Siguiente
          </button>
        </div>
      )}
    </main>
  );
}
