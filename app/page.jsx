"use client";

import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import ShowGrid from "@/components/ShowGrid";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";
import EmptyState from "@/components/EmptyState";
import { getShows, searchShows } from "@/lib/api";

export default function Home() {
  // State 1: List of shows currently displayed
  const [shows, setShows] = useState([]);

  // State 2: Text inside the search input box
  const [searchQuery, setSearchQuery] = useState("");

  // State 3: Active search term that was submitted
  const [activeSearch, setActiveSearch] = useState("");

  // State 4: Loading indicator (defaults to true on initial page load)
  const [loading, setLoading] = useState(true);

  // State 5: Error message string if an API call fails
  const [error, setError] = useState("");

  // useEffect runs once when the component mounts on the client
  useEffect(() => {
    let isMounted = true;

    async function loadInitialShows() {
      try {
        setError("");
        const data = await getShows();
        if (isMounted) {
          setShows(data);
        }
      } catch {
        if (isMounted) {
          setError("Unable to load TV shows. Please check your internet connection.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadInitialShows();

    // Cleanup function in case component unmounts before fetch completes
    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Helper to reload popular shows (used by Clear Search and Retry)
   */
  async function reloadPopularShows() {
    try {
      setLoading(true);
      setError("");
      setSearchQuery("");
      setActiveSearch("");

      const data = await getShows();
      setShows(data);
    } catch {
      setError("Unable to reload shows. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  /**
   * Handles search form submission.
   * Only triggered when the user clicks 'Search' or presses Enter.
   */
  async function handleSearchSubmit(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    const trimmedQuery = searchQuery.trim();

    // If search box is submitted empty, reload default shows
    if (!trimmedQuery) {
      reloadPopularShows();
      return;
    }

    try {
      setLoading(true);
      setError("");
      setActiveSearch(trimmedQuery);

      const results = await searchShows(trimmedQuery);
      setShows(results);
    } catch {
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  /**
   * Clears the current search and resets to popular shows.
   */
  function handleClearSearch() {
    reloadPopularShows();
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Header Section */}
      <section className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400">
          <span>✨ Explore TV Shows & Movies</span>
        </div>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
          Discover Your Next Favorite Show
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-400 sm:text-base">
          Browse popular titles, search across thousands of series, and check ratings, genres, and summaries.
        </p>

        {/* Search Bar Component */}
        <div className="mt-8">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearchSubmit={handleSearchSubmit}
            onClearSearch={handleClearSearch}
            isSearching={Boolean(activeSearch)}
          />
        </div>
      </section>

      {/* Section Title */}
      <div className="mb-6 flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-100">
            {activeSearch ? `Search Results for "${activeSearch}"` : "Popular Shows"}
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            {!loading && !error && `${shows.length} shows found`}
          </p>
        </div>

        {activeSearch && (
          <button
            onClick={handleClearSearch}
            className="text-xs font-medium text-amber-400 hover:text-amber-300 hover:underline"
          >
            ← Back to All Shows
          </button>
        )}
      </div>

      {/* Content Area: Handling Loading, Error, Empty, and Results */}
      {loading && (
        <Loading
          message={activeSearch ? `Searching for "${activeSearch}"...` : "Loading shows from TVMaze..."}
        />
      )}

      {!loading && error && (
        <ErrorMessage
          message={error}
          onRetry={activeSearch ? () => handleSearchSubmit() : reloadPopularShows}
        />
      )}

      {!loading && !error && shows.length === 0 && (
        <EmptyState
          query={activeSearch}
          onReset={reloadPopularShows}
        />
      )}

      {!loading && !error && shows.length > 0 && (
        <ShowGrid shows={shows} />
      )}
    </main>
  );
}