import { Button } from "./Button";
import { supabase } from "../utils/supabase-client.js"

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
        <Button title={"Login"} onClick={handleLogin} style={{ cursor: "pointer" }}/>
    )
}