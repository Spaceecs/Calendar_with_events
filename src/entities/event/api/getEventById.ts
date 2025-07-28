import { doc, getDoc } from "firebase/firestore";
import { db } from "@/shared";
import { FullEvent } from "@/entities";

export async function getEventById(eventId: string): Promise<FullEvent> {
    const docRef = doc(db, "events", eventId);
    const snap = await getDoc(docRef);
    console.log(snap)
    if (!snap.exists()) throw new Error("Event not found");
    return { id: snap.id, ...(snap.data() as Omit<FullEvent, 'id'>) };
}
