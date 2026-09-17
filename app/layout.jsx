import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "Movie Explorer - Discover Movies & TV Shows",
  description: "Browse popular TV shows, search your favorites, and view cast and summary details using the TVMaze API.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-zinc-950 text-zinc-100 font-sans antialiased flex flex-col" suppressHydrationWarning>
        <Header />
        <div className="flex-1">
          {children}
        </div>
        <footer className="border-t border-zinc-900 bg-zinc-950 py-6 text-center text-xs text-zinc-500">
          <p>Movie Explorer • Built for Next.js & React Technical Interview • Data from TVMaze</p>
        </footer>
      </body>
    </html>
  );
}
