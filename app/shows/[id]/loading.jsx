// Next.js automatically displays this loading UI while the server is fetching the show details
export default function ShowLoading() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute h-full w-full animate-spin rounded-full border-4 border-zinc-800 border-t-amber-500"></div>
          <span className="text-2xl">🎬</span>
        </div>
        <h2 className="mt-6 text-lg font-semibold text-zinc-200">
          Loading Show Details...
        </h2>
        <p className="mt-1 text-xs text-zinc-500">
          Fetching metadata from TVMaze
        </p>
      </div>
    </main>
  );
}