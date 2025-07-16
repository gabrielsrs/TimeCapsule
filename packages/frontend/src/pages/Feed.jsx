import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPosts, getUser } from "../utils/fetch-data.js"
import { Filter } from "../components/ui/Filter.jsx"
import { DateFilter } from "../components/ui/DateFilter.jsx"
import { PublishDate } from "../components/PublishDate.jsx"
import { DropdownMenuSelect } from '../components/DropdownMenuSelect.jsx'
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
    CalendarCheck2,
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

export function Feed() {
    const [feedQuantity, setFeedQuantity] = useState(0)
    const [previewMessage, setPreviewMessage] = useState(false)
    const [recipients, setRecipients] = useState("Private")
    const [sharePost, setSharePost] = useState(false)
    const [onSearch, setOnSearch] = useState(false)
    const [searchUsers, setSearchUsers] = useState([
        {id: "123", username: "Angelico", profilePicture: "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-profile-picture-business-profile-woman-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-1340.jpg?semt=ais_hybrid&w=740"},
        {id: "312", username: "Rafa", profilePicture: "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-profile-picture-business-profile-woman-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-1340.jpg?semt=ais_hybrid&w=740"},
        {id: "434", username: "Ca", profilePicture: "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-profile-picture-business-profile-woman-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-1340.jpg?semt=ais_hybrid&w=740"},
        {id: "543", username: "Gar", profilePicture: "https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-profile-picture-business-profile-woman-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-1340.jpg?semt=ais_hybrid&w=740"},
        {id: "643", username: "te", profilePicture: ""}
    ])
    const [selectedSearchedUsers, setSelectedSearchedUsers] = useState([])
    const [mediaLink, setMediaLink] = useState(false)
    const [mediaLinkList, setMediaLinkList] = useState([{link: "test", state: false}, {link: "test", state: false}, {link: "test", state: false}, {link: "test", state: false}])
    const [postContent, setPostContent] = useState(false)
    const [postMessage, setPostMessage] = useState(false)
    const [dateFrom, setDateFrom] = useState(undefined)
    const [dateTo, setDateTo] = useState(undefined)

    // const { data: posts } = useQuery({
    //     queryKey: ['posts'],
    //     queryFn: getPosts
    // })

    // const { data: user } = useQuery({
    //     queryKey: ['users'],
    //     queryFn: () => getUser({userId: ""})
    // })
    
    // console.log(posts)
    // console.log(user)

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
        setDateFrom(undefined)
        setDateTo(undefined)
    }

    useEffect(() => {
        recipients != "Share" && setSharePost(false)
    },[recipients])

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
                    <span className="text-base">{feedQuantity}</span>
                    <span> ]</span>
                </div>
            </div>
            <div className="col-span-13">
                <form className="relative border-2 rounded-3xl p-4 ml-4" onSubmit={event => event.preventDefault()}>
                    <div className="block mb-2">
                        <div className="inline py-0.5 pr-2 outline-none" contentEditable="true" onInput={event => blockText(event, 80)} onBlur={event => addTextPlaceholder(event, "Title")}>Title</div>
                        <div className="inline py-0.5 px-2 border-l-2 outline-none" contentEditable="true" onInput={event => blockText(event, 2000)} onBlur={event => addTextPlaceholder(event, "Content")}>Content</div>
                        {previewMessage && (
                            <div className="inline py-0.5 px-2 border-l-2 outline-none" contentEditable="true" onInput={event => blockText(event, 100)} onBlur={event => addTextPlaceholder(event, "Preview message")}>Preview message</div>
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
                                dropdownOptions={["Private", "Share", "Public"]}
                                defaultOption={"Private"}
                                position={recipients}
                                setPosition={setRecipients}
                            />
                            <PublishDate/>
                            <Button className="cursor-pointer ml-1.5">Send</Button>
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
                        <Search size={14} className="cursor-pointer"/>
                    </div>
                    <span className="text-sm cursor-pointer" onClick={() => cleanFilter()}>Clean Filters</span>
                </div>
                <Separator className="my-2"/>
                <div className="flex w-full justify-between gap-2">
                    <div>
                        <Filter filterName={"recipients"} filterIcon={<MailQuestionMark size={16}/>} filterOptions={["Personal", "Share", "Public"]}/>
                        <Filter filterName={"publish date"} filterIcon={<Calendar size={16}/>} filterCheckbox={false} filterOptions={[
                            <div className="flex gap-2 items-end mb-4">
                                <DateFilter text={"From"} date={dateFrom} setDate={setDateFrom} align={"start"}/>
                                <DateFilter text={"To"} date={dateTo} setDate={setDateTo} align={"end"}/>
                            </div>
                        ]}/>
                    </div>
                    <div className="w-[185px] max-w-[185px]">
                        <Filter filterName={"users"} filterIcon={<Users size={16}/>} filterOptions={["User1ggggggggggggggggggggggggggggggggggggggggggggggggggg", "User2", "User3", "User4", "User5", "User6"]}/>
                    </div>
                </div>
            </form>
            <div className="col-span-13">
                <div className="flex">
                    <span className="flex-5">/ Publish Date</span>
                    <span className="flex-20">/ Title</span>
                    <span className="flex-4">/ Recipient</span>
                    <span className="flex-6">/ User</span>
                    <span className="w-6"></span>
                </div>
                <Separator className="my-2"/>
                <div>
                    <div className="flex items-center cursor-pointer" onClick={()  => setPostContent(!postContent)}>
                        <div className="flex flex-col flex-5 items-start">
                            <div className="flex items-center">
                                <div className="bg-palette-dark-slate left-0 size-1.5 mr-2.5"></div>
                                <span title={!postContent && "9:33:39 PM"}>2025-07-11</span>
                            </div>
                            {postContent && (<span className="ml-4">9:33:39 PM</span>)}
                        </div>
                        <div className={`flex-20 items-center ${!postContent && "truncate"}`}>
                            <span className="text-2xl font-normal ">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit</span>
                        </div>
                        <div className="flex-4 items-center">
                            <span className="bg-palette-grey/10 text-sm border border-palette-grey/30 py-0.5 px-1 rounded-sm">Personal</span>
                        </div>
                        <div className="flex-6">
                            <span>@Hedigar</span>
                        </div>
                        <div className="right-0 ml-2">
                            {postContent ? <Minus size={16}/>: <Plus size={16}/>}
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
                <Separator className="my-2"/>

                <div>
                    <div className="flex items-center cursor-pointer" onClick={()  => setPostContent(!postContent)}>
                        <div className="flex flex-col flex-5 items-start">
                            <div className="flex items-center">
                                <div className="bg-palette-dark-slate left-0 size-1.5 mr-2.5"></div>
                                <span title={!postContent && "9:33:39 PM"}>2025-07-11</span>
                            </div>
                            {postContent && (<span className="ml-4">9:33:39 PM</span>)}
                        </div>
                        <div className={`flex-20 items-center ${!postContent && "truncate"}`}>
                            <span className="text-2xl font-normal ">Neque porro quisquam est qui dolorem </span>
                        </div>
                        <div className="flex-4 items-center">
                            <span className="bg-palette-grey/10 text-sm border border-palette-grey/30 py-0.5 px-1 rounded-sm">Personal</span>
                        </div>
                        <div className="flex-6">
                            <span>@Hedigar</span>
                        </div>
                        <div className="right-0 ml-2">
                            {postContent ? <Minus size={16}/>: <Plus size={16}/>}
                        </div>
                    </div>
                    {postContent && (
                        <div className="flex mt-4">
                            <div className="flex-25">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus iaculis risus et sem interdum vestibulum. Duis tristique felis sed est tincidunt lacinia. Vivamus porta lacinia magna, sed faucibus nulla egestas sed. Vivamus commodo, eros vitae laoreet convallis, diam felis efficitur arcu, a malesuada lorem urna eu sapien. Fusce mattis elit.</p>
                                <div></div>
                                {postMessage && (
                                    <div>
                                        <Separator className="my-2"/>
                                        <div className="h-48 flex flex-col-reverse overflow-y-auto">
                                            <div className="w-fit flex-col">
                                                <div className="flex justify-between">
                                                    <span className="text-sm pl-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:left-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0 after:bottom-0">20</span>
                                                    <span className="text-sm pr-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:right-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:right-0 after:bottom-0">Hedigar</span>
                                                </div>
                                                <div className="w-fit px-2.5 border-x-2 border-palette-dark-slate">
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                                </div>
                                            </div>

                                            <div className="w-fit flex-col">
                                                <div className="flex justify-between">
                                                    <span className="text-sm pl-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:left-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0 after:bottom-0">21</span>
                                                    <span className="text-sm pr-5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:right-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:right-0 after:bottom-0">Hedigar</span>
                                                </div>
                                                <div className="w-fit px-2.5 border-x-2 border-palette-dark-slate">
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
                                            </div>
                                        </div>
                                        <div className="h-11 flex justify-end items-center relative mt-2">
                                            <Input className="pr-14 absolute" placeholder="Send your message"/>
                                            <span title="Publish message" className="z-1"><SendHorizontal className="cursor-pointer mr-1"/></span>
                                            <span title="Publish message" className="z-1"><CalendarCheck2 className="cursor-pointer mr-1"/></span>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col flex-10 justify-start">
                                <div className="flex justify-between">
                                    <div className="flex items-center gap-1">
                                        <span className="select-none" title="Message"  onClick={() => setPostMessage(!postMessage)}><MessageCircle className="cursor-pointer"/></span>
                                        <span title="Go to chat"><MessageSquareShare className="cursor-pointer"/></span>
                                        <span title="Edit"><SquarePen className="cursor-pointer"/></span>
                                        <span title="Remove"><Trash2 className="cursor-pointer"/></span>
                                    </div>
                                    <div className="flex items-center">
                                        <span>Hedigar</span>
                                        <img className="size-8 bg-palette-dark-slate rounded-3xl p-0.5" src="" alt="" /> {/* user-picture */}
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-sm pr-4.5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:right-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:right-0 after:bottom-0">Unpublish date</span>
                                    <span className="pr-2.5 relative before:h-0.5 before:w-2 before:bg-palette-dark-slate before:absolute before:right-0 before:top-3 after:h-3 after:w-0.5 after:bg-palette-dark-slate after:absolute after:right-0">2025-07-11 9:33:39 PM</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-sm pr-4.5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:right-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:right-0 after:bottom-0">Users</span>
                                    <div className="pr-2.5 border-r-2 border-palette-dark-slate">
                                        <Badge className="mr-0.5">Gabriel Souza</Badge>
                                        <Badge className="mr-0.5">Gabriel Reiz</Badge>
                                        <Badge className="mr-0.5">Gar</Badge>
                                        <Badge className="mr-0.5">GaRReiz</Badge>
                                        <Badge className="mr-0.5">Hyuru</Badge>
                                        <Badge className="mr-0.5">Rayna</Badge>
                                        <Badge className="mr-0.5">Angelico del Monte Pereira Santos</Badge>
                                    </div>
                                </div>
                            </div>
                            <span className="w-6"></span>
                        </div>
                    )}
                </div>
                <Separator className="my-2"/>
            </div>
        </div>
    )
}