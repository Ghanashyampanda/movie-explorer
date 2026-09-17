"use client";

import { useEffect } from "react";
import Link from "next/link";

// Next.js App Router error boundary component
export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    // Log unexpected runtime errors to the browser console for debugging
    console.error("App error caught by ErrorBoundary:", error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-950/60 border border-red-900 text-3xl">
        ⚠️
      </div>
      <h1 className="mt-6 text-2xl font-bold text-zinc-100">
        Something went wrong
      </h1>
      <p className="mt-2 text-sm text-zinc-400">
        An unexpected error occurred while loading this page.
      </p>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-amber-400"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800"
        >
          Go to Home
        </Link>
      </div>
    </main>
  );
}
