import { SessionProvider } from "./context/SessionProvider.jsx"
import { SocketProvider } from "./context/SocketProvider.jsx"
import { Navbar } from "./components/Navbar.jsx";
import { Feed } from "./pages/Feed.jsx"
import { Chat } from "./pages/Chat.jsx"
import { AuthCallback } from "./components/AuthCallback.jsx"
import { Routes, Route } from "react-router"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export function App() {

  return (
    <SessionProvider>
      <SocketProvider>
        <QueryClientProvider client={queryClient}>
          <div className="flex flex-col min-h-screen max-w-[1728px] m-auto">
            <Navbar/>
            <Routes>
              <Route index element={<Feed />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
            </Routes>
          </div>
        </QueryClientProvider>
      </SocketProvider>
    </SessionProvider>
  )
}
