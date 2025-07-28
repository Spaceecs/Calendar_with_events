import { FullEvent, SmallEvent } from "@/entities";

export function convertFullToSmallEvents(events: FullEvent[]): SmallEvent[] {
    return events.map(e => {
        let color = "";

        switch (e.priority) {
            case 3:
                color = "#e74c3c"; // high
                break;
            case 2:
                color = "#f39c12"; // medium
                break;
            case 1:
                color = "#27ae60"; // low
                break;
            default:
                color = "#3498db"; // default
        }

        return {
            id: e.id,
            userId: e.userId,
            title: e.title,
            start: e.startDate,
            end: e.startDate,
            allDay: e.allDay,
            priority: e.priority,
            color: color,
        };
    });
}
