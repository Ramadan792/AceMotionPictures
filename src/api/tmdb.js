const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = "https://api.themoviedb.org/3"

export const requests = {
  trending: `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`,
  popular: `${BASE_URL}/movie/popular?api_key=${API_KEY}`,
  topRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`,
  upcoming: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`,
  search: (query) => `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`,
  
  // Regional content - Multiple pages for better results
  bollywood: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=hi&sort_by=popularity.desc&page=1`,
  bollywood2: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=hi&sort_by=vote_count.desc&page=2`,
  
  hollywood: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=en&sort_by=popularity.desc&page=1`,
  
  // Nollywood - search by popular Nigerian movies
  nollywood: `${BASE_URL}/search/movie?api_key=${API_KEY}&query=nollywood`,
  nollywood2: `${BASE_URL}/search/movie?api_key=${API_KEY}&query=nigerian`,
  
  korean: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_original_language=ko&sort_by=popularity.desc`,
  
  animation: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=16&sort_by=popularity.desc`,
}