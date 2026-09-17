// Base URL for the public TVMaze REST API
const BASE_URL = "https://api.tvmaze.com";

/**
 * Fetches the initial page of shows.
 * TVMaze returns a list of show objects with id, name, image, rating, etc.
 */
export async function getShows() {
  const response = await fetch(`${BASE_URL}/shows?page=0`);

  // fetch does not reject on HTTP error statuses (like 404 or 500),
  // so we check response.ok manually.
  if (!response.ok) {
    throw new Error("Failed to fetch shows from TVMaze");
  }

  return response.json();
}

/**
 * Searches for shows matching a user query string.
 * TVMaze search endpoint returns an array of [{ score, show: { ... } }].
 * We map over the array to extract just the `show` object for our UI.
 */
export async function searchShows(query) {
  // encodeURIComponent escapes special characters (spaces, ?, &, etc.)
  const encodedQuery = encodeURIComponent(query.trim());
  const response = await fetch(`${BASE_URL}/search/shows?q=${encodedQuery}`);

  if (!response.ok) {
    throw new Error("Failed to search shows");
  }

  const results = await response.json();

  // Extract the show object from each search result wrapper
  return results.map((item) => item.show);
}

/**
 * Fetches full details for a single show by its ID.
 */
export async function getShowById(id) {
  const response = await fetch(`${BASE_URL}/shows/${id}`);

  if (!response.ok) {
    throw new Error("Show not found");
  }

  return response.json();
}