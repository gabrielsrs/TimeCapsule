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
    SendHorizontal,
    SquarePen,
    Trash2
} from "lucide-react"

export function Feed() {
    const [feedQuantity, setFeedQuantity] = useState(0)
    const [previewMessage, setPreviewMessage] = useState(false)
    const [recipients, setRecipients] = useState("Private")
    const [sharePost, setSharePost] = useState(false)
    const [mediaLink, setMediaLink] = useState(false)
    const [postContent, setPostContent] = useState(false)
    const [postMessage, setPostMessage] = useState(false)
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

    useEffect(() => {
        recipients != "Share" && setSharePost(false)
    },[recipients])

    return (
        <div className="grid grid-cols-18 grid-rows-auto gap-4 mt-12 p-4">
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
                <div className="relative border-2 rounded-3xl p-4 ml-4">
                    <div className="flex mb-2">
                        <div className="py-0.5 pr-2">Title</div>
                        <div className="py-0.5 px-2 border-l-2">Content</div>
                        {previewMessage && (
                            <div className="py-0.5 px-2 border-l-2">Preview message</div>
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
                        <div className="flex w-full relative mt-4">
                            <div>Search for users to share</div>
                            <div className="absolute right-0 py-0.5 px-2 border-l-2"><Plus /></div>
                        </div>
                        <div className="w-full mt-4">
                            <Separator/>
                            <div className="flex py-1.5">
                                <div className="flex"><Plus /><span>Gabriel Souza</span></div>
                            </div>
                        </div>
                        </>
                    )}
                    {mediaLink && (
                        <div className="flex w-full relative mt-4">
                            <div>Add media link here</div>
                            <div className="absolute right-0 py-0.5 px-2 border-l-2"><Plus /></div>
                        </div>
                    )}
                </div>
            </div>
            <div className="col-span-5">
                <div className="flex justify-between">
                    <span>/ Filters</span>
                    <span>/ Clean Filters</span>
                </div>
                <Separator className="my-2"/>
                <div className="flex w-full gap-2">
                    <div className="w-[250px]">
                        <Filter filterName={"recipients"} filterOptions={["Personal", "Share", "Public"]}/>
                        <Filter filterName={"date"} filterCheckbox={false} filterOptions={[<DateFilter state={"Publish"}/>, <DateFilter state={"Unpublish"}/>]}/>
                    </div>
                    <div className="flex-1">
                        <Filter filterName={"users"} filterOptions={["User1", "User2", "User3", "User4", "User5", "User6"]}/>
                    </div>
                </div>
            </div>
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