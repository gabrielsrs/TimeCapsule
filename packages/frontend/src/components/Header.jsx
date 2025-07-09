import { Session } from "../App"
import { useContext } from "react"
import { Login } from "./Login"
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

export function Header() {
    const [session] = useContext(Session)

    if (!session) {
        return (<Login/>)
        return (<Auth providers={['google']} supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
    }
    else {
        // const { data: { user }, error } = supabase.auth.getUser();
        // const { data: { session: s }, err } = await supabase.auth.getSession();
        return (<div>Logged in!</div>)
    }
}