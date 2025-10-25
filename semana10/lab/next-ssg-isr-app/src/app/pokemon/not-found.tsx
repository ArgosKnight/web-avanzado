export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-8 bg-gray-900 text-white">
      <h2 className="text-4xl font-bold mb-4">❌ Pokémon no encontrado</h2>
      <p className="text-gray-300 mb-6">
        El Pokémon que estás buscando no existe o fue eliminado.
      </p>

      <a
        href="/pokemon"
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all"
      >
        Volver a la lista
      </a>
    </div>
  );
}
