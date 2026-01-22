import { createContext, useContext, useState, useEffect } from 'react'

const FavoritesContext = createContext()

export function useFavorites() {
  return useContext(FavoritesContext)
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  // Load favorites from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('ace-favorites')
    if (saved) {
      setFavorites(JSON.parse(saved))
    }
  }, [])

  // Save to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('ace-favorites', JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (movie) => {
    setFavorites(prev => {
      // Check if already exists
      if (prev.find(m => m.id === movie.id)) {
        return prev
      }
      return [...prev, movie]
    })
  }

  const removeFavorite = (movieId) => {
    setFavorites(prev => prev.filter(m => m.id !== movieId))
  }

  const isFavorite = (movieId) => {
    return favorites.some(m => m.id === movieId)
  }

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  )
}