import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Star, Play, Plus, Share2, ArrowLeft, Heart } from "lucide-react"
import { useFavorites } from "../context/favoritescontext"

export default function MovieDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const [movie, setMovie] = useState(null)
  const [similarMovies, setSimilarMovies] = useState([])
  const [loading, setLoading] = useState(true)

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setLoading(true)
        
        const movieRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
        )
        const movieData = await movieRes.json()
        setMovie(movieData)

        const similarRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}`
        )
        const similarData = await similarRes.json()
        setSimilarMovies(similarData.results.slice(0, 6))

        setLoading(false)
      } catch (error) {
        console.error("Error fetching movie details:", error)
        setLoading(false)
      }
    }

    fetchMovieDetails()
  }, [id, API_KEY])

  const handleFavoriteToggle = () => {
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id)
    } else {
      addFavorite(movie)
    }
  }

  if (loading || !movie) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-indigo-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  const isInFavorites = isFavorite(movie.id)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-indigo-950 pb-24">
      {/* Hero Image Section */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-10" />
        
        <img 
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
          className="w-full h-full object-cover"
          alt={movie.title}
        />

        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-4 md:left-8 z-20 bg-black/50 backdrop-blur-sm p-3 rounded-full hover:bg-black/70 transition"
        >
          <ArrowLeft size={24} className="text-white" />
        </button>

        <div className="absolute bottom-0 left-0 right-0 z-20 px-4 md:px-8 pb-6">
          <div className="flex gap-4 items-end">
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              className="w-32 h-48 md:w-40 md:h-60 rounded-xl object-cover shadow-2xl hidden sm:block"
              alt={movie.title}
            />

            <div className="flex-1 text-white">
              <h1 className="text-3xl md:text-5xl font-bold mb-2">
                {movie.title || movie.name}
              </h1>
              
              <div className="flex flex-wrap items-center gap-3 mb-4 text-sm md:text-base">
                <div className="flex items-center gap-1 bg-yellow-500/20 px-3 py-1 rounded-full">
                  <Star size={18} className="text-yellow-500" fill="currentColor" />
                  <span className="text-yellow-500 font-bold">{movie.vote_average.toFixed(1)}</span>
                </div>
                
                <span className="text-gray-300">|</span>
                <span className="text-gray-300">{movie.release_date?.split('-')[0]}</span>
                
                <span className="text-gray-300">|</span>
                <span className="text-gray-300">{movie.runtime} min</span>
                
                {movie.adult && (
                  <>
                    <span className="text-gray-300">|</span>
                    <span className="bg-red-600 px-2 py-1 rounded text-xs font-bold">18+</span>
                  </>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres.slice(0, 3).map(genre => (
                  <span 
                    key={genre.id}
                    className="bg-slate-800/50 px-3 py-1 rounded-full text-sm text-gray-300"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 md:px-8 py-6 flex gap-3 flex-wrap">
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2 transition-all shadow-lg">
          <Play size={20} fill="white" />
          Watch Now
        </button>
        
        <button 
          onClick={handleFavoriteToggle}
          className={`${
            isInFavorites 
              ? 'bg-red-600 hover:bg-red-700' 
              : 'bg-slate-800/50 hover:bg-slate-700'
          } text-white p-3 rounded-full transition`}
        >
          <Heart 
            size={24} 
            fill={isInFavorites ? "currentColor" : "none"}
          />
        </button>
        
        <button className="bg-slate-800/50 hover:bg-slate-700 text-white p-3 rounded-full transition">
          <Share2 size={24} />
        </button>
      </div>

      {/* About Section */}
      <div className="px-4 md:px-8 mb-8">
        <h2 className="text-white text-2xl font-bold mb-4">About</h2>
        <p className="text-gray-300 leading-relaxed">
          {movie.overview || "No description available."}
        </p>
      </div>

      {/* Additional Info */}
      <div className="px-4 md:px-8 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-gray-500 text-sm mb-1">Status</p>
            <p className="text-white font-semibold">{movie.status}</p>
          </div>
          
          <div>
            <p className="text-gray-500 text-sm mb-1">Language</p>
            <p className="text-white font-semibold uppercase">{movie.original_language}</p>
          </div>
          
          <div>
            <p className="text-gray-500 text-sm mb-1">Budget</p>
            <p className="text-white font-semibold">
              {movie.budget ? `$${(movie.budget / 1000000).toFixed(1)}M` : 'N/A'}
            </p>
          </div>
          
          <div>
            <p className="text-gray-500 text-sm mb-1">Revenue</p>
            <p className="text-white font-semibold">
              {movie.revenue ? `$${(movie.revenue / 1000000).toFixed(1)}M` : 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* More Like This */}
      <div className="px-4 md:px-8">
        <h2 className="text-white text-2xl font-bold mb-4">More like this</h2>
        
        {similarMovies.length === 0 ? (
          <p className="text-gray-400">No similar movies found</p>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {similarMovies.map(similar => (
              similar.poster_path && (
                <div 
                  key={similar.id}
                  onClick={() => navigate(`/movie/${similar.id}`)}
                  className="cursor-pointer transform hover:scale-105 transition-all duration-300"
                >
                  <div className="relative rounded-xl overflow-hidden shadow-xl">
                    <img 
                      src={`https://image.tmdb.org/t/p/w500${similar.poster_path}`}
                      className="w-full h-48 object-cover"
                      alt={similar.title}
                    />
                    <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                      <Star size={10} className="text-yellow-500" fill="currentColor" />
                      <span className="text-white text-xs font-semibold">
                        {similar.vote_average.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-white text-xs font-semibold mt-2 line-clamp-2">
                    {similar.title}
                  </h3>
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  )
}