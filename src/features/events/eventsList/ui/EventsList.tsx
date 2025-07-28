import {EventCard, FullEvent} from "@/entities";

type EventsListProps = {
    events: FullEvent[];
    onDelete: (id: string) => void;
};

export function EventsList({ events, onDelete }: EventsListProps) {
    return (
        <ul className="space-y-4">
            {events.map((ev) => (
                <EventCard
                    key={ev.id}
                    id={ev.id}
                    userId={ev.userId}
                    title={ev.title}
                    description={ev.description}
                    startDate={ev.startDate}
                    startTime={ev.startTime}
                    allDay={ev.allDay}
                    priority={ev.priority}
                    onDelete={() => onDelete(ev.id.toString())}
                />
            ))}
        </ul>
    );
}
