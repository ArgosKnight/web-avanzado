
interface MovieCardProps {
  movie: {
    Title: string;
    Year: string;
    Poster: string;
    imdbID: string;
  };
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-md hover:scale-105 transition">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
        alt={movie.Title}
        className="rounded-md w-full h-80 object-cover"
      />
      <h2 className="text-lg font-semibold mt-2">{movie.Title}</h2>
      <p className="text-sm text-gray-400">{movie.Year}</p>
    </div>
  );
}
