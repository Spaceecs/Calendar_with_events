'use client'

import { FullEvent } from "@/entities";
import { format, parseISO } from "date-fns";
import { Button } from "@/shared";
import { useRouter } from "next/navigation";  // <-- імпорт

type EventCardProps = FullEvent & {
    onDelete?: () => void;
};

export function EventCard({
                              id,
                              title,
                              description,
                              startDate,
                              startTime,
                              endDate,
                              endTime,
                              priority,
                              onDelete,
                          }: EventCardProps) {
    const router = useRouter();  // <-- виклик хука

    const formatDateTime = (date: string | null | undefined, time?: string | null | undefined) => {
        if (!date) return "not specified";

        const safeDate: string = date ?? "1970-01-01";
        const safeTime: string = time ?? "00:00";

        const dateTimeStr = safeTime ? `${safeDate}T${safeTime}` : `${safeDate}T00:00`;
        return format(parseISO(dateTimeStr), "PPP p");
    };

    // Обробник для переходу на редагування
    const handleEdit = () => {
        if (!id) return;
        router.push(`/events/edit?id=${id}`);  // або будь-який твій роут для редагування
    };

    return (
        <div className="flex justify-between items-center bg-white shadow-lg rounded-xl p-6 w-full max-w-md mb-6 hover:shadow-lg transition-shadow border-black border-1">
            <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h3>

                <p className="text-sm text-gray-500 mb-4">
                    <strong>Start:</strong> {formatDateTime(startDate, startTime)}
                    <br />
                    <strong>End:</strong> {formatDateTime(endDate, endTime)}
                </p>

                <p className="text-gray-700 mb-4">{description || "No description provided"}</p>

                {priority !== undefined && (
                    <p className="text-gray-600 mb-4">
                        <strong>Priority:</strong>{" "}
                        {priority === 3
                            ? "High"
                            : priority === 2
                                ? "Medium"
                                : priority === 1
                                    ? "Low"
                                    : priority}
                    </p>
                )}
            </div>

            <div className="flex flex-col space-y-2">
                {onDelete && (
                    <Button onClick={onDelete}>
                        Delete
                    </Button>
                )}

                <Button onClick={handleEdit}>
                    Edit
                </Button>
            </div>
        </div>
    );
}
