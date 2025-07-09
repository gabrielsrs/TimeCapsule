import { useQuery } from '@tanstack/react-query'
import { getPosts, getUser } from "../utils/fetch-data.js"

export function Feed() {
    const { data: posts } = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts
    })

    const { data: user } = useQuery({
        queryKey: ['users'],
        queryFn: () => getUser({userId: ""})
    })
    
    console.log(posts)
    console.log(user)

    return (
        <h1>Feed</h1>
    )
}