import MovieCard from "./movie-card";

interface MovieListProps {
  movies: any[];
}

export default function MovieList({ movies }: MovieListProps) {
  if (movies.length === 0) {
    return <p className="text-center text-gray-400">No se encontraron películas.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}
