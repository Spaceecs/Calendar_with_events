'use client'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import { eventSchema } from '../model/eventSchema'
import { FullEvent } from '@/entities'
import { Button, Label } from "@/shared"
import { useRouter, useSearchParams } from "next/navigation"
import { createNewEvent } from "../api/createNewEvent"
import { updateEvent } from "../api/updateEvent"

type FormValues = Omit<FullEvent, 'id' | 'userId'>

type Props = {
    event?: FullEvent
}

export function EventForm({ event }: Props) {
    const router = useRouter()
    const params = useSearchParams()

    const defaultDate = params.get("date") ?? new Date().toISOString().split("T")[0]

    const initialValues: FormValues = event
        ? {
            title: event.title,
            description: event.description,
            startDate: event.startDate,
            startTime: event.startTime,
            endDate: event.endDate ?? '',
            endTime: event.endTime ?? '',
            allDay: event.allDay,
            priority: event.priority,
        }
        : {
            title: '',
            description: '',
            startDate: defaultDate,
            startTime: '',
            endDate: '',
            endTime: '',
            allDay: false,
            priority: 0,
        }

    const handleSubmit = async (
        values: FormValues,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        const fullEvent: Omit<FullEvent, "id" | "userId"> = {
            ...values,
            startTime: values.startTime || "00:00",
            endDate: values.endDate?.trim() ? values.endDate : null,
            endTime: values.endTime?.trim() ? values.endTime : null,
        }

        try {
            if (event) {
                // update
                await updateEvent(event.id, fullEvent)
            } else {
                // create
                await createNewEvent(fullEvent)
            }

            router.back()
        } catch (error) {
            console.error("Failed to submit event:", error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
            <h1 className="text-2xl font-bold mb-4">
                {event ? 'Edit Event' : 'Create Event'}
            </h1>

            <Formik
                initialValues={initialValues}
                validationSchema={eventSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-4">
                        <div>
                            <Label>Title</Label>
                            <Field name="title" className="w-full border p-2 rounded" />
                            <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div>
                            <Label>Description</Label>
                            <Field as="textarea" name="description" className="w-full border p-2 rounded" />
                            <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Start Date</Label>
                                <Field name="startDate" type="date" className="w-full border p-2 rounded" />
                            </div>

                            <div>
                                <Label>Start Time</Label>
                                <Field name="startTime" type="time" className="w-full border p-2 rounded" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>End Date</Label>
                                <Field name="endDate" type="date" className="w-full border p-2 rounded" />
                            </div>

                            <div>
                                <Label>End Time</Label>
                                <Field name="endTime" type="time" className="w-full border p-2 rounded" />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Field type="checkbox" name="allDay" />
                            <Label>All Day</Label>
                        </div>

                        <div>
                            <Label>Priority (1-4)</Label>
                            <Field
                                name="priority"
                                type="number"
                                min={1}
                                max={4}
                                className="w-full border p-2 rounded"
                            />
                            <ErrorMessage name="priority" component="div" className="text-red-500 text-sm" />
                        </div>

                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting
                                ? 'Please wait...'
                                : event
                                    ? 'Save changes'
                                    : 'Create'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
