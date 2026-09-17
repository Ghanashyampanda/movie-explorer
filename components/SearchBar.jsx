// SearchBar component handles user input, form submission, and clearing searches
export default function SearchBar({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onClearSearch,
  isSearching,
}) {
  return (
    <form
      onSubmit={onSearchSubmit}
      className="mx-auto flex w-full max-w-2xl flex-col gap-3 sm:flex-row sm:items-center"
    >
      <div className="relative flex-1">
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
          🔍
        </span>
        <input
          id="search-input"
          type="search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search movies & TV shows (e.g., Breaking Bad, Batman)..."
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 py-3.5 pl-10 pr-4 text-sm text-zinc-100 placeholder-zinc-500 shadow-inner outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          aria-label="Search TV shows"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 sm:flex-initial rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3.5 text-sm font-semibold text-zinc-950 shadow-md transition hover:from-amber-400 hover:to-amber-500 active:scale-95 disabled:opacity-50"
        >
          Search
        </button>

        {/* Show Clear button whenever a query is typed or active search exists */}
        {(searchQuery.length > 0 || isSearching) && (
          <button
            type="button"
            onClick={onClearSearch}
            className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3.5 text-sm font-medium text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
            title="Reset search and show popular titles"
          >
            Clear
          </button>
        )}
      </div>
    </form>
  );
}
