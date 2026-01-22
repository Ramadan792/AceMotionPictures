import { User, Settings, LogOut, Bell, HelpCircle, Trash2 } from "lucide-react"
import { useState } from "react"
import { useFavorites } from "../context/favoritescontext"

export default function Profile() {
  const { favorites } = useFavorites()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const handleClearCache = () => {
    if (confirm("Clear all cached data? This will remove your favorites.")) {
      localStorage.clear()
      window.location.reload()
    }
  }

  const handleLogout = () => {
    setShowLogoutConfirm(true)
  }

  const confirmLogout = () => {
    // Add your logout logic here
    alert("Logout functionality - connect to your backend here!")
    setShowLogoutConfirm(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-indigo-950 p-4 md:p-8 pb-24">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
          <User size={48} className="text-white" />
        </div>
        <h1 className="text-white text-2xl font-bold">Guest User</h1>
        <p className="text-gray-400 text-sm">guest@aceapp.com</p>
        
        {/* Stats */}
        <div className="flex gap-6 mt-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">{favorites.length}</p>
            <p className="text-gray-400 text-xs">Favorites</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-white">0</p>
            <p className="text-gray-400 text-xs">Downloads</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-2">
        <button 
          onClick={() => alert("Settings page - Coming soon!")}
          className="w-full bg-slate-800/50 hover:bg-slate-700 text-white p-4 rounded-xl flex items-center justify-between transition"
        >
          <div className="flex items-center gap-3">
            <Settings size={22} />
            <span>Settings</span>
          </div>
          <span className="text-gray-400">→</span>
        </button>

        <button 
          onClick={() => alert("Notifications page - Coming soon!")}
          className="w-full bg-slate-800/50 hover:bg-slate-700 text-white p-4 rounded-xl flex items-center justify-between transition"
        >
          <div className="flex items-center gap-3">
            <Bell size={22} />
            <span>Notifications</span>
          </div>
          <span className="text-gray-400">→</span>
        </button>

        <button 
          onClick={() => alert("Help & Support - Coming soon!")}
          className="w-full bg-slate-800/50 hover:bg-slate-700 text-white p-4 rounded-xl flex items-center justify-between transition"
        >
          <div className="flex items-center gap-3">
            <HelpCircle size={22} />
            <span>Help & Support</span>
          </div>
          <span className="text-gray-400">→</span>
        </button>

        <button 
          onClick={handleClearCache}
          className="w-full bg-slate-800/50 hover:bg-slate-700 text-white p-4 rounded-xl flex items-center justify-between transition"
        >
          <div className="flex items-center gap-3">
            <Trash2 size={22} />
            <span>Clear Cache</span>
          </div>
          <span className="text-gray-400">→</span>
        </button>

        <button 
          onClick={handleLogout}
          className="w-full bg-red-600/20 hover:bg-red-600/30 text-red-500 p-4 rounded-xl flex items-center justify-between transition mt-8"
        >
          <div className="flex items-center gap-3">
            <LogOut size={22} />
            <span>Log Out</span>
          </div>
          <span className="text-red-400">→</span>
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-2xl p-6 max-w-sm w-full">
            <h2 className="text-white text-xl font-bold mb-2">Log Out?</h2>
            <p className="text-gray-400 mb-6">Are you sure you want to log out?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl transition"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mt-8 text-gray-500 text-sm">
        <p>Version 1.0.0</p>
        <p className="mt-2">© 2024 ACE Motion Pictures</p>
      </div>
    </div>
  )
}