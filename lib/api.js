// Base URL for the public TVMaze REST API
const BASE_URL = "https://api.tvmaze.com";


export async function getShows() {
  const response = await fetch(`${BASE_URL}/shows?page=0`);

  if (!response.ok) {
    throw new Error("Failed to fetch shows from TVMaze");
  }

  return response.json();
}


export async function searchShows(query) {
  const encodedQuery = encodeURIComponent(query.trim());
  const response = await fetch(`${BASE_URL}/search/shows?q=${encodedQuery}`);

  if (!response.ok) {
    throw new Error("Failed to search shows");
  }

  const results = await response.json();

  return results.map((item) => item.show);
}

export async function getShowById(id) {
  const response = await fetch(`${BASE_URL}/shows/${id}`);

  if (!response.ok) {
    throw new Error("Show not found");
  }

  return response.json();
}