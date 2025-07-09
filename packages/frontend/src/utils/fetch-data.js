import { supabase } from "./supabase-client"

async function getUser({ userId }){
    const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', userId)

    if (error) throw Error(`Error when fetching user, message: ${error.message}`)
    
    return data
}
async function createUser({ token }){
    const fetchOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        credentials: "include"
    }

    const res = await fetch("http://127.0.0.1:5000/api/users", fetchOptions);

    return await res.json()
}
async function getPosts(){
    const fetchOptions = {
        method: "GET",
        credentials: "include"
    }

    const res = await fetch("http://127.0.0.1:5000/api/posts", fetchOptions);

    return await res.json()
}
async function createPosts({ data }){
    const fetchOptions = {
        method: "POST",
        credentials: "include",
        data
    }

    const res = await fetch("http://127.0.0.1:5000/api/posts", fetchOptions);

    return await res.json()
}

export {
    getUser,
    createUser,
    getPosts,
    createPosts
}