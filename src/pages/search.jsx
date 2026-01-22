import { useState, useEffect } from "react"
import { Star, X } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function Search() {
  const [query, setQuery] = useState("")
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY

  // Real-time search as user types
  useEffect(() => {
    if (query.trim().length === 0) {
      setMovies([])
      return
    }

    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true)
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
        )
        const data = await res.json()
        setMovies(data.results)
        setLoading(false)
      } catch (error) {
        console.error("Search error:", error)
        setLoading(false)
      }
    }, 500) // Wait 500ms after user stops typing

    return () => clearTimeout(timeoutId)
  }, [query, API_KEY])

  return (
    <div className="bg-gradient-to-b from-slate-950 to-indigo-950 min-h-screen text-white px-4 md:px-8 pb-24">
      {/* Search Bar */}
      <div className="py-6 sticky top-16 bg-slate-950/95 backdrop-blur-sm z-10">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-slate-800 text-white p-4 pr-12 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 transition"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-20">
          <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 mt-4">Searching...</p>
        </div>
      )}

      {/* No Query State */}
      {!query && !loading && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">Search for your favorite movies</p>
          <p className="text-gray-500 text-sm mt-2">Type in the search bar above</p>
        </div>
      )}

      {/* No Results */}
      {query && !loading && movies.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No movies found for "{query}"</p>
          <p className="text-gray-500 text-sm mt-2">Try a different search term</p>
        </div>
      )}

      {/* Results Grid */}
      {movies.length > 0 && (
        <>
          <p className="text-gray-400 mb-4">{movies.length} results found</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {movies.map(movie => (
              movie.poster_path && (
                <div
                  key={movie.id}
                  onClick={() => navigate(`/movie/${movie.id}`)}
                  className="cursor-pointer transform hover:scale-105 transition-all duration-300"
                >
                  <div className="relative rounded-xl overflow-hidden shadow-xl">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                      <Star size={12} className="text-yellow-500" fill="currentColor" />
                      <span className="text-white text-xs font-semibold">
                        {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-white text-sm font-semibold mt-2 line-clamp-2">
                    {movie.title}
                  </h3>
                  <p className="text-gray-400 text-xs">
                    {movie.release_date?.split('-')[0] || 'N/A'}
                  </p>
                </div>
              )
            ))}
          </div>
        </>
      )}
    </div>
  )
}