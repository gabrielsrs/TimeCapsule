"use client"

import { useState } from "react"
import { CalendarCheck2, CalendarX2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function PublishDate({ dates: {
  publishDatetime,
  setPublishDatetime,
  unpublishDatetime,
  setUnpublishDatetime
} }) {
  const [publishOpen, setPublishOpen] = useState(false)
  const [unpublishOpen, setUnpublishOpen] = useState(false)
  const [open, setOpen] = useState(false)

  const today = new Date()
  today.setHours(0)
  today.setMinutes(0)
  today.setSeconds(0)
  today.setMilliseconds(0)

  return (
    <div className="flex gap-1 select-none">
      <Label htmlFor="date" title="Publish date" onClick={() => setPublishOpen(!publishOpen)}><CalendarCheck2 className="cursor-pointer"/></Label>
      <Label htmlFor="date" title="Unpublish date" onClick={() => setUnpublishOpen(!unpublishOpen)}><CalendarX2 className="cursor-pointer"/></Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="none"
            size="none"
            id="date"
            className=""
          >
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-auto overflow-hidden p-0" align="end">
          {publishOpen && (
            <div className="flex flex-col m-2">
                <span className="px-4 mb-2 font-mono">Publish Date</span>
                <Calendar
                    mode="single"
                    selected={publishDatetime.date}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setPublishDatetime(previous => ({date: date, time: previous.time}))
                    }}
                    disabled={(date) =>
                      date < today || unpublishDatetime.date && date >= unpublishDatetime.date
                    }
                    className="select-none"
                />
                <Input
                    type="time"
                    id="time-picker-publish"
                    step="1"
                    defaultValue="00:00:00"
                    onChange={(time) => {
                      setPublishDatetime(previous => ({date: previous.date, time: time.target.value}))
                    }}
                    className="mx-4 w-auto bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none select-none"
                    />
            </div>
          )}

          {unpublishOpen && (
            <div className="flex flex-col m-2 relative">
                <span className="px-4 mb-2 font-mono">Unpublish Date</span>
                <Calendar
                    mode="single"
                    selected={unpublishDatetime.date}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setUnpublishDatetime(previous => ({date: date, time: previous.time}))
                    }}
                    disabled={(date) =>
                      date <= today || publishDatetime.date && date <= publishDatetime.date
                    }
                    className="select-none"
                />
                <Input
                    type="time"
                    id="time-picker-unpublish"
                    step="1"
                    defaultValue="00:00:00"
                    onChange={(time) => {
                      setUnpublishDatetime(previous => ({date: previous.date, time: time.target.value}))
                    }}
                    className="mx-4 w-auto bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none select-none"
                    />
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
