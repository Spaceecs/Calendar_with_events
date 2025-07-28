import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/shared";

export async function deleteEvent(eventId: string): Promise<void> {
    try {
        const docRef = doc(db, "events", eventId);
        await deleteDoc(docRef);
        console.log(`Event with id=${eventId} deleted successfully.`);
    } catch (error) {
        console.error("Error deleting event:", error);
        throw error;
    }
}
