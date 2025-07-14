import { Button } from "./Button";
import { supabase } from "../utils/supabase-client.js"
import { Hourglass } from 'lucide-react';


export function Login() {
    async function handleLogin() {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            }
        })
    };

    return (
        <nav className="flex">
            <div>
                <Hourglass/>
            </div>
            <div>
                <Button title={"Login"} onClick={handleLogin} style={{ cursor: "pointer" }}/>
            </div>
        </nav>
        
    )
}