'use client';
import {useRouter} from "next/navigation";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'

export default function Home() {
    const router = useRouter();
    return (
        <div className="w-full h-full px-30 py-10">
            <FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
                weekends={true} events={[
                    { title: 'event 1', date: '2025-07-28' },
                    { title: 'event 2', date: '2025-07-29' }
            ]}
                contentHeight="auto"
                expandRows={true}
            />
        </div>

    );
}
