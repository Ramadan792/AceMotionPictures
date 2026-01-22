import { useEffect, useState } from "react"
import MovieModal from "./moviemodals"

export default function MovieRow({ title, fetchUrl }) {
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)

  useEffect(() => {
    async function fetchMovies() {
      const res = await fetch(fetchUrl)
      const data = await res.json()
      setMovies(data.results)
    }

    fetchMovies()
  }, [fetchUrl])

  return (
    <>
      <section className="px-4 md:px-8 mb-8">
        <h2 className="text-lg md:text-xl font-semibold mb-3">
          {title}
        </h2>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {movies.map(movie => (
            movie.poster_path && (
              <img
                key={movie.id}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                onClick={() => setSelectedMovie(movie)}
                className="min-w-[140px] md:min-w-[180px]
                           h-[210px] md:h-[260px]
                           object-cover rounded-lg
                           hover:scale-105 transition-transform duration-300
                           cursor-pointer"
              />
            )
          ))}
        </div>
      </section>

      {/* Modal */}
      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </>
  )
}
