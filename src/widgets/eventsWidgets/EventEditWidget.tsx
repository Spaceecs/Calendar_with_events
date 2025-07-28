'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FullEvent } from '@/entities'
import { getEventById } from '@/entities/event/api/getEventById'
import {EventForm} from "@/features";

export function EventEditWidget() {
    const searchParams = useSearchParams()
    const id = searchParams.get('id') || "1"

    const [event, setEvent] = useState<FullEvent | null>(null)

    useEffect(() => {
        if (!id) return
        async function fetchEvent() {
            try {
                const ev = await getEventById(id)
                setEvent(ev)
            } catch (error) {
                console.error('Failed to fetch event', error)
            }
        }
        fetchEvent()
    }, [id])

    if (!id) return <p>No event ID provided</p>
    if (!event) return <p>Loading event data...</p>

    return (
        <div>
            <h1>Edit Event: {event.title}</h1>
            <EventForm event={event}/>
        </div>
    )
}
