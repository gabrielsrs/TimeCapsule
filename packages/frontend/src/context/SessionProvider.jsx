import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "../utils/supabase-client.js"

const SessionContext = createContext()

export function SessionProvider({ children }) {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getSession = async () => {
      await supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
      
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      return () => subscription.unsubscribe()
    }

    getSession()
  }, [])


  return (
    <SessionContext.Provider value={[session, user]}>
      { children }
    </SessionContext.Provider>
  )
}


// eslint-disable-next-line react-refresh/only-export-components
export const useSession = () => {
  const context = useContext(SessionContext)
  if (!context) throw new Error("useSession must be used inside SessionProvider")
  return context
}