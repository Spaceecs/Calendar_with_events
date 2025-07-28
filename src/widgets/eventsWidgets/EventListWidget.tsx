'use client'

import { EventsList } from "@/features/events/eventsList/ui/EventsList";
import { Button } from "@/shared";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FullEvent } from "@/entities";
import { getAllEvents, getEventsByDate, deleteEvent } from "@/entities";

export function EventListWidget() {
    const searchParams = useSearchParams();
    const date = searchParams.get('date');
    const router = useRouter();

    const [events, setEvents] = useState<FullEvent[]>([]);
    const [loading, setLoading] = useState(false);
    console.log(date)

    useEffect(() => {
        async function fetchEvents() {
            setLoading(true);
            try {
                if (date) {
                    const filteredEvents = await getEventsByDate(date);
                    setEvents(filteredEvents);
                } else {
                    const allEvents = await getAllEvents();
                    setEvents(allEvents);
                }
            } catch (error) {
                console.error("Failed to load events:", error);
                setEvents([]);
            } finally {
                setLoading(false);
            }
        }
        fetchEvents();
    }, [date]);

    const handleDelete = async (id: string) => {
        const confirmed = confirm("Are you sure you want to delete this event?");
        if (!confirmed) return;

        try {
            await deleteEvent(id);
            setEvents(prev => prev.filter(ev => ev.id !== id));
        } catch (err) {
            console.error("Failed to delete event", err);
            alert("Failed to delete event.");
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">
                Events {date ? `on ${date}` : "for all dates"}
            </h1>

            {loading ? (
                <p>Loading events...</p>
            ) : events.length > 0 ? (
                <EventsList events={events} onDelete={handleDelete} />
            ) : (
                <p>No events found {date ? `for date ${date}` : "for any date"}.</p>
            )}

            <Button type="button" onClick={() => router.push("/events/create")}>
                Create event
            </Button>
        </div>
    );
}
