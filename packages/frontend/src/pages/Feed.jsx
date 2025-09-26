import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useNavigate  } from "react-router";
import { getPosts, getUser, createPosts, createMetadata } from "../utils/fetch-data.js"
import { Filter } from "../components/ui/Filter.jsx"
import { DateFilter } from "../components/ui/DateFilter.jsx"
import { PublishDate } from "../components/PublishDate.jsx"
import { DropdownMenuSelect } from '../components/DropdownMenuSelect.jsx'
import { DateMessage } from '../components/DateMessage.jsx'
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
    Link,
    Eye,
    EyeOff,
    AtSign,
    MailQuestionMark,
    Plus,
    Minus,
    MessageCircle,
    MessageSquareShare,
    Calendar,
    Users,
    SendHorizontal,
    SquarePen,
    Trash2,
    Search,
    ChevronRight,
    ChevronLeft,
    Check
} from "lucide-react"

import { useSocket } from "../context/SocketProvider.jsx"
import { useSession } from "../context/SessionProvider.jsx"

export function Feed() {
    const [onSearch, setOnSearch] = useState(false)
    const [searchUsers, setSearchUsers] = useState([
        {id: "123", username: "Angelico", profilePicture: "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-profile-picture-business-profile-woman-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-1340.jpg?semt=ais_hybrid&w=740"},
        {id: "312", username: "Rafa", profilePicture: "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-profile-picture-business-profile-woman-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-1340.jpg?semt=ais_hybrid&w=740"},
        {id: "434", username: "Ca", profilePicture: "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-profile-picture-business-profile-woman-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-1340.jpg?semt=ais_hybrid&w=740"},
        {id: "543", username: "Gar", profilePicture: "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-profile-picture-business-profile-woman-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-1340.jpg?semt=ais_hybrid&w=740"},
        {id: "643", username: "te", profilePicture: ""}
    ])
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
    const [postContent, setPostContent] = useState(false)
    const [messages, setMessages] = useState([])
    const [postMessage, setPostMessage] = useState(false)
    const [session, user] = useSession()
    const { socketClient } = useSocket()

    // create post
    const [previewMessage, setPreviewMessage] = useState(false)
    const [sharePost, setSharePost] = useState(false)
    const [mediaLink, setMediaLink] = useState(false)
    const [recipients, setRecipients] = useState("Personal")
    const [selectedSearchedUsers, setSelectedSearchedUsers] = useState([])
    const [mediaLinkList, setMediaLinkList] = useState([{link: "https://example.com/", state: false}, {link: "https://example.com/", state: false}, {link: "https://example.com/", state: false}, {link: "https://example.com/", state: false}])
    const [publishDatetime, setPublishDatetime] = useState({date: new Date(), time: undefined})
    const [unpublishDatetime, setUnpublishDatetime] = useState({date: undefined, time: undefined})
    const [createPostData, setCreatePostData] = useState(undefined)

    // filter
    const [filter, setFilter] = useState([])

    const navigate = useNavigate()

    const { status, data: postsData } = useQuery({
        queryKey: ['posts', filter],
        queryFn: () => getPosts(filter)
    })


    const handleLoadMessage = (messageObj) => {
        setMessages([...messageObj]);
    }

    const handleMessage = (messageObj) => {
        setMessages(previousMessages => [...previousMessages, messageObj]);
    }

    // const { data: user } = useQuery({
    //     queryKey: ['users'],
    //     queryFn: () => getUser({userId: ""})
    // })
    
    // console.log(posts)
    // console.log(user)

    const postCreate = useMutation({
        mutationFn: createPosts,
    })

    const addToChat  = useMutation({
        mutationFn: createMetadata,
        onSuccess: () => {
            console.log("deu certo")

            return navigate("/chat")
        },
        onError: () => {
            console.log("deu merda")

            return toast("Error when redirect this post to chat", {
            description: "You wanna to go to chat ether way?",
            action: {
                label: "Go to chat",
                onClick: () =>  navigate("/chat"),
            },
        })
        }
        
    })

    // useEffect(() => {   
    //         socketClient.onMessage(messageObj => setMessages(previousMessages => [...previousMessages, messageObj]))
    //         // Optionally clean up listener
    //         return () => socketClient.off("status", console.log)
    //     }, [])

    function handlePreviewMessage(){
        setPreviewMessage(!previewMessage)
    }

    function handleSharePost(){
        if (mediaLink) {
            setMediaLink(false)
        }
        setSharePost(!sharePost)
    }

    function handleMediaLink(){
        if (sharePost) {
            setSharePost(false)
        }
        setMediaLink(!mediaLink)
    }

    function cleanFilter() {
        document.querySelector("#filter").reset()
        setFilter([])
    }

    useEffect(() => {
        recipients != "Share" && setSharePost(false)
    },[recipients])

    function sendMessage(event, postId) {
        const inputMessage = event.target.closest("div").firstChild
        const message = inputMessage.value.trim()

        if(message){
            socketClient.emitMessage({postId, message: message})
            inputMessage.value = ""
        }


    }

    function blockText(event, max=0) {
        const el = event.currentTarget
        const currentText = el.textContent

        if (currentText.length > max) {
            const selection = window.getSelection()
            const range = document.createRange()

            el.textContent = currentText.slice(0, max)

            range.selectNodeContents(el)
            range.collapse(false)
            selection.removeAllRanges()
            selection.addRange(range)
        }
    }

    function addTextPlaceholder(event, defaultText="") {
        const el = event.currentTarget

        if (el.textContent.length == 0) {
            el.textContent = defaultText
        }
    }

    function changeMediaLinkList({ link="", state=undefined }, index) {
        setMediaLinkList(listLink => {
            const newList = [...listLink]
            const item = newList[index]

            if(link) item.link = link
            if (state != undefined) item.state = state

            newList[index] = item
            return newList
        })
    }

    function searchUsersToShare(event) {
        if(event.target.value) {
            setOnSearch(true)
        } else {
            setOnSearch(false)
        }
    }

    function addUser(event) {
        const target = event.target.dataset.slot

        if (target == "button") {
            setSelectedSearchedUsers(selectedUsers => [...selectedUsers, searchUsers[0]])
        }

        if (target == "badge") {
            const action = event.target.firstChild.dataset.action

            if(action == "add") {
                setSelectedSearchedUsers(selectedUsers => [...selectedUsers, ...searchUsers.filter(user => user.id == event.target.id)])
            } else if(action == "remove") {
                setSelectedSearchedUsers(selectedUsers => selectedUsers.filter(user => user.id != event.target.id))
            }
        }
    }

    function createPost(contentData){
        const title = contentData.querySelector('[data-entry="title"]').textContent
        const content = contentData.querySelector('[data-entry="content"]').textContent
        const previewMessageText = contentData.querySelector('[data-entry="preview-message"]')?.textContent

        const postData = {
            title: title != "Title"? title: undefined,
            content: content != "Content"? content: undefined,
            mediaUrls: mediaLinkList.map(link => link.link),
            preview: previewMessage,
            recipients: recipients.toUpperCase(),
        }

        previewMessage && (postData["previewMessage"] = previewMessageText != "Preview message"? previewMessageText: undefined)
        recipients == "Share" && (postData["shareTo"] = selectedSearchedUsers)

        const { date: publishDate, time: publishTime } = publishDatetime
        const { date: unpublishDate, time: unpublishTime } = unpublishDatetime
        
        if(publishTime) {
            const splitTime = publishTime.split(":")
            publishDate.setHours(splitTime[0])
            publishDate.setMinutes(splitTime[1])
            publishDate.setSeconds(splitTime[2])
        }
        postData["publishDate"] = publishDate.toISOString()
        
        if(unpublishDate) {
            postData["unpublish"] = true
            postData["unpublishDate"] = unpublishDate.toISOString()

            if(unpublishTime) {
                const splitTime = unpublishTime.split(":")
                unpublishDate.setHours(splitTime[0])
                unpublishDate.setMinutes(splitTime[1])
                unpublishDate.setSeconds(splitTime[2])
            }
        }

        postCreate.mutate(postData)
    }

    function handlePostContentView(event) {
        const postId = event.currentTarget.id

        const target = postContent.postId == postId
        setPostContent({ open: !target,  postId: !target && postId })
        postMessage && setPostMessage(!postMessage)
    }

    return (
        <div className="grid grid-cols-18 grid-rows-auto gap-4 pt-16 p-4">
            <div className="h-52 flex col-span-5 pt-14">
                <div>
                    <h1 className="text-[114px]/[100px] font-[fantasy] px-0.5">Feed</h1>
                    <div className="flex justify-between text-sm/2 font-semibold px-1.5">
                        <span>time capsule</span>
                        <span>chat</span>
                    </div>
                </div>
                <div className="text-xl/1 font-semibold ml-1">
                    <span>[ </span>
                    <span className="text-base">{status === 'success'? postsData.posts?.length: 0}</span>
                    <span> ]</span>
                </div>
            </div>
            <div className="col-span-13">
                <form className="relative border-2 rounded-3xl p-4 ml-4" onSubmit={event => event.preventDefault()}>
                    <div className="block mb-2">
                        <div className="inline py-0.5 pr-2 outline-none" data-entry="title" contentEditable="true" onInput={event => blockText(event, 80)} onBlur={event => addTextPlaceholder(event, "Title")}>Title</div>
                        <div className="inline py-0.5 px-2 border-l-2 outline-none" data-entry="content" contentEditable="true" onInput={event => blockText(event, 2000)} onBlur={event => addTextPlaceholder(event, "Content")}>Content</div>
                        {previewMessage && (
                            <div className="inline py-0.5 px-2 border-l-2 outline-none" data-entry="preview-message" contentEditable="true" onInput={event => blockText(event, 100)} onBlur={event => addTextPlaceholder(event, "Preview message")}>Preview message</div>
                        )}
                    </div>
                    <div className="flex justify-between items-center">
                        <div title="Media Link">
                            <Link onClick={handleMediaLink} className="cursor-pointer"/>
                        </div>
                        <div className="flex items-center gap-1 select-none">
                            {previewMessage 
                                ? <span title="Unset preview Message"><EyeOff className="cursor-pointer" onClick={handlePreviewMessage}/></span>
                                : <span title="Set preview Message"><Eye className="cursor-pointer" onClick={handlePreviewMessage}/></span>
                            }
                            {recipients == "Share" && <span title="Add users"><AtSign onClick={handleSharePost} className="cursor-pointer"/></span>}
                            <DropdownMenuSelect 
                                dropdownTrigger={<span title="Recipients"><MailQuestionMark className="cursor-pointer"/></span>}
                                title={"Recipients"}
                                dropdownOptions={["Personal", "Share", "Public"]}
                                defaultOption={"Personal"}
                                position={recipients}
                                setPosition={setRecipients}
                            />
                            <PublishDate dates={{publishDatetime, setPublishDatetime, unpublishDatetime, setUnpublishDatetime}}/>
                            <Button className="cursor-pointer ml-1.5" onClick={event => createPost(event.target.closest("form"))}>Send</Button>
                        </div>
                    </div>
                    {sharePost && recipients == "Share" && (
                        <>
                            <div className="w-full flex items-center relative pr-10 mt-4">
                                <Input className="min-w-48 border-none shadow-none focus-visible:border-none focus-visible:ring-[0]" placeholder="Search for users to share" onChange={(event) => searchUsersToShare(event)}/>
                                {selectedSearchedUsers.length > 0 && (
                                    <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale px-1">
                                        {selectedSearchedUsers.length > 0 && selectedSearchedUsers.slice(0, 3).map(user => {
                                            return (
                                                <Avatar>
                                                    <AvatarImage src={user.profilePicture} alt={user.username} />
                                                    <AvatarFallback>{user.username.slice(0, 1).toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                            )
                                        })}
                                        {selectedSearchedUsers.length > 3 && (
                                            <Avatar>
                                                <AvatarFallback>+{selectedSearchedUsers.length - 3}</AvatarFallback>
                                            </Avatar>
                                        )}                                    
                                    </div>
                                )}
                                <Button className="absolute right-0 py-0.5 px-2 border-l-2 cursor-pointer" onClick={(event) => addUser(event)}><Plus /></Button>
                            </div>
                            <div className="w-full mt-2">
                                <Separator/>
                                <div className="flex py-1.5">
                                    {onSearch? searchUsers.map(user => {
                                            const isSelected = selectedSearchedUsers.some(userSelected => userSelected.id == user.id)
                                            return (
                                                <Badge id={user.id} className="cursor-pointer mr-1" onClick={(event) => addUser(event)}>
                                                    {isSelected ? <Check size={14} data-action="remove"/>: <Plus size={14} data-action="add"/>}
                                                    {user.username}
                                                </Badge>
                                            )
                                        }): !selectedSearchedUsers.length? <span className="text-sm">None user selected</span>: selectedSearchedUsers.map(user => {
                                            return (
                                                <Badge id={user.id} className="cursor-pointer mr-1" onClick={(event) => addUser(event)}>
                                                    <Check size={14} data-action="remove"/>
                                                    {user.username}
                                                </Badge>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </>
                    )}
                    {mediaLink && (
                        <div className="w-full flex items-center relative mt-4">
                            {mediaLinkList.length > 0 && (
                                mediaLinkList.map((link, index) => {
                                    return (
                                        <div className={`${link.state? "w-full": "w-fit"} mr-0.5 flex border-2 rounded-sm`}>
                                            <div key={index} className="p-1 bg-palette-grey/30 cursor-pointer" title={link.link} onClick={() => {
                                                changeMediaLinkList({ state: !link.state }, index)
                                            }
                                            }>
                                                {link.state? <ChevronLeft size={16}/>: <ChevronRight size={16}/>}
                                            </div>
                                            {link.state && (
                                                <div className="flex flex-1 items-center gap-1">
                                                    <Input className="h-6 p-0 px-1 border-none shadow-none focus-visible:border-none focus-visible:ring-[0] text-sm" type="text" value={link.link} onChange={(e) => {
                                                        changeMediaLinkList({ link: e.target.value }, index)
                                                    }}/>
                                                    <Trash2 size={22} className="p-1 cursor-pointer" onClick={() => setMediaLinkList(linkList => linkList.filter((item, filterIndex) => item[filterIndex] =! item[index]))}/>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })
                            )}
                            <div className="flex flex-1" title={mediaLinkList.length >= 20 && "Max number of links reached"}>
                                <Input id="add-media-link" className="min-w-48 pr-12 border-none shadow-none focus-visible:border-none focus-visible:ring-[0]" placeholder="Add media link here" type="text"/>
                                <Button className="cursor-pointer absolute right-0 py-0.5 px-2 border-l-2" onClick={e => {
                                    const input = e.target.previousSibling.value
                                    if (input) {
                                        setMediaLinkList(linkList => [...linkList, {link: input, state: false}])
                                    }
                                }} disabled={!(mediaLinkList.length < 20)}><Plus /></Button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
            <form id="filter" className="col-span-5">
                <div className="flex justify-between items-center text-medium font-medium font-mono">
                    <div className="flex items-center gap-2">
                        <span>/Filters</span>
                    </div>
                    <span className="text-sm cursor-pointer" onClick={() => cleanFilter()}>Clean Filters</span>
                </div>
                <Separator className="my-2"/>
                <div className="flex w-full justify-between gap-2">
                    <div>
                        <Filter filterName={"recipients"} filterIcon={<MailQuestionMark size={16}/>} filterOptions={["Personal", "Shared", "Public"]} items={filter?.recipient} setFilter={setFilter}/>
                        <Filter filterName={"publish date"} filterIcon={<Calendar size={16}/>} filterCheckbox={false} filterOptions={[
                            <div className="flex gap-2 items-end mb-4">
                                <DateFilter text={"From"} filter={filter} setDateFilter={setFilter} align={"start"}/>
                                <DateFilter text={"To"} filter={filter} setDateFilter={setFilter} align={"end"}/>
                            </div>
                        ]}/>
                    </div>
                    <div className="w-[185px] max-w-[185px]">
                        <Filter filterName={"users"} filterIcon={<Users size={16}/>} filterOptions={["User1ggggggggggggggggggggggggggggggggggggggggggggggggggg", "User2", "User3", "User4", "User5", "User6"]} items={filter?.users} setFilter={setFilter}/>
                    </div>
                </div>
            </form>
            <div className="col-span-13">
                <div className="flex gap-2 font-mono">
                    <span className="flex-5">/ Publish Date</span>
                    <span className="flex-20">/ Title</span>
                    <span className="flex-4">/ Recipient</span>
                    <span className="flex-6">/ User</span>
                    <span className="w-6"></span>
                </div>
                <Separator className="my-2"/>

                {status === 'success' && postsData.posts?.map(postData => {
                    const isThisPostOpen = postContent.open && postData.id == postContent.postId
                    const recipients = postData.recipients.slice(0,1) + postData.recipients.slice(1,).toLowerCase()
                    const publishDateTime = date(new Date(postData.publishDate.slice(0,-1)))
                    const unpublishDateTime = postData.unpublish && date(new Date(postData.unpublishDate.slice(0,-1)))

                    function date(dateTime) {
                        const date = `${dateTime.getFullYear()}-${dateTime.getMonth()}-${dateTime.getDate()}`

                        const hours = dateTime.getHours() >= 12? {hour: dateTime.getHours() - 12, meridiemPeriod: "PM"}: {hour: dateTime.getHours(), meridiemPeriod: "AM"}
                        const time = `${hours.hour}:${dateTime.getMinutes()}:${dateTime.getSeconds()} ${hours.meridiemPeriod}`

                        return {date, time}
                    }

                    return (
                        <div key={postData.id}>
                            <div id={postData.id} className="flex items-center gap-2 cursor-pointer" onClick={event  => handlePostContentView(event)}>
                                <div className="flex flex-col flex-5 items-start">
                                    <div className="flex items-center">
                                        <div className="bg-palette-dark-slate left-0 size-1.5 mr-2.5"></div>
                                        <span title={isThisPostOpen && publishDateTime.time}>{ publishDateTime.date }</span>
                                    </div>
                                    {isThisPostOpen && (<span className="ml-4">{ publishDateTime.time }</span>)}
                                </div>
                                <div className={`flex-20 items-center ${!isThisPostOpen && "truncate"}`}>
                                    <span className="text-2xl font-normal ">{ postData.title }</span>
                                </div>
                                <div className="flex-4 items-center">
                                    <span className="bg-palette-grey/10 text-sm border border-palette-grey/30 py-0.5 px-1 rounded-sm">{ recipients }</span>
                                </div>
                                <div className="flex-6">
                                    <span>@Hedigar</span>
                                </div>
                                <div className="right-0 ml-2">
                                    {isThisPostOpen ? <Minus size={16}/>: <Plus size={16}/>}
                                </div>
                            </div>
                            {isThisPostOpen && (
                                <div className="flex gap-2 mt-4">
                                    <div className="flex-25">
                                        <p>{ postData.content }</p>
                                        <div></div>
                                        {session && isThisPostOpen && postMessage && (
                                            <div>
                                                <Separator className="my-2"/>
                                                <div className="h-48 flex flex-col-reverse overflow-y-auto">
                                                    {messages.map((message, index) => {
                                                        return (
                                                            <div key={index} className={`w-fit flex-col ${message.userId == user.id && "self-end"}`}>
                                                                <div className="flex justify-between gap-4">
                                                                    <span className="text-sm pl-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:left-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0 after:bottom-0">20</span>
                                                                    <span className="text-sm pr-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:right-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:right-0 after:bottom-0">{ message.name }</span>
                                                                </div>
                                                                <div className="w-full px-2.5 border-x-[0.15rem] border-palette-dark-slate">
                                                                    <p>{ message.message }</p>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}

                                                    {/* <div className="w-fit max-w-[80%] flex-col">
                                                        <div className="flex justify-between">
                                                            <span className="text-sm pl-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:left-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0 after:bottom-0">20</span>
                                                            <span className="text-sm pr-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:right-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:right-0 after:bottom-0">Hedigar</span>
                                                        </div>
                                                        <div className="w-fit px-2.5 border-x-[0.15rem] border-palette-dark-slate">
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit adipiscing elit. Phasellus iaculis risus et sem interdum vestibulum. Duis tristique felis sed est tincidunt lacinia. Vivamus porta lacinia ma.</p>
                                                        </div>
                                                    </div>

                                                    <div className="w-fit max-w-[80%] flex-col self-end">
                                                        <div className="flex justify-between">
                                                            <span className="text-sm pl-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:left-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0 after:bottom-0">21</span>
                                                            <span className="text-sm pr-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:right-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:right-0 after:bottom-0">Hedigar</span>
                                                        </div>
                                                        <div className="w-fit px-2.5 border-x-2 border-palette-dark-slate">
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit adipiscing elit. Phasellus iaculis risus et sem interdum vestibulum. Duis tristique felis sed est tincidunt lacinia. Vivamus porta lacinia ma.</p>
                                                        </div>
                                                    </div>

                                                    <div className="w-fit flex-col">
                                                        <div className="flex justify-between">
                                                            <span className="text-sm pl-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:left-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0 after:bottom-0">22</span>
                                                            <span className="text-sm pr-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:right-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:right-0 after:bottom-0">Hedigar</span>
                                                        </div>
                                                        <div className="w-fit px-2.5 border-x-2 border-palette-dark-slate">
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                                        </div>
                                                    </div>

                                                    <div className="w-fit flex-col">
                                                        <div className="flex justify-between">
                                                            <span className="text-sm pl-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:left-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0 after:bottom-0">23</span>
                                                            <span className="text-sm pr-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:right-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:right-0 after:bottom-0">Hedigar</span>
                                                        </div>
                                                        <div className="w-fit px-2.5 border-x-2 border-palette-dark-slate">
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                                        </div>
                                                    </div>

                                                    <div className="w-fit flex-col">
                                                        <div className="flex justify-between">
                                                            <span className="text-sm pl-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:left-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0 after:bottom-0">24</span>
                                                            <span className="text-sm pr-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:right-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:right-0 after:bottom-0">Hedigar</span>
                                                        </div>
                                                        <div className="w-fit px-2.5 border-x-2 border-palette-dark-slate">
                                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                                        </div>
                                                    </div>

                                                    <div className="w-fit flex-col">
                                                        <div className="flex justify-between">
                                                            <span className="text-sm pl-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:left-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0 after:bottom-0">25</span>
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
                                                    <Input className="pr-14 absolute" placeholder="Send your message"/>
                                                    <span title="Publish message" className="z-1" onClick={event => sendMessage(event, postData.id)}><SendHorizontal className="cursor-pointer mr-1"/></span>
                                                    <span title="Publish message" className="z-1"><DateMessage /></span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col flex-10 justify-start">
                                        <div className="flex justify-between">
                                            <div className="flex items-center gap-1 mr-1">
                                                <Button variant="none" size="none" title="Message" className="select-none cursor-pointer" onClick={() => {
                                                    setMessages([])
                                                    socketClient.enterPostChat(postData.id)  
                                                    socketClient.off("message")
                                                    socketClient.onLoadMessages(handleLoadMessage)
                                                    socketClient.onMessage(handleMessage)
                                                    setPostMessage(!postMessage)
                                                }}><MessageCircle size={18}/></Button>
                                                <Button variant="none" size="none" title="Go to chat" className="size-5 cursor-pointer" onClick={() => addToChat.mutate(postData.id)}><MessageSquareShare size={18}/></Button>
                                                {user?.id == postData.authorId && (
                                                    <>
                                                        <Button variant="none" size="none" title="Edit" className="size-5 cursor-pointer" onClick={() => toast("Coming soon")}><SquarePen size={18}/></Button>
                                                        <Button variant="none" size="none" title="Remove" className="size-5 cursor-pointer" onClick={() => toast("Coming soon")}><Trash2 size={18}/></Button>
                                                    </>
                                                )}
                                            </div>
                                            <div className="flex items-center">
                                                <span className="px-1 max-w-48 truncate" title="">Hedigar</span>
                                                <img className="size-8 bg-palette-dark-slate rounded-3xl p-0.5" src="" alt="" /> {/* user-picture */}
                                            </div>
                                        </div>
                                        {postData.unpublish && (
                                            <div className="flex flex-col items-end">
                                                <span className="text-sm pr-4.5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:right-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:right-0 after:bottom-0">Unpublish date</span>
                                                <span className="pr-2.5 relative before:h-0.5 before:w-2 before:bg-palette-dark-slate before:absolute before:right-0 before:top-3 after:h-3 after:w-0.5 after:bg-palette-dark-slate after:absolute after:right-0">{unpublishDateTime.date} {unpublishDateTime.time}</span>
                                            </div>
                                        )}
                                        {postData.recipients == "SHARED" && (
                                            <div className="flex flex-col items-end">
                                                <span className="text-sm pr-4.5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:right-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:right-0 after:bottom-0">Users</span>
                                                <div className="pr-2.5 border-r-2 border-palette-dark-slate">
                                                    {postData.shareTo.map(user => <Badge className="mr-0.5">{user}</Badge>)}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <span className="w-6"></span>
                                </div>
                            )}
                            <Separator className="my-2"/>
                        </div>
                    )
                })}

                {/* <div>
                    <div className="flex items-center gap-2 cursor-pointer" onClick={event  => handlePostContentView(event)}>
                        <div className="flex flex-col flex-5 items-start">
                            <div className="flex items-center">
                                <div className="bg-palette-dark-slate left-0 size-1.5 mr-2.5"></div>
                                <span title={!postContent.open && "9:33:39 PM"}>2025-07-11</span>
                            </div>
                            {postContent.open && (<span className="ml-4">9:33:39 PM</span>)}
                        </div>
                        <div className={`flex-20 items-center ${!postContent.open && "truncate"}`}>
                            <span className="text-2xl font-normal ">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit</span>
                        </div>
                        <div className="flex-4 items-center">
                            <span className="bg-palette-grey/10 text-sm border border-palette-grey/30 py-0.5 px-1 rounded-sm">Personal</span>
                        </div>
                        <div className="flex-6">
                            <span>@Hedigar</span>
                        </div>
                        <div className="right-0 ml-2">
                            {postContent.open ? <Minus size={16}/>: <Plus size={16}/>}
                        </div>
                    </div>
                    <div className="flex mt-4">
                        <div className="flex-25">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus iaculis risus et sem interdum vestibulum. Duis tristique felis sed est tincidunt lacinia. Vivamus porta lacinia magna, sed faucibus nulla egestas sed. Vivamus commodo, eros vitae laoreet convallis, diam felis efficitur arcu, a malesuada lorem urna eu sapien. Fusce mattis elit.</p>
                        </div>
                        <div className="flex-10">casa</div>
                        <span className="w-6"></span>
                    </div>
                </div>
                <Separator className="my-2"/> */}

                
            </div>
        </div>
    )
}