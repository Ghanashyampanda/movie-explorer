# 🎬 Movie Explorer

A responsive web application built with **Next.js (App Router)**, **React**, and **Tailwind CSS** that allows users to explore popular TV shows, search by title, and view detailed information using the free public **TVMaze API**.

This project was developed as a technical interview assignment for a fresher frontend / full-stack role, focusing on clean code, proper component separation, predictable state management, and error handling.

---

## 🌟 Features

- **Discover Shows:** Fetches and displays popular TV shows on initial page load in a responsive poster grid.
- **Search Shows:** Search by title via the TVMaze search endpoint when submitting the search form.
- **Reset / Clear Search:** Easily clear search queries and restore the popular shows listing with a single click.
- **Dynamic Show Details Page:** Dedicated dynamic route (`/shows/[id]`) showing:
  - High-resolution poster
  - Title, genres, rating (⭐), language, premiere date, and run status
  - Plain-text description (sanitized to prevent XSS attacks)
  - External link to the show's official website
- **Graceful Loading & Error States:**
  - Animated cinema spinner while fetching data
  - User-friendly error messages with retry buttons
  - Empty state message when no shows match the search query
  - Custom Next.js 404 page (`not-found.jsx`) for non-existent or invalid show IDs
  - App-level error boundary (`error.jsx`) for runtime errors
- **Dark Cinema Theme:** Modern, accessible dark theme designed with Tailwind CSS, smooth card hover effects, and responsive mobile-to-desktop grid layouts.

---

## 🛠️ Technologies Used

- **Next.js 16 (App Router):** Modern React framework for routing, Server Components, and static/dynamic rendering.
- **React 19:** Functional components, React Hooks (`useState`, `useEffect`).
- **Tailwind CSS v4:** Utility-first styling for dark cinema aesthetic and responsive layout.
- **TVMaze REST API:** Free, open public API (no API key required).
- **Native Fetch API:** Standard browser/Node HTTP request interface.

---

## 📡 TVMaze API Information

This project interacts with three public TVMaze endpoints:

| Feature | Endpoint | Description |
| :--- | :--- | :--- |
| **Popular Shows** | `GET https://api.tvmaze.com/shows?page=0` | Returns a list of TV shows for the home feed |
| **Search Shows** | `GET https://api.tvmaze.com/search/shows?q={query}` | Searches shows; returns array of `{ score, show }` objects |
| **Show Details** | `GET https://api.tvmaze.com/shows/{id}` | Returns complete metadata for an individual show by ID |

*Note: The TVMaze API does not require authentication or API keys, making it fast and easy to run locally.*

---

## 📂 Project Structure

```text
movie-explorer/
├── app/
│   ├── layout.jsx            # Root layout with dark cinema theme & Header
│   ├── page.jsx              # Homepage with search and popular shows
│   ├── loading.jsx           # Global loading state
│   ├── error.jsx             # Global error boundary (Client Component)
│   ├── globals.css           # Tailwind CSS imports & color variables
│   └── shows/
│       └── [id]/
│           ├── page.jsx      # Server Component for show details
│           ├── loading.jsx   # Details page loading state
│           └── not-found.jsx # 404 page for invalid show IDs
├── components/
│   ├── Header.jsx            # Top navigation bar
│   ├── SearchBar.jsx         # Search form with input, submit & clear buttons
│   ├── ShowCard.jsx          # Individual show poster card with badges
│   ├── ShowGrid.jsx          # Responsive CSS grid container
│   ├── Loading.jsx           # Reusable loading spinner
│   ├── ErrorMessage.jsx      # Reusable error alert with retry button
│   └── EmptyState.jsx        # Empty state when search returns no results
├── lib/
│   └── api.js                # TVMaze fetch wrapper functions
├── package.json              # Project dependencies and scripts
└── README.md                 # Project documentation
```

---

## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-github-repo-url>
   cd movie-explorer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```text
   http://localhost:3000
   ```

5. **Build for production:**
   ```bash
   npm run build
   npm run start
   ```

---

## 💡 Simple Explanation of Key Implementation Details

1. **Separation of Concerns in `lib/api.js`:**
   - All network requests are kept in `lib/api.js`. Components do not contain raw `fetch` URLs.
   - `searchShows(query)` uses `encodeURIComponent(query)` to safely encode query strings with spaces and special symbols.
   - Standard `fetch` does not throw an error on HTTP 404 or 500 status codes; therefore, we check `if (!response.ok)` and throw an error manually.

2. **State Management in `app/page.jsx`:**
   - `shows`: Holds the array of shows currently displayed.
   - `searchQuery`: Stores whatever the user is currently typing in the input box.
   - `activeSearch`: Tracks the submitted query to display search result headers and the Clear button.
   - `loading`: Toggles the spinner during async operations.
   - `error`: Stores error messages to inform the user if the network fails.
   - `useEffect`: Runs once on component mount to load initial shows cleanly without blocking UI render.

3. **Dynamic Route & Server Component (`app/shows/[id]/page.jsx`):**
   - Uses Next.js App Router dynamic route parameter `[id]`.
   - In Next.js 15+, `params` is a Promise, so we `await params` to extract `id`.
   - Fetches data on the server, improving performance and SEO.
   - If the ID does not exist, it triggers `notFound()`, which renders `not-found.jsx`.

4. **Safe Description Handling (XSS Prevention):**
   - The TVMaze API returns show summaries containing HTML tags (e.g., `<p>`, `<b>`).
   - Rather than using `dangerouslySetInnerHTML` (which can expose the application to Cross-Site Scripting vulnerabilities), we use a clean regex helper function `cleanSummary()` to strip HTML tags safely and display clean text.

---

## ⚠️ Challenges Encountered & How They Were Solved

1. **TVMaze Search API Data Structure:**
   - *Challenge:* Unlike `/shows` which returns an array of show objects directly, `/search/shows?q=...` returns an array of objects structured as `{ score: number, show: { ... } }`.
   - *Solution:* In `lib/api.js`, we used `.map(item => item.show)` to normalize the search results so that `ShowCard` receives the exact same show object structure across both views.

2. **Missing Media and Data Fields:**
   - *Challenge:* Several TVMaze shows do not have a poster image, rating, or genre.
   - *Solution:* Used optional chaining (`show.image?.medium`) and fallback values (`"N/A"`, `"Genre unavailable"`, and a custom placeholder card) to prevent runtime crashes.

3. **React 19 & Next.js 16 Lint Rules:**
   - *Challenge:* Triggered `react-hooks/set-state-in-effect` when calling synchronous state updates inside `useEffect`.
   - *Solution:* Structured the effect with an `isMounted` flag and initialized `loading = true` in `useState`, eliminating redundant synchronous re-renders.

---

## 🔮 Future Improvements

- **Favorites / Watchlist:** Save favorite shows in browser `localStorage`.
- **Genre Filtering:** Filter shows by genre (Drama, Comedy, Action) via a dropdown or pill filters.
- **Pagination / Load More:** Implement pagination using TVMaze's `?page=` query parameter.
- **Cast & Crew Section:** Fetch `https://api.tvmaze.com/shows/{id}/cast` to display the actors.
