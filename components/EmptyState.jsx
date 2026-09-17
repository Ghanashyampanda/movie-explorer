// EmptyState displays a helpful message when a search returns no matching results
export default function EmptyState({ query, onReset }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <span className="text-5xl">🍿</span>
      <h3 className="mt-4 text-lg font-bold text-zinc-100">
        No shows found
      </h3>
      <p className="mt-1 max-w-sm text-sm text-zinc-400">
        We couldn&apos;t find any TV shows matching &quot;{query}&quot;. Try searching for another title.
      </p>

      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-2.5 text-sm font-medium text-amber-400 transition hover:bg-zinc-800 hover:text-amber-300"
        >
          View All Popular Shows
        </button>
      )}
    </div>
  );
}
