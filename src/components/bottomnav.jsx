import { Home, Film, Search, User } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

export default function BottomNav() {
  const location = useLocation()
  
  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-sm border-t border-slate-800 pb-safe">
      <div className="max-w-2xl mx-auto px-6 py-3">
        <div className="flex justify-around items-center">
          
          {/* Home */}
          <Link 
            to="/" 
            className="flex flex-col items-center gap-1 transition-all"
          >
            <div className={`p-2 rounded-full transition-all ${
              isActive("/") 
                ? "bg-blue-600 text-white" 
                : "text-gray-400 hover:text-white"
            }`}>
              <Home size={22} />
            </div>
            <span className={`text-xs font-medium ${
              isActive("/") ? "text-blue-500" : "text-gray-400"
            }`}>
              Home
            </span>
          </Link>

          {/* Collection */}
          <Link 
            to="/collection" 
            className="flex flex-col items-center gap-1 transition-all"
          >
            <div className={`p-2 rounded-full transition-all ${
              isActive("/collection") 
                ? "bg-blue-600 text-white" 
                : "text-gray-400 hover:text-white"
            }`}>
              <Film size={22} />
            </div>
            <span className={`text-xs font-medium ${
              isActive("/collection") ? "text-blue-500" : "text-gray-400"
            }`}>
              collection
            </span>
          </Link>

          {/* Search */}
          <Link 
            to="/search" 
            className="flex flex-col items-center gap-1 transition-all"
          >
            <div className={`p-2 rounded-full transition-all ${
              isActive("/search") 
                ? "bg-blue-600 text-white" 
                : "text-gray-400 hover:text-white"
            }`}>
              <Search size={22} />
            </div>
            <span className={`text-xs font-medium ${
              isActive("/search") ? "text-blue-500" : "text-gray-400"
            }`}>
              search
            </span>
          </Link>

          {/* Profile */}
          <Link 
            to="/profile" 
            className="flex flex-col items-center gap-1 transition-all"
          >
            <div className={`p-2 rounded-full transition-all ${
              isActive("/profile") 
                ? "bg-blue-600 text-white" 
                : "text-gray-400 hover:text-white"
            }`}>
              <User size={22} />
            </div>
            <span className={`text-xs font-medium ${
              isActive("/profile") ? "text-blue-500" : "text-gray-400"
            }`}>
              Profile
            </span>
          </Link>

        </div>
      </div>
    </nav>
  )
}