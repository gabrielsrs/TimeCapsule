import { useEffect } from "react";
import { useNavigate  } from "react-router"; // Or `useRouter` in Next.js
import { supabase } from "../utils/supabase-client.js";

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
      const res = await fetch("http://127.0.0.1:5000/api/users", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.access_token}`
        },
        credentials: "include"
      });

      console.log(res);

      navigate ("/")
    }

    handleRedirect();
  }, [navigate]);

  return <p>Signing in...</p>;
}
