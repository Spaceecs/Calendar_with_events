import { EventInput } from '@fullcalendar/core';

export type SmallEvent = EventInput & {
    id: string;
    userId: string;
    title: string;
    start: string;
    end?: string;
    allDay?: boolean;
    color: string;
};

export type FullEvent = {
    id: string;
    userId: string;
    title: string;
    description: string;
    startDate: string;
    startTime: string;
    endDate?: string | null;
    endTime?: string | null;
    allDay: boolean;
    priority: number;
};

export type UpdateEventPayload = {
    title?: string;
    description?: string;
    startDate?: string | null;
    startTime?: string;
    endDate?: string | null;
    endTime?: string | null;
    allDay?: boolean;
    priority?: number;
};

