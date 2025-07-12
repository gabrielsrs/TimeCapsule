import { useState } from "react"

export function Chat() {
    const [chatQuantity, setChatQuantity] = useState(0)
    
    return (
        <div className="grid grid-cols-18 grid-rows-auto gap-4 mt-12 p-4">
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
            <div className="col-span-13"></div>
        </div>
    )
}