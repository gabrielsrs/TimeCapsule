import { useEffect } from "react";
import { useNavigate  } from "react-router";
import { supabase } from "../utils/supabase-client.js";
import { createUser } from "../utils/fetch-data.js"

export function AuthCallback() {
  const navigate  = useNavigate()

  useEffect(() => {
    async function handleRedirect() {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession();

      if (error || !session) {
        console.error("Auth error:", error);
        return (navigate ("/"))
      }

      // Send access_token to backend
      createUser({ token: session.access_token })
        .then(res => console.log(res))
        .catch(async error => {
          console.error("Auth error:", error)

          await supabase.auth.signOut({scope: 'local'})
        })

      navigate ("/")
    }

    handleRedirect();
  }, [navigate]);
}
