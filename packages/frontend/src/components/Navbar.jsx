import { Session } from "../App"
import { useContext } from "react"
// import { Button } from "./Button";
import { Button } from "@/components/ui/button"
import { supabase } from "../utils/supabase-client.js"
import { Hourglass, Smartphone } from 'lucide-react';
import { Link } from "react-router";



export function Navbar() {
    const [session] = useContext(Session)

    async function handleLogin() {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        })
    };

    async function handleLogout() {
        console.log("Start logout")
        const { error } = await supabase.auth.signOut({
            scope: 'local'
        })

        console.log(error)
    };

    return (
        <nav className="flex justify-between fixed top-0 max-w-[1696px] w-full p-4">
            <div className="flex gap-2 items-center">
                <Button size="sm" variant="nav">
                    <Hourglass fill="#1E1E2F" stroke="#1E1E2F" width="18" height="18" className="rotate-90 cursor-pointer"/>
                </Button>
                

                <Button size="sm" variant="nav">
                    <Link to={{pathname: "/feed"}}>Feed</Link>
                </Button>
                <Button size="sm" variant="nav">
                    <Link to={{pathname: "/chat"}}>Chat</Link>
                </Button>
            </div>
            <div>
                {!session 
                    ? <Button size="sm" variant="nav" onClick={handleLogin}>Login</Button>
                    : <Button size="sm" variant="nav" onClick={handleLogout}>Logout</Button>
                }
                
            </div>
        </nav>
        
    )
}