import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router"
import { Toaster } from "@/components/ui/sonner"
import './index.css'
import { App } from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
    <Toaster />
  </BrowserRouter>
)
