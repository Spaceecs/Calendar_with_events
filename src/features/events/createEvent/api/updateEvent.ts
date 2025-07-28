import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/shared";
import {UpdateEventPayload} from "@/entities";

export async function updateEvent(eventId: string, data: UpdateEventPayload) {
    // Приберемо поля, які undefined
    const cleanData = Object.fromEntries(
        Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    const docRef = doc(db, "events", eventId);
    await updateDoc(docRef, cleanData);
}