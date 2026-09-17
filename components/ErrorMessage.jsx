// ErrorMessage displays user-friendly error feedback with an optional retry button
export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-red-900/60 bg-red-950/40 p-6 text-center shadow-lg">
      <span className="text-3xl">⚠️</span>
      <h3 className="mt-2 text-base font-semibold text-red-400">
        Something went wrong
      </h3>
      <p className="mt-1 text-sm text-zinc-400">
        {message || "Unable to fetch data from the server. Please try again."}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-xl bg-red-600/80 px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-600 active:scale-95"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
