import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"


export function Filter({ filterName, filterCheckbox=true, filterOptions=[] }){
    const [openFilter, setOpenFilter] = useState(false)

    function handleClickFilter() {
        setOpenFilter(!openFilter)
    }
    return (
        <div className="flex flex-col">
            <div className="flex">
                <div className="flex gap-1.5 cursor-pointer" onClick={handleClickFilter}>
                    {openFilter ? <ChevronUp />: <ChevronDown />}
                    <span>/ {filterName}</span>
                </div>
            </div>
            <div className={openFilter ? "flex flex-col": "hidden"}>
                {filterOptions.map((item, key) => (
                    <div key={key} className="flex gap-1.5">
                        {filterCheckbox && <Checkbox />}
                        <span>{item}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}