// Loading component displays a clean cinema-themed loading spinner
export default function Loading({ message = "Loading shows from TVMaze..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="relative flex h-14 w-14 items-center justify-center">
        <div className="absolute h-full w-full animate-spin rounded-full border-4 border-zinc-800 border-t-amber-500"></div>
        <span className="text-xl">🎬</span>
      </div>
      <p className="mt-4 text-sm font-medium text-zinc-400">{message}</p>
    </div>
  );
}
