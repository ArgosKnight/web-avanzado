"use client";

import { useState, useEffect } from "react";
import MovieList from "../components/movie-list";
import MovieModal from "../components/movie-model";

export default function SearchMovies() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null); 
  const apiKey = "f1def80d";


  useEffect(() => {
    if (query.length > 2) {
      const fetchMovies = async () => {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
        const data = await res.json();
        setResults(data.Search || []);
      };
      fetchMovies();
    } else {
      setResults([]); 
    }
  }, [query]);

  return (
    <main className="p-10">
      <h1 className="w-full p-3 border border-gray-700 rounded-md bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
>🔎 Búsqueda de Películas (CSR)</h1>

      <input
        type="text"
        placeholder="Buscar película o serie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 border border-gray-700 rounded-md text-black"
      />
          
      {/* Galería */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {results.map((movie: any) => (
          <div
            key={movie.imdbID}
            onClick={() => setSelectedMovie(movie.imdbID)}
            className="bg-gray-900 p-4 rounded-lg shadow-md hover:scale-105 transition cursor-pointer"
          >
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
              alt={movie.Title}
              className="rounded-md w-full h-80 object-cover"
            />
            <h2 className="text-lg font-semibold mt-2 text-white">{movie.Title}</h2>
            <p className="text-sm text-gray-400">{movie.Year}</p>
          </div>
        ))}
      </div>

      {/* Modal de Detalle */}
      {selectedMovie && (
        <MovieModal imdbID={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </main>
  );
}
