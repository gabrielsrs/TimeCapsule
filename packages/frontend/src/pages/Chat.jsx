import { useState, useEffect } from "react"
import { useQuery, useMutation } from '@tanstack/react-query'
import { getPost, getMetadata } from "../utils/fetch-data.js"
import { DateMessage } from '../components/DateMessage.jsx'
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
    SendHorizontal,
    Plus,
    Minus,
    Search,
} from "lucide-react"
import { useSocket } from "../context/SocketProvider.jsx"
import { useSession } from "../context/SessionProvider.jsx"

export function Chat() {
    const [chatQuantity, setChatQuantity] = useState(0)
    const [postContent, setPostContent] = useState(false)
    // const [postsData, setPostsData] = useState([
    //     {id: "123"},
    //     {id: "321"},
    //     {id: "345"},
    //     {id: "565"},
    //     {id: "232"},
    //     {id: "462"},
    //     {id: "987"},
    //     {id: "656"},
    // ])
    const [messages, setMessages] = useState([])
    const [session, user] = useSession()
    
    const { socketClient } = useSocket()

    const { data: metadata, isSuccess: successMetadata } = useQuery({
        queryKey: ["metadata"],
        queryFn: getMetadata
    })

    async function getPostById() {
        const posts = await Promise.all(
            metadata.metadata.map(item => getPost(item.postId))
        );
        return posts;
    }
    // see posiblitity to make a list of ids and send then as query params
    const { data: postsData, isSuccess: successPost } = useQuery({
        queryKey: ["postMetadata"],
        queryFn: getPostById,
        enabled: successMetadata
    })
    
    const handleMessage = (messageObj) => {
        setMessages(previousMessages => [...previousMessages, messageObj]);
    }

    // useEffect(() => {
    //     socketClient.emitStatus()
    //     socketClient.onStatus(status => console.log(status))

    //     socketClient.onMessage(handleMessage)
        
    //     // Optionally clean up listener
    //     return () => socketClient.off("message", handleMessage)
    // }, [])

    function sendMessage(event) {
        const inputMessage = event.target.closest("div").firstChild
        const message = inputMessage.value.trim()

        if(message){
            socketClient.emitMessage({postId: postContent.post.id, message: message})
            inputMessage.value = ""
        }
    }

    function date(dateTime) {
        const date = `${dateTime.getFullYear()}-${dateTime.getMonth()}-${dateTime.getDate()}`

        const hours = dateTime.getHours() >= 12? {hour: dateTime.getHours() - 12, meridiemPeriod: "PM"}: {hour: dateTime.getHours(), meridiemPeriod: "AM"}
        const time = `${hours.hour}:${dateTime.getMinutes()}:${dateTime.getSeconds()} ${hours.meridiemPeriod}`

        return {date, time}
    }

    function handlePostContentView(event) {
        const postId = event.currentTarget.id
        const content = event.currentTarget.lastChild.textContent

        const target = postContent?.post?.id == postId
        const targetPost = postsData.find(item => item.post.id == postId).post
        targetPost.createDateTime = date(new Date(targetPost.createdAt.slice(0,-1)))
        targetPost.publishDateTime = date(new Date(targetPost.publishDate.slice(0,-1)))
        targetPost.unpublishDateTime = targetPost.unpublish && date(new Date(targetPost.unpublishDate.slice(0,-1)))

        const targetMetadata = metadata.metadata.find(item => item.id == postId)
        setPostContent({ open: !target,  post: !target && targetPost, text: content, metadata: targetMetadata  })

        setMessages([])
        if(!postContent || !target){
            socketClient.enterPostChat(postId)  
            socketClient.off("message")
            socketClient.onMessage(handleMessage)
        }
    }
    
    return (
        <div className="h-screen grid grid-cols-18 grid-rows-[auto_1fr] gap-4 pt-12 p-4">
            <div className="h-52 flex col-span-5 pt-14">
                <div>
                    <h1 className="text-[114px]/[100px] font-[fantasy] px-0.5">Chat</h1>
                    <div className="flex justify-between text-sm/2 font-semibold px-1.5">
                        <span>time capsule</span>
                        <span>Feed</span>
                    </div>
                </div>
                <div className="text-xl/1 font-semibold ml-1">
                    <span>[ </span>
                    <span className="text-base">{successPost? postsData.length: 0}</span>
                    <span> ]</span>
                </div>
            </div>
            <div className="flex flex-col col-span-13 row-span-2">
                {postContent.open && (
                    <>  
                        <Separator className="my-2"/>
                        {session && (
                            <div className="max-h-[48vh] flex flex-col flex-1">
                                <div className="flex flex-1 flex-col-reverse overflow-y-auto">
                                    {messages.map((message, index) => {
                                        return (
                                            <div key={index} className={`w-fit flex-col ${message.userId == user.id && "self-end"}`}>
                                                <div className="flex justify-between gap-4">
                                                    <span className="text-sm pl-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:left-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0 after:bottom-0">26</span>
                                                    <span className="text-sm pr-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:right-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:right-0 after:bottom-0">{ message.name }</span>
                                                </div>
                                                <div className="w-full px-2.5 border-x-2 border-palette-dark-slate">
                                                    <p>{ message.message }</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    {/* <div className="w-fit flex-col">
                                        <div className="flex justify-between">
                                            <span className="text-sm pl-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:left-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0 after:bottom-0">26</span>
                                            <span className="text-sm pr-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:right-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:right-0 after:bottom-0">Hedigar</span>
                                        </div>
                                        <div className="w-fit px-2.5 border-x-2 border-palette-dark-slate">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                        </div>
                                    </div>

                                    <div className="w-fit flex-col">
                                        <div className="flex justify-between">
                                            <span className="text-sm pl-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:left-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0 after:bottom-0">26</span>
                                            <span className="text-sm pr-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:right-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:right-0 after:bottom-0">Hedigar</span>
                                        </div>
                                        <div className="w-fit px-2.5 border-x-2 border-palette-dark-slate">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                        </div>
                                    </div>

                                    <div className="w-fit flex-col">
                                        <div className="flex justify-between">
                                            <span className="text-sm pl-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:left-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0 after:bottom-0">26</span>
                                            <span className="text-sm pr-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:right-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:right-0 after:bottom-0">Hedigar</span>
                                        </div>
                                        <div className="w-fit px-2.5 border-x-2 border-palette-dark-slate">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                        </div>
                                    </div>

                                    <div className="w-fit flex-col">
                                        <div className="flex justify-between">
                                            <span className="text-sm pl-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:left-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0 after:bottom-0">26</span>
                                            <span className="text-sm pr-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:right-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:right-0 after:bottom-0">Hedigar</span>
                                        </div>
                                        <div className="w-fit px-2.5 border-x-2 border-palette-dark-slate">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                        </div>
                                    </div>

                                    <div className="w-fit flex-col">
                                        <div className="flex justify-between">
                                            <span className="text-sm pl-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:left-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0 after:bottom-0">26</span>
                                            <span className="text-sm pr-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:right-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:right-0 after:bottom-0">Hedigar</span>
                                        </div>
                                        <div className="w-fit px-2.5 border-x-2 border-palette-dark-slate">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                        </div>
                                    </div>

                                    <div className="w-fit flex-col">
                                        <div className="flex justify-between">
                                            <span className="text-sm pl-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:left-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0 after:bottom-0">26</span>
                                            <span className="text-sm pr-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:right-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:right-0 after:bottom-0">Hedigar</span>
                                        </div>
                                        <div className="w-fit px-2.5 border-x-2 border-palette-dark-slate">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                        </div>
                                    </div>

                                    <div className="w-fit flex-col">
                                        <div className="flex justify-between">
                                            <span className="text-sm pl-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:left-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0 after:bottom-0">26</span>
                                            <span className="text-sm pr-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:right-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:right-0 after:bottom-0">Hedigar</span>
                                        </div>
                                        <div className="w-fit px-2.5 border-x-2 border-palette-dark-slate">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                        </div>
                                    </div>

                                    <div className="w-fit flex-col">
                                        <div className="flex justify-between">
                                            <span className="text-sm pl-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:left-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0 after:bottom-0">26</span>
                                            <span className="text-sm pr-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:right-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:right-0 after:bottom-0">Hedigar</span>
                                        </div>
                                        <div className="w-fit px-2.5 border-x-2 border-palette-dark-slate">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                        </div>
                                    </div>

                                    <div className="w-fit flex-col">
                                        <div className="flex justify-between">
                                            <span className="text-sm pl-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:left-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0 after:bottom-0">26</span>
                                            <span className="text-sm pr-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:right-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:right-0 after:bottom-0">Hedigar</span>
                                        </div>
                                        <div className="w-fit px-2.5 border-x-2 border-palette-dark-slate">
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                        </div>
                                    </div> */}
                                    
                                </div>
                                <div className="h-11 flex justify-end items-center relative mt-2">
                                    <Input className="h-14 pr-22 absolute" placeholder="Send your message"/>
                                    <span title="Send" className="z-1 p-1 mr-1 cursor-pointer select-none" onClick={event => sendMessage(event)}><SendHorizontal/></span>
                                    <span title="Publish message" className="z-1"><DateMessage /></span>
                                </div>
                            </div>
                        )}
                        <div className="max-h-[15vh] border-2 rounded-2xl p-4 my-4">
                            <p>{postContent.text}</p>
                        </div>
                    </>
                )}

                <div className={`${postContent.open && "max-h-[25vh]"} flex-1 flex flex-col-reverse overflow-y-auto`}>
                    <Separator className="my-2"/>
                    {successPost && postsData.map(postResponse => {
                        const postData = postResponse.post
                        const isThisPostOpen = postContent.open && postData.id == postContent.post.postId
                        const recipients = postData.recipients.slice(0,1) + postData.recipients.slice(1,).toLowerCase()
                        const publishDateTime = date(new Date(postData.publishDate.slice(0,-1)))

                        return (
                            <>
                                <div key={postData.id} id={postData.id} className="flex items-center cursor-pointer" onClick={event  => handlePostContentView(event)}>
                                    <div className="flex flex-col flex-5 items-start">
                                        <div className="flex items-center">
                                            <div className="bg-palette-dark-slate left-0 size-1.5 mr-2.5"></div>
                                            <span title={!isThisPostOpen && publishDateTime.time}>{publishDateTime.date}</span>
                                        </div>
                                        {isThisPostOpen && (<span className="ml-4">{publishDateTime.time}</span>)}
                                    </div>
                                    <div className={`flex-20 items-center ${!isThisPostOpen && "truncate"}`}>
                                        <span className="text-2xl font-normal ">{postData.title}</span>
                                    </div>
                                    <div className="flex-4 items-center">
                                        <span className="bg-palette-grey/10 text-sm border border-palette-grey/30 py-0.5 px-1 rounded-sm">{recipients}</span>
                                    </div>
                                    <div className="flex-6">
                                        <span>@Hedigar</span>
                                    </div>
                                    <div className="right-0 ml-2">
                                        {isThisPostOpen ? <Minus size={16}/>: <Plus size={16}/>}
                                    </div>
                                    <p className="hidden">{postData.content}</p>
                                </div>
                                <Separator className="my-2"/>
                            </>
                        )
                    })}                   

                </div>

                <div className="flex flex-col">
                    <div className="h-5 flex items-center m-4">
                        <span className="py-1 px-2 cursor-pointer">User</span>
                        <Separator className="mx-1" orientation="vertical"/>
                        <span className="py-1 px-2 cursor-pointer">Title</span>
                        <Separator className="mx-1" orientation="vertical"/>
                        <span className="py-1 px-2 cursor-pointer">Content</span>
                    </div>
                    <div className="h-11 flex justify-end items-center relative mt-2">
                        <Input className="h-12 pr-12 absolute" placeholder="Searsh for posts"/>
                        <span title="search" className="z-1"><Search className="cursor-pointer mr-4"/></span>
                    </div>
                </div>
            </div> 
            <div className="min-h-24 h-fit flex flex-col col-span-5 p-2 border-2 rounded-2xl relative">
                <div className="absolute top-[-14px] bg-white px-2 ml-4">Metadata</div>
                {postContent.open? (
                    <>
                        <div className="flex justify-between items-center">
                            <span className="truncate">Hedigar</span>
                            <img className="size-8 bg-palette-dark-slate rounded-3xl p-0.5" src="" alt="" />
                        </div>

                        <div className="flex flex-col">
                            <span className="text-sm pl-4.5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:left-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0 after:bottom-0">Send in chat</span>
                            <span className="pl-2.5 relative before:h-0.5 before:w-2 before:bg-palette-dark-slate before:absolute before:left-0 before:top-3 after:h-3 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0">{postContent.metadata.postsCount._sum.messagesCount} Messages</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-sm pl-4.5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:left-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0 after:bottom-0">Send by user</span>
                            <span className="pl-2.5 relative before:h-0.5 before:w-2 before:bg-palette-dark-slate before:absolute before:left-0 before:top-3 after:h-3 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0">{postContent.metadata.messagesCount} Messages</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-sm pl-4.5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:left-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0 after:bottom-0">Recipient</span>
                            <span className="pl-2.5 relative before:h-0.5 before:w-2 before:bg-palette-dark-slate before:absolute before:left-0 before:top-3 after:h-3 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0">{postContent.post.recipients.slice(0,1) + postContent.post.recipients.slice(1,).toLowerCase()}</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-sm pl-4.5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:left-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0 after:bottom-0">Create Date</span>
                            <span className="pl-2.5 relative before:h-0.5 before:w-2 before:bg-palette-dark-slate before:absolute before:left-0 before:top-3 after:h-3 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0">{postContent.post.createDateTime.date} {postContent.post.createDateTime.time}</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-sm pl-4.5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:left-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0 after:bottom-0">Publish Date</span>
                            <span className="pl-2.5 relative before:h-0.5 before:w-2 before:bg-palette-dark-slate before:absolute before:left-0 before:top-3 after:h-3 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0">{postContent.post.publishDateTime.date} {postContent.post.publishDateTime.time}</span>
                        </div>

                        {postContent.post.unpublish && (
                            <div className="flex flex-col">
                                <span className="text-sm pl-4.5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:left-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0 after:bottom-0">Unpublish Date</span>
                                <span className="pl-2.5 relative before:h-0.5 before:w-2 before:bg-palette-dark-slate before:absolute before:left-0 before:top-3 after:h-3 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0">{postContent.post.unpublishDateTime.date} {postContent.post.unpublishDateTime.time}</span>
                            </div>
                        )}

                        {postContent.post.preview && (
                            <div className="flex flex-col">
                                <span className="text-sm pl-4.5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:left-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0 after:bottom-0">Preview Message</span>
                                <span className="pl-2.5 relative before:h-0.5 before:w-2 before:bg-palette-dark-slate before:absolute before:left-0 before:top-3 after:h-3 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0">{postContent.post.previewMessage}</span>
                            </div>
                        )}

                        {postContent.post.recipients == "SHARE" && (
                            <div className="flex flex-col">
                                <span className="text-sm pl-4.5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:left-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0 after:bottom-0">Users</span>
                                <div className="pl-2.5 border-l-2 border-palette-dark-slate">
                                    {postContent.post.shareTo.map(user => <Badge className="mr-0.5">{user}</Badge>)}
                                </div>
                            </div>
                        )}
                    </>
                ): <div className="font-semibold text-zinc-300 text-xl">None post selected</div>}
            </div>
        </div>
    )
}