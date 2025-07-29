import { supabase } from "./supabase-client"

const URL = "http://127.0.0.1:5000/api"

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

    const res = await fetch(`${URL}/users`, fetchOptions);

    return await res.json()
}
async function getPost(postId){
    const fetchOptions = {
        method: "GET",
        credentials: "include"
    }

    const res = await fetch(`${URL}/posts/${postId}`, fetchOptions);

    return await res.json()
}
async function getPosts(params=[]){
    const fetchOptions = {
        method: "GET",
        credentials: "include"
    }
    let queryParams = "?"

    for(const param of params) {
        queryParams += `${Object.keys(param)[0]}=${Object.values(param)[0]}&`
    }

    const res = await fetch(`${URL}/posts/${queryParams}`, fetchOptions);

    return await res.json()
}
async function createPosts({ ...data }){
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data)
    }

    const res = await fetch(`${URL}/posts`, fetchOptions);

    return await res.json()
}

async function getMetadata(){
    const fetchOptions = {
        method: "GET",
        credentials: "include"
    }

    const res = await fetch(`${URL}/metadata`, fetchOptions);

    return await res.json()
}

async function createMetadata(postId){
    const fetchOptions = {
        method: "POST",
        credentials: "include"
    }

    const res = await fetch(`${URL}/metadata/${postId}`, fetchOptions);
    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message || `Error ${res.status}`)
    }

    return data
}

export {
    getUser,
    createUser,
    getPost,
    getPosts,
    createPosts,
    getMetadata,
    createMetadata
}