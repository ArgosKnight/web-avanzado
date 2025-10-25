import Image from "next/image";
import { notFound } from "next/navigation";

export const revalidate = 864000; // 10 días en segundos

async function getCharacter(id: string) {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);

  if (!res.ok) notFound();

  return res.json();
}

export default async function CharacterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; 
  const character = await getCharacter(id);

  return (
    <main className="p-8 bg-gray-900 text-white min-h-screen text-center">
      <h1 className="text-3xl font-bold mb-4">{character.name}</h1>
      <img
        src={character.image}
        alt={character.name}
        className="mx-auto rounded-2xl border border-gray-700"
      />
      <p className="mt-4">Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
    </main>
  );
}

