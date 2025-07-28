import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/shared";
import { FullEvent } from "@/entities";

export async function getEventsByDate(date: string): Promise<FullEvent[]> {
    const start = Timestamp.fromDate(new Date(`${date}T00:00:00`));
    const end = Timestamp.fromDate(new Date(`${date}T23:59:59`));

    const eventsRef = collection(db, "events");
    const q = query(eventsRef, where("start", ">=", start), where("start", "<=", end));

    const querySnapshot = await getDocs(q);

    const events: FullEvent[] = [];
    querySnapshot.forEach(doc => {
        events.push({
            id: doc.id,
            ...doc.data(),
        } as FullEvent);
    });

    return events;
}
