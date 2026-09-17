import Link from "next/link";

// Header component provides consistent top navigation across all pages
export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 text-xl shadow-lg shadow-rose-900/30">
            🎬
          </span>
          <div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors">
              Movie Explorer
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/"
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
          >
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}
