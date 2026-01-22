export default function MovieModal({ movie, onClose }) {
  if (!movie) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
      onClick={onClose}   // 👈 background click
    >
      <div
        className="bg-zinc-900 text-white rounded-lg max-w-2xl w-full relative"
        onClick={(e) => e.stopPropagation()} // 👈 prevent close when clicking modal
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl"
        >
          ✕
        </button>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-4 p-5">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full md:w-48 rounded-lg"
          />

          <div>
            <h2 className="text-2xl font-bold mb-2">
              {movie.title}
            </h2>

            <p className="text-gray-300 text-sm mb-3">
              {movie.overview}
            </p>

            <p className="text-sm">
              ⭐ Rating: {movie.vote_average}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
