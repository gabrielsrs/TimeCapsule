import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"


export function Filter({ filterName, filterIcon, filterCheckbox=true, filterOptions=[] }){
    const [openFilter, setOpenFilter] = useState(false)

    function handleClickFilter() {
        setOpenFilter(!openFilter)
    }
    return (
        <div className="flex flex-col mb-1.5">
            <div className="max-w-full flex flex-1">
                <div className="flex items-center gap-1.5 cursor-pointer" onClick={handleClickFilter}>
                    {openFilter ? <ChevronUp size={16} />: <ChevronDown size={16}/>}
                    {filterIcon}
                    <span className="font-mono text-medium font-sm ">/{filterName}</span>
                </div>
            </div>
            <div className={openFilter ? "flex flex-col mt-1.5": "hidden"}>
                {filterOptions.map((item, index) => (
                    <div key={index} className="w-full flex items-center gap-1.5 pl-4">
                        {filterCheckbox && <Checkbox id={`${index}-${item}`} size={4} className="cursor-pointer"/>}
                        <Label htmlFor={`${index}-${item}`} className="w-full overflow-hidden cursor-pointer" title={typeof item == "string" && item}>
                            <span className="truncate text-sm font-normal">{item}</span>
                        </Label>
                    </div>
                ))}
            </div>
        </div>
    )
}