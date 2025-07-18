import { createContext, useContext, useEffect, useState } from "react"
import { SocketClient } from "../lib/socketClient.js"
import { useSession } from "../context/SessionProvider.jsx"

const SocketContext = createContext(null)

export const SocketProvider = ({ children }) => {
    const [connected, setConnected] = useState(false)
    const [session] = useSession()
    
    const socketClient = new SocketClient(session?.access_token)

    useEffect(() => {
        socketClient.connect()

        socketClient.on("connect", () => setConnected(true))
        socketClient.on("disconnect", () => setConnected(false))

        return () => socketClient.disconnect();
    }, [])

    return (
        <SocketContext.Provider value={{ socketClient, connected }}>
            {children}
        </SocketContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => {
  const context = useContext(SocketContext)
  if (!context) throw new Error("useSocket must be used inside SocketProvider")
  return context
}