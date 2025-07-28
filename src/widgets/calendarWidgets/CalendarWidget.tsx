'use client'

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction"
import { useEffect, useState, useRef } from "react";
import { convertFullToSmallEvents, SmallEvent } from "@/entities";
import { getAllEvents } from "@/entities/event/api/getAllEvents";
import { useRouter } from "next/navigation";
import {Button} from "@/shared";

export function CalendarWidget() {
    const [smallEvents, setSmallEvents] = useState<SmallEvent[]>([]);
    const router = useRouter();
    const calendarRef = useRef<FullCalendar | null>(null); // 👈 реф

    useEffect(() => {
        async function fetchEvents() {
            const res = await getAllEvents();
            setSmallEvents(convertFullToSmallEvents(res));
        }
        fetchEvents();
    }, []);

    const handleDateClick = (arg: { dateStr: string }) => {
        router.push(`/events?date=${arg.dateStr}`);
    };

    return (
        <div className="w-full h-full px-30 py-10">
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                events={smallEvents}
                contentHeight="auto"
                expandRows={true}
                dateClick={handleDateClick}
            />
            <Button type="button" onClick={() => router.push("/events")}>
                Go to events list
            </Button>
        </div>
    );
}
