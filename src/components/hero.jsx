import { useEffect, useState } from "react"
import { requests } from "../api/tmdb"

export default function Hero() {
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    async function fetchHeroMovie() {
      const res = await fetch(requests.trending)
      const data = await res.json()

      const randomMovie =
        data.results[Math.floor(Math.random() * data.results.length)]

      setMovie(randomMovie)
    }

    fetchHeroMovie()
  }, [])

  if (!movie) return null

  return (
    <header
      className="relative h-[60vh] md:h-[80vh] bg-cover bg-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

      <div className="absolute bottom-10 left-4 md:left-8 max-w-xl">
        <h1 className="text-3xl md:text-5xl font-bold mb-3">
          {movie.title || movie.name}
        </h1>

        <p className="text-sm md:text-base text-gray-300 mb-4 line-clamp-3">
          {movie.overview}
        </p>

        <div className="flex gap-3">
          <button className="bg-white text-black px-5 py-2 rounded-md font-semibold">
            ▶ Play
          </button>
          <button className="bg-gray-700 px-5 py-2 rounded-md">
            More Info
          </button>
        </div>
      </div>
    </header>
  )
}