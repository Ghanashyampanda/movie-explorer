import Link from "next/link";

// Displayed whenever a show ID is invalid or not found on TVMaze
export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-800 text-4xl shadow-xl">
        🎬❌
      </div>
      <h1 className="mt-6 text-2xl font-bold text-zinc-100 sm:text-3xl">
        Show Not Found
      </h1>
      <p className="mt-2 text-sm text-zinc-400">
        We couldn&apos;t find the TV show you requested. It might have been removed or the ID does not exist in TVMaze.
      </p>

      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 transition hover:bg-amber-400"
      >
        <span>←</span>
        <span>Back to All Shows</span>
      </Link>
    </main>
  );
}