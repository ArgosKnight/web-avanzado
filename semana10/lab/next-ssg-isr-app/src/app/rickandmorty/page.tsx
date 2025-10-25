import Image from "next/image";
import Link from "next/link";

export const revalidate = 86400; // ISR cada 24 horas

async function getCharacters() {
  const res = await fetch("https://rickandmortyapi.com/api/character", {
    next: { revalidate: 86400 }, // Forzar cache (SSG/ISR)
  });

  if (!res.ok) throw new Error("Error al cargar los personajes");

  const data = await res.json();
  return data.results;
}

export default async function RickAndMortyPage() {
  const characters = await getCharacters();

  return (
    <main className="p-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Personajes de Rick and Morty
      </h1>

      {/* Botón de búsqueda */}
      <div className="flex justify-center mb-10">
        <Link href="/rickandmorty/search">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
            Buscar Personaje
          </button>
        </Link>
      </div>

      {/* Lista de personajes */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {characters.map((char: any) => (
          <Link key={char.id} href={`/rickandmorty/${char.id}`}>
            <div className="bg-gray-800 rounded-xl shadow-lg p-4 hover:scale-105 transition">
              <Image
                src={char.image}
                alt={char.name}
                width={200}
                height={200}
                className="rounded-xl mx-auto"
                loading="lazy"
              />
              <h2 className="text-xl font-bold text-center mt-2">{char.name}</h2>
              <p className="text-gray-400 text-center">{char.status}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
