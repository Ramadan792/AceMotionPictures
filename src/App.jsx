import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import BottomNav from "./components/bottomnav"
import Home from "./pages/home"
import Search from "./pages/search"
import MovieDetails from "./pages/details"
import Collection from "./pages/collection"
import Profile from "./pages/profile"

export default function App() {
  return (
    <div className="bg-black min-h-screen pb-20">
      <Navbar /> 
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/collection" element={<div className="text-white text-center p-20">Collection Page Coming Soon</div>} />
        <Route path="/profile" element={<div className="text-white text-center p-20">Profile Page Coming Soon</div>} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
      <BottomNav />
    </div>
  )
}