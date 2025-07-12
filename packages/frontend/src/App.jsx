import { useState, useEffect, createContext } from "react";
import { supabase } from "./utils/supabase-client.js"
import { Navbar } from "./components/Navbar.jsx";
import { Header } from "./components/Header.jsx"
import { Feed } from "./pages/Feed.jsx"
import { Chat } from "./pages/Chat.jsx"
import { AuthCallback } from "./components/AuthCallback.jsx"
import { Routes, Route } from "react-router"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const Session = createContext()
const queryClient = new QueryClient()

function App() {
  const [session, setSession] = useState(null)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    console.log("test")
    return () => subscription.unsubscribe()
  }, [])

  return (
    <Session.Provider value={[session, setSession]}>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col min-h-screen max-w-[1728px] m-auto px-2">
          <Navbar/>
          <Routes>
            <Route index element={<Feed />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
          </Routes>
        </div>
      </QueryClientProvider>
    </Session.Provider>
  )
}

export { App, Session }
