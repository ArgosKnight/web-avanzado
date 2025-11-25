"use client";

import { useEffect, useState } from "react";

type Author = {
  id: string;
  name: string;
  email: string;
  bio: string;
  nationallity: string;
  birthYear: number;
};

type AuthorStats = {
  totalBooks: number;
  firstYear: number | null;
  lastYear: number | null;
  averagePages: number | null;
  genres: string[];
};

export default function DashboardPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(false);

  // Formulario
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [nationallity, setNationallity] = useState("");
  const [birthYear, setBirthYear] = useState("");

  async function loadAuthors() {
    try {
      const res = await fetch("/api/authors");
      const data = await res.json();
      setAuthors(data);
    } catch (e) {
      console.error("Error cargando autores", e);
    }
  }

  // Crear autor
  async function createAuthor() {
    setLoading(true);

    try {
      await fetch("/api/authors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          bio,
          nationallity,
          birthYear: parseInt(birthYear),
        }),
      });

      setName("");
      setEmail("");
      setBio("");
      setNationallity("");
      setBirthYear("");

      await loadAuthors();
    } catch (error) {
      console.error("Error creando autor", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAuthors();
  }, []);

  return (
    <main className="p-10 bg-[#0D0D0D] min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-10">Dashboard</h1>

      {/* Card Crear autor */}
      <section className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.2)] max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Crear autor</h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
            className="p-3 rounded-lg bg-white/5 border border-white/20 focus:ring focus:ring-blue-500/20"
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="p-3 rounded-lg bg-white/5 border border-white/20 focus:ring focus:ring-blue-500/20"
          />
        </div>

        <input
          value={nationallity}
          onChange={(e) => setNationallity(e.target.value)}
          placeholder="Nacionalidad"
          className="p-3 rounded-lg bg-white/5 border border-white/20 focus:ring focus:ring-blue-500/20 mt-4 w-full"
        />

        <input
          value={birthYear}
          onChange={(e) => setBirthYear(e.target.value)}
          placeholder="Año de nacimiento"
          type="number"
          className="p-3 rounded-lg bg-white/5 border border-white/20 focus:ring focus:ring-blue-500/20 mt-4 w-full"
        />

        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Biografía"
          className="p-3 rounded-lg mt-4 w-full bg-white/5 border border-white/20 focus:ring focus:ring-blue-500/20"
        />

        <button
          onClick={createAuthor}
          disabled={loading}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition disabled:bg-blue-900/40 disabled:text-white/40"
        >
          {loading ? "Creando..." : "Crear Autor"}
        </button>
      </section>

      {/* Lista de autores */}
      <section className="mt-14 bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.2)] max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Autores registrados</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/20">
              <th className="py-2 opacity-70">Nombre</th>
              <th className="py-2 opacity-70">Email</th>
              <th className="py-2 opacity-70">Año Nac.</th>
              <th className="py-2 opacity-70">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {authors.map((a) => (
              <tr
                key={a.id}
                className="border-b border-white/10 hover:bg-white/5 transition"
              >
                <td className="py-4">{a.name}</td>
                <td>{a.email}</td>
                <td>{a.birthYear}</td>

                <td className="flex gap-3 py-2">
                  <button className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-sm">
                    Editar
                  </button>

                  <button className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm">
                    Eliminar
                  </button>

                  <a
                    href={`/authors/${a.id}`}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                  >
                    Ver libros
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
