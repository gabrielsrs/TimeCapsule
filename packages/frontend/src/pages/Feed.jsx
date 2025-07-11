import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPosts, getUser } from "../utils/fetch-data.js"
import { Filter } from "../components/ui/Filter.jsx"
import { DateFilter } from "../components/ui/DateFilter.jsx"
import { DropdownMenuSelect } from '../components/DropdownMenuSelect.jsx'
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
    Link,
    Eye,
    EyeOff,
    AtSign,
    MailQuestionMark,
    CalendarX2,
    CalendarCheck2,
    Plus
} from "lucide-react"




export function Feed() {
    const [feedQuantity, setFeedQuantity] = useState(0)
    const [previewMessage, setPreviewMessage] = useState(false)
    const [recipients, setRecipients] = useState("Private")
    const [sharePost, setSharePost] = useState(false)
    const [mediaLink, setMediaLink] = useState(false)
    const [postDate, setPostDate] = useState({publish: false, unpublish: false})
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
                            <span title="Publish date"><CalendarCheck2 className="cursor-pointer"/></span>
                            <span title="Unpublish date"><CalendarX2 className="cursor-pointer"/></span>
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
                                <div className="flex"><Plus /><span>Gabriel SOuza</span></div>
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
                    <span className="flex-1">/ Publish Date</span>
                    <span className="flex-4">/ Title</span>
                    <span className="flex-1">/ Recipient</span>
                    <span className="flex-1">/ User</span>
                </div>
                <Separator className="my-2"/>
            </div>
        </div>
    )
}