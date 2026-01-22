import { Heart, Star } from "lucide-react"
import { useFavorites } from "../context/favoritescontext"
import { useNavigate } from "react-router-dom"

export default function Collection() {
  const { favorites } = useFavorites()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-indigo-950 p-4 md:p-8 pb-24">
      <h1 className="text-white text-3xl font-bold mb-6">YOUR LIBRARY</h1>
      
      <h2 className="text-white text-xl mb-4 flex items-center gap-2">
        <Heart size={20} className="text-red-500" fill="currentColor" />
        Favourites ({favorites.length})
      </h2>
      
      {favorites.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No favourites yet</p>
          <p className="text-gray-500 text-sm mt-2">Add movies to your favourites list from movie details page</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {favorites.map(movie => (
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
                    {movie.vote_average.toFixed(1)}
                  </span>
                </div>
              </div>
              <h3 className="text-white text-sm font-semibold mt-2 line-clamp-2">
                {movie.title}
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}