import { getDocs, collection, Timestamp } from "firebase/firestore";
import { db } from "@/shared";
import { FullEvent } from "@/entities";

function timestampToDateAndTime(ts: Timestamp) {
    const dateObj = ts.toDate();
    const dateStr = dateObj.toISOString().split("T")[0]; // yyyy-mm-dd
    const timeStr = dateObj.toISOString().split("T")[1].substring(0, 5); // HH:mm
    return { dateStr, timeStr };
}

export const getAllEvents = async (): Promise<FullEvent[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const events: FullEvent[] = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();

            // Конвертація Timestamp у строки
            const { dateStr: startDate, timeStr: startTime } = timestampToDateAndTime(data.start);
            let endDate: string | null = null;
            let endTime: string | null = null;
            if (data.end) {
                const endTs = data.end as Timestamp;
                const convertedEnd = timestampToDateAndTime(endTs);
                endDate = convertedEnd.dateStr;
                endTime = convertedEnd.timeStr;
            }

            events.push({
                id: doc.id,
                userId: data.userId,
                title: data.title,
                description: data.description,
                startDate,
                startTime,
                endDate,
                endTime,
                allDay: data.allDay,
                priority: data.priority,
            });
        });

        return events;
    } catch (error) {
        console.error("Помилка при отриманні подій:", error);
        return [];
    }
};
