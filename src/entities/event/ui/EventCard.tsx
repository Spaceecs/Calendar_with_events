import { eventProps } from "@/entities";

export function EventCard({ title, body, date }: eventProps) {
    return (
        <div className="bg-white shadow-md rounded-xl p-4 w-full max-w-md mb-4 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-500 mb-2">{date}</p>
            <p className="text-gray-700">{body}</p>
        </div>
    );
}
