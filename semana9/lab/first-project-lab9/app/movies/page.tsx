import MovieList from "./components/movie-list";

export const dynamic = "force-dynamic";

export default async function MoviesPage() {
  const apiKey = "e3727c02"; 
  const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=marvel`);
  const data = await res.json();

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold mb-6 text-center">🎬 Galería de Películas (SSR)</h1>
      <MovieList movies={data.Search || []} />
      <div className="text-center mt-10">
        <a
          href="/movies/search"
          className="text-blue-400 underline hover:text-blue-600 transition"
        >
          Ir al buscador interactivo →
        </a>
      </div>
    </main>
  );
}
