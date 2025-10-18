"use client";

import { useEffect, useState } from "react";

interface MovieModalProps {
  imdbID: string;
  onClose: () => void;
}

export default function MovieModal({ imdbID, onClose }: MovieModalProps) {
  const [movie, setMovie] = useState<any>(null);
  const apiKey = "f1def80d";

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`);
      const data = await res.json();
      setMovie(data);
    };
    fetchMovie();
  }, [imdbID]);

  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg max-w-lg w-full relative text-white">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-300 hover:text-white text-xl"
        >
          ✕
        </button>
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full h-96 object-cover rounded-md mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{movie.Title}</h2>
        <p className="text-gray-400 mb-2">Año: {movie.Year}</p>
        <p className="text-gray-300 mb-2">{movie.Plot}</p>
        <p className="text-sm text-gray-500">Actores: {movie.Actors}</p>
      </div>
    </div>
  );
}
