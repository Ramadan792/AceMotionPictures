import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import { FavoritesProvider } from "./context/favoritescontext"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  </BrowserRouter>
)