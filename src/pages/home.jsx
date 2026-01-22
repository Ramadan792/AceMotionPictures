import { useState, useEffect } from "react"
import { Play, Star } from "lucide-react"
import { requests } from "../api/tmdb"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [upcomingMovies, setUpcomingMovies] = useState([])
  const [bollywoodMovies, setBollywoodMovies] = useState([])
  const [hollywoodMovies, setHollywoodMovies] = useState([])
  const [nollywoodMovies, setNollywoodMovies] = useState([])
  const [koreanMovies, setKoreanMovies] = useState([])
  const [animationMovies, setAnimationMovies] = useState([])
  const [heroMovie, setHeroMovie] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchAllMovies() {
      try {
        setLoading(true)
        
        // Fetch Trending
        const trendingRes = await fetch(requests.trending)
        const trendingData = await trendingRes.json()
        setTrendingMovies(trendingData.results)
        setHeroMovie(trendingData.results[0])

        // Fetch Popular
        const popularRes = await fetch(requests.popular)
        const popularData = await popularRes.json()
        setPopularMovies(popularData.results)

        // Fetch Top Rated
        const topRatedRes = await fetch(requests.topRated)
        const topRatedData = await topRatedRes.json()
        setTopRatedMovies(topRatedData.results)

        // Fetch Upcoming
        const upcomingRes = await fetch(requests.upcoming)
        const upcomingData = await upcomingRes.json()
        setUpcomingMovies(upcomingData.results)

        // Fetch Bollywood - Combine multiple pages
        const bollywood1 = await fetch(requests.bollywood)
        const bollywood2 = await fetch(requests.bollywood2)
        const bollywoodData1 = await bollywood1.json()
        const bollywoodData2 = await bollywood2.json()
        const combinedBollywood = [...bollywoodData1.results, ...bollywoodData2.results]
        setBollywoodMovies(combinedBollywood)

        // Fetch Hollywood
        const hollywoodRes = await fetch(requests.hollywood)
        const hollywoodData = await hollywoodRes.json()
        setHollywoodMovies(hollywoodData.results)

        // Fetch Nollywood - Combine search results
        const nollywood1 = await fetch(requests.nollywood)
        const nollywood2 = await fetch(requests.nollywood2)
        const nollywoodData1 = await nollywood1.json()
        const nollywoodData2 = await nollywood2.json()
        const combinedNollywood = [...nollywoodData1.results, ...nollywoodData2.results]
        // Remove duplicates
        const uniqueNollywood = combinedNollywood.filter((movie, index, self) =>
          index === self.findIndex((m) => m.id === movie.id)
        )
        setNollywoodMovies(uniqueNollywood)

        // Fetch Korean
        const koreanRes = await fetch(requests.korean)
        const koreanData = await koreanRes.json()
        setKoreanMovies(koreanData.results)

        // Fetch Animation
        const animationRes = await fetch(requests.animation)
        const animationData = await animationRes.json()
        setAnimationMovies(animationData.results)

        setLoading(false)
      } catch (error) {
        console.error("Error fetching movies:", error)
        setLoading(false)
      }
    }
    fetchAllMovies()
  }, [])

  // Get movies based on selected category
  const getCategoryMovies = () => {
    switch(activeCategory) {
      case 'Bollywood':
        return bollywoodMovies
      case 'hollywood':
        return hollywoodMovies
      case 'Nollywood':
        return nollywoodMovies
      case 'K-Drama':
        return koreanMovies
      case 'animation':
        return animationMovies
      default:
        return []
    }
  }

  // Movie Row Component (for "All" category)
  const MovieRow = ({ title, movies, emoji }) => (
    <div className="mb-8">
      <h2 className="text-white text-2xl font-bold mb-4 px-4 md:px-8 flex items-center gap-2">
        <span>{emoji}</span>
        {title}
      </h2>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide px-4 md:px-8 pb-2">
        {movies.slice(0, 20).map(movie => (
          movie.poster_path && (
            <div 
              key={movie.id}
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="flex-shrink-0 w-40 cursor-pointer transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative rounded-xl overflow-hidden mb-2 shadow-xl">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="w-full h-56 object-cover" 
                  alt={movie.title || movie.name} 
                />
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                  <Star size={12} className="text-yellow-500" fill="currentColor" />
                  <span className="text-white text-xs font-semibold">
                    {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                  </span>
                </div>
              </div>
              <h3 className="text-white text-sm font-semibold line-clamp-2">
                {movie.title || movie.name}
              </h3>
              <p className="text-gray-400 text-xs">
                {movie.release_date?.split('-')[0] || movie.first_air_date?.split('-')[0] || 'N/A'}
              </p>
            </div>
          )
        ))}
      </div>
    </div>
  )

  // Grid Catalog Component (for specific categories)
  const MovieCatalog = ({ movies, categoryName }) => {
    // Filter out movies without posters
    const validMovies = movies.filter(movie => movie.poster_path)
    
    return (
      <div className="px-4 md:px-8 py-6">
        <h2 className="text-white text-3xl font-bold mb-2">
          {categoryName} Collection
        </h2>
        <p className="text-gray-400 mb-6">
          {validMovies.length} movies found
        </p>
        
        {validMovies.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No {categoryName} movies available</p>
            <p className="text-gray-500 text-sm mt-2">Try selecting a different category</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {validMovies.map(movie => (
              <div 
                key={`${categoryName}-${movie.id}`}
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="cursor-pointer transform hover:scale-105 transition-all duration-300"
              >
                <div className="relative rounded-xl overflow-hidden mb-2 shadow-xl">
                  <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className="w-full h-64 object-cover" 
                    alt={movie.title || movie.name} 
                  />
                  <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                    <Star size={12} className="text-yellow-500" fill="currentColor" />
                    <span className="text-white text-xs font-semibold">
                      {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                    </span>
                  </div>
                </div>
                <h3 className="text-white text-sm font-semibold line-clamp-2">
                  {movie.title || movie.name}
                </h3>
                <p className="text-gray-400 text-xs">
                  {movie.release_date?.split('-')[0] || movie.first_air_date?.split('-')[0] || 'N/A'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  if (loading || !heroMovie) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-indigo-950 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-indigo-950 pb-24">
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent z-10" />
        <img 
          src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
          className="w-full h-full object-cover"
          alt={heroMovie.title}
        />
        
        <div className="absolute bottom-10 left-4 md:left-8 z-20 text-white max-w-md">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {heroMovie.title || heroMovie.name}
          </h1>
          <p className="text-sm text-gray-300 mb-1 uppercase tracking-wide">
            NOW STREAMING
          </p>
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              <Star size={16} className="text-yellow-500" fill="currentColor" />
              <span className="text-yellow-500 font-semibold">
                {heroMovie.vote_average.toFixed(1)}
              </span>
            </div>
            <span className="text-gray-300">•</span>
            <span className="text-gray-300">
              {heroMovie.release_date?.split('-')[0] || 'N/A'}
            </span>
          </div>
          <button 
            onClick={() => navigate(`/movie/${heroMovie.id}`)}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-full font-semibold flex items-center gap-2 transition-all shadow-lg"
          >
            <Play size={20} fill="white" />
            Watch Now
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="px-4 md:px-8 py-6">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {['All', 'hollywood', 'Bollywood', 'Nollywood', 'K-Drama', 'animation'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50' 
                  : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="mt-4">
        {activeCategory === 'All' ? (
          <>
            <MovieRow title="Trending Movies" movies={trendingMovies} emoji="🔥" />
            <MovieRow title="Series" movies={popularMovies} emoji="📺" />
            <MovieRow title="Sports" movies={topRatedMovies} emoji="⚽" />
            <MovieRow title="Kids" movies={upcomingMovies} emoji="👶" />
          </>
        ) : (
          <MovieCatalog movies={getCategoryMovies()} categoryName={activeCategory} />
        )}
      </div>
    </div>
  )
}