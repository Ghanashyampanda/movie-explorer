/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";
import { getShowById } from "@/lib/api";

/**
 * Helper function: Strips HTML tags from the API summary.
 * TVMaze returns description text wrapped in tags like <p> and <b>.
 * Stripping HTML tags prevents XSS (Cross-Site Scripting) without
 * needing complex external sanitization libraries.
 */
function cleanSummary(htmlString) {
  if (!htmlString) return "No description available for this show.";
  return htmlString.replace(/<\/?[^>]+(>|$)/g, "").trim();
}

export default async function ShowDetails({ params }) {
  // In Next.js 15+, route params is an asynchronous promise that we await
  const { id } = await params;

  let show;

  try {
    show = await getShowById(id);
  } catch {
    // If the TVMaze API returns 404 or network fails, trigger the Next.js notFound UI
    notFound();
  }

  // Double check if show object exists
  if (!show || !show.name) {
    notFound();
  }

  // Safe variable extraction with fallbacks
  const posterUrl = show.image?.original || show.image?.medium;
  const rating = show.rating?.average ? `${show.rating.average} / 10` : "Not Rated";
  const genres = show.genres && show.genres.length > 0 ? show.genres : ["Genre unavailable"];
  const language = show.language || "Not specified";
  const status = show.status || "Unknown";
  const premiered = show.premiered || "Unknown";
  const summaryText = cleanSummary(show.summary);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb / Back Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-amber-400 transition hover:text-amber-300 hover:underline"
      >
        <span>←</span>
        <span>Back to All Shows</span>
      </Link>

      {/* Main Details Card */}
      <div className="mt-6 overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-2xl backdrop-blur-sm sm:p-8 md:grid md:grid-cols-[300px_1fr] md:gap-8 lg:grid-cols-[340px_1fr]">
        
        {/* Left Column: Poster Image */}
        <div className="flex flex-col items-center">
          <div className="relative aspect-[2/3] w-full max-w-[300px] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-md">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={`${show.name} official poster`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center text-zinc-500">
                <span className="text-5xl">🎬</span>
                <span className="mt-3 text-sm font-medium">No Poster Available</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Information & Metadata */}
        <div className="mt-6 flex flex-col justify-between md:mt-0">
          <div>
            {/* Show Title */}
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {show.name}
            </h1>

            {/* Genre Pills */}
            <div className="mt-3 flex flex-wrap gap-2">
              {genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400"
                >
                  {genre}
                </span>
              ))}
            </div>

            {/* Key Metadata Grid */}
            <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-zinc-800 bg-zinc-950/60 p-4 sm:grid-cols-4">
              <div>
                <span className="block text-xs text-zinc-400">Rating</span>
                <span className="mt-1 block text-sm font-bold text-amber-400">
                  ⭐ {rating}
                </span>
              </div>
              <div>
                <span className="block text-xs text-zinc-400">Language</span>
                <span className="mt-1 block text-sm font-semibold text-zinc-200">
                  {language}
                </span>
              </div>
              <div>
                <span className="block text-xs text-zinc-400">Status</span>
                <span className="mt-1 block text-sm font-semibold text-zinc-200">
                  {status}
                </span>
              </div>
              <div>
                <span className="block text-xs text-zinc-400">Premiered</span>
                <span className="mt-1 block text-sm font-semibold text-zinc-200">
                  {premiered}
                </span>
              </div>
            </div>

            {/* Description / Summary */}
            <div className="mt-6">
              <h2 className="text-base font-bold text-zinc-200">About the Show</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300 sm:text-base">
                {summaryText}
              </p>
            </div>
          </div>

          {/* Action Links (Official Site & Back button) */}
          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-zinc-800/80 pt-6">
            {show.officialSite ? (
              <a
                href={show.officialSite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2.5 text-sm font-semibold text-zinc-950 shadow-md transition hover:from-amber-400 hover:to-amber-500 active:scale-95"
              >
                <span>Visit Official Website</span>
                <span>↗</span>
              </a>
            ) : (
              <span className="text-xs text-zinc-500">
                Official website not available
              </span>
            )}

            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm font-medium text-zinc-400 transition hover:text-white"
            >
              ← Back to Shows
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}