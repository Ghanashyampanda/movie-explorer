/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

// ShowCard displays key information for an individual TV show in a cinema-style poster format
export default function ShowCard({ show }) {
  // Safe fallbacks for missing data
  const posterUrl = show.image?.medium || show.image?.original;
  const rating = show.rating?.average ?? "N/A";
  const genres = show.genres && show.genres.length > 0
    ? show.genres.slice(0, 2).join(" • ")
    : "Genre N/A";
  const language = show.language || "N/A";
  const year = show.premiered ? show.premiered.slice(0, 4) : "";

  return (
    <Link
      href={`/shows/${show.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/60 shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/10 focus:outline-none focus:ring-2 focus:ring-amber-500"
    >
      {/* Poster Image Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-950">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`${show.name} poster`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center text-zinc-500">
            <span className="text-4xl">🎬</span>
            <span className="mt-2 text-xs font-medium">No Poster Available</span>
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-md bg-zinc-950/85 px-2 py-1 text-xs font-semibold text-amber-400 backdrop-blur-sm border border-zinc-800">
          <span>⭐</span>
          <span>{rating}</span>
        </div>

        {/* Year Badge if available */}
        {year && (
          <div className="absolute bottom-2.5 left-2.5 rounded-md bg-zinc-950/80 px-2 py-0.5 text-xs text-zinc-300 backdrop-blur-sm">
            {year}
          </div>
        )}
      </div>

      {/* Card Info Section */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h2 className="line-clamp-1 text-base font-bold text-zinc-100 group-hover:text-amber-400 transition-colors">
            {show.name}
          </h2>
          <p className="mt-1 line-clamp-1 text-xs text-zinc-400">
            {genres}
          </p>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-zinc-800/60 pt-2.5 text-xs text-zinc-400">
          <span className="font-medium text-zinc-300">{language}</span>
          <span className="text-amber-500 group-hover:translate-x-0.5 transition-transform">
            Details →
          </span>
        </div>
      </div>
    </Link>
  );
}