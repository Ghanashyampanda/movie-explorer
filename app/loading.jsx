// Root loading component used by Next.js during page transitions
export default function Loading() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <div className="absolute h-full w-full animate-spin rounded-full border-4 border-zinc-800 border-t-amber-500"></div>
        <span className="text-2xl">🎬</span>
      </div>
      <p className="mt-4 text-sm font-medium text-zinc-400">Loading Movie Explorer...</p>
    </main>
  );
}
