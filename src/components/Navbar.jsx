import { Link, useLocation } from "react-router-dom"
import { Search, User } from "lucide-react"

export default function Navbar() {
  const location = useLocation()
  
  return (
    <nav className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ACE Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="text-3xl font-bold text-white">ACE</div>
          </Link>

          {/* Right Side Icons */}
          <div className="flex items-center gap-6">
            <Link to="/search" className="text-gray-300 hover:text-white transition">
              <Search size={22} />
            </Link>
            <Link to="/profile" className="text-gray-300 hover:text-white transition">
              <User size={22} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}