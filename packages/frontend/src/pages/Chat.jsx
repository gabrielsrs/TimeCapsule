import { useState } from "react"
import { DateMessage } from '../components/DateMessage.jsx'
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
    SendHorizontal,
    CalendarCheck2,
    Plus,
    Minus,
    Search,
} from "lucide-react"

export function Chat() {
    const [chatQuantity, setChatQuantity] = useState(0)
    const [postContent, setPostContent] = useState(false)
    
    
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
                    <span className="text-base">{chatQuantity}</span>
                    <span> ]</span>
                </div>
            </div>
            <div className="flex flex-col col-span-13 row-span-2">
                {postContent && (
                    <>
                        <div className="max-h-screen flex flex-col flex-1">
                            <Separator className="my-2"/>
                            <div className="flex flex-1 flex-col-reverse overflow-y-auto">
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
                                <Input className="h-14 pr-22 absolute" placeholder="Send your message"/>
                                <span title="Send" className="z-1"><SendHorizontal className="cursor-pointer mr-4"/></span>
                                <span title="Publish message" className="z-1"><DateMessage /></span>
                            </div>
                        </div>
                    
                        <div className="max-h-48 border-2 rounded-2xl p-4 my-4">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus iaculis risus et sem interdum vestibulum. Duis tristique felis sed est tincidunt lacinia. Vivamus porta lacinia magna, sed faucibus nulla egestas sed. Vivamus commodo, eros vitae laoreet convallis, diam felis efficitur arcu, a malesuada lorem urna eu sapien. Fusce mattis elit.</p>
                        </div>
                    </>
                )}

                <div className={`${postContent && "max-h-80"} flex-1 flex flex-col-reverse overflow-y-auto`}>
                    <Separator className="my-2"/>
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
                    <Separator className="my-2"/>

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
                    <Separator className="my-2"/>

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
                    <Separator className="my-2"/>

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
                    <Separator className="my-2"/>

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
                    <Separator className="my-2"/>

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
                    <Separator className="my-2"/>

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
                    <Separator className="my-2"/>

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
                    <Separator className="my-2"/>

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
                    <Separator className="my-2"/>

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
                    <Separator className="my-2"/>

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
                    <Separator className="my-2"/>
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
                <div className="flex justify-between items-center">
                    <span className="truncate">Hedigar</span>
                    <img className="size-8 bg-palette-dark-slate rounded-3xl p-0.5" src="" alt="" />
                </div>

                <div className="flex flex-col">
                    <span className="text-sm pl-4.5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:left-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0 after:bottom-0">Send in chat</span>
                    <span className="pl-2.5 relative before:h-0.5 before:w-2 before:bg-palette-dark-slate before:absolute before:left-0 before:top-3 after:h-3 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0">425 Messages</span>
                </div>

                <div className="flex flex-col">
                    <span className="text-sm pl-4.5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:left-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0 after:bottom-0">Send by user</span>
                    <span className="pl-2.5 relative before:h-0.5 before:w-2 before:bg-palette-dark-slate before:absolute before:left-0 before:top-3 after:h-3 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0">25 Messages</span>
                </div>

                <div className="flex flex-col">
                    <span className="text-sm pl-4.5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:left-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0 after:bottom-0">Recipient</span>
                    <span className="pl-2.5 relative before:h-0.5 before:w-2 before:bg-palette-dark-slate before:absolute before:left-0 before:top-3 after:h-3 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0">Personal</span>
                </div>

                <div className="flex flex-col">
                    <span className="text-sm pl-4.5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:left-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0 after:bottom-0">Create Date</span>
                    <span className="pl-2.5 relative before:h-0.5 before:w-2 before:bg-palette-dark-slate before:absolute before:left-0 before:top-3 after:h-3 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0">2025-07-11 9:33:39 PM</span>
                </div>

                <div className="flex flex-col">
                    <span className="text-sm pl-4.5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:left-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0 after:bottom-0">Publish Date</span>
                    <span className="pl-2.5 relative before:h-0.5 before:w-2 before:bg-palette-dark-slate before:absolute before:left-0 before:top-3 after:h-3 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0">2025-07-11 9:33:39 PM</span>
                </div>

                <div className="flex flex-col">
                    <span className="text-sm pl-4.5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:left-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0 after:bottom-0">Unpublish Date</span>
                    <span className="pl-2.5 relative before:h-0.5 before:w-2 before:bg-palette-dark-slate before:absolute before:left-0 before:top-3 after:h-3 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0">2025-07-11 9:33:39 PM</span>
                </div>

                <div className="flex flex-col">
                    <span className="text-sm pl-4.5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:left-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0 after:bottom-0">Preview Message</span>
                    <span className="pl-2.5 relative before:h-0.5 before:w-2 before:bg-palette-dark-slate before:absolute before:left-0 before:top-3 after:h-3 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0">Malesuada lorem urna eu sapien. Fusce mattis elit.</span>
                </div>

                <div className="flex flex-col">
                    <span className="text-sm pl-4.5 relative before:h-0.5 before:w-4 before:bg-palette-dark-slate before:absolute before:left-0 before:top-2.5 after:h-2.5 after:w-0.5 after:bg-palette-dark-slate after:absolute after:left-0 after:bottom-0">Users</span>
                    <div className="pl-2.5 border-l-2 border-palette-dark-slate">
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
        </div>
    )
}