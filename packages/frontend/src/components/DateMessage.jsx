"use client"

import { useState } from "react"
import { CalendarCheck2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DateMessage() {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState(undefined)

  return (
    <div className="flex gap-1 select-none">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="none"
            size="icon"
            className="[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-6 cursor-pointer"
          >
            <CalendarCheck2 className="cursor-pointer"/>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-auto overflow-hidden p-0" align="start">
            <div className="flex flex-col m-2">
                <span className="px-4 mb-2 font-mono">Message Date</span>
                <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setDate(date)
                    }}
                    disabled={(date) =>
                      date < new Date()
                    }
                    className="select-none"
                />
                <Input
                    type="time"
                    id="time-picker-publish"
                    step="1"
                    defaultValue="00:00:00"
                    className="mx-4 w-auto bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none select-none"
                    />
            </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
