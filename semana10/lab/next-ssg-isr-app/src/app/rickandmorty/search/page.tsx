"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);

  async function searchCharacters(name: string) {
    if (!name) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${name}`
      );
      if (!res.ok) throw new Error("Personaje no encontrado");

      const data = await res.json();
      setResults(data.results);
    } catch (error) {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // cuando el usuario escriba, busca después de 500ms
    const delay = setTimeout(() => {
      searchCharacters(query);
    }, 500);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <main className="p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Buscar Personaje (CSR)
      </h1>

      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Escribe un nombre (Rick, Morty...)"
          className="w-full p-3 rounded-lg text-gray-900"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading && <p className="text-center">Cargando...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {results.map((character) => (
          <div
            key={character.id}
            className="bg-white text-gray-800 p-4 rounded-xl shadow-lg"
          >
            <Image
              src={character.image}
              alt={character.name}
              width={150}
              height={150}
              className="mx-auto rounded-full"
            />
            <h2 className="text-xl font-bold mt-3 text-center capitalize">
              {character.name}
            </h2>
            <p className="text-center text-sm text-gray-600">
              {character.status} - {character.species} - {character.gender}
            </p>
          </div>
        ))}
      </div>

      {!loading && query && results.length === 0 && (
        <p className="text-center mt-8 text-gray-400">
          No se encontraron personajes con ese nombre.
        </p>
      )}
    </main>
  );
}
