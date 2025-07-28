import { FullEvent } from "@/entities";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/shared";

// Функція для створення дати в UTC (без зсуву часової зони)
function toUTCDate(dateStr: string, timeStr: string = "00:00"): Date {
    const [year, month, day] = dateStr.split("-").map(Number);
    const [hour, minute] = timeStr.split(":").map(Number);
    return new Date(Date.UTC(year, month - 1, day, hour, minute));
}

export async function createNewEvent(eventData: Omit<FullEvent, "id" | "userId">) {
    try {
        // Перевірка валідності дат
        if (isNaN(toUTCDate(eventData.startDate!, eventData.startTime || "00:00").getTime())) {
            throw new Error("Invalid start date or time");
        }
        if (
            eventData.endDate && eventData.endTime &&
            isNaN(toUTCDate(eventData.endDate, eventData.endTime).getTime())
        ) {
            throw new Error("Invalid end date or time");
        }

        const eventToSave = {
            ...eventData,
            start: Timestamp.fromDate(toUTCDate(eventData.startDate!, eventData.startTime || "00:00")),
            end: eventData.endDate && eventData.endTime
                ? Timestamp.fromDate(toUTCDate(eventData.endDate, eventData.endTime))
                : null,
        };

        // Видаляємо старі поля з рядками
        delete (eventToSave as any).startDate;
        delete (eventToSave as any).startTime;
        delete (eventToSave as any).endDate;
        delete (eventToSave as any).endTime;

        const docRef = await addDoc(collection(db, "events"), eventToSave);

        return docRef.id;
    } catch (error) {
        console.error("Error adding event: ", error);
        throw error;
    }
}
