import * as Yup from 'yup';

export const eventSchema = Yup.object({
    title: Yup.string()
        .min(3, 'Title must be at least 3 characters long')
        .required('Title is required'),

    description: Yup.string()
        .max(1000, 'Description is too long')
        .required('Description is required'),

    startDate: Yup.string()
        .notRequired()
        .matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'Start date must be in YYYY-MM-DD format', excludeEmptyString: true }),

    startTime: Yup.string()
        .notRequired()
        .matches(/^\d{2}:\d{2}$/, { message: 'Start time must be in HH:mm format', excludeEmptyString: true }),

    endDate: Yup.string()
        .notRequired()
        .matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'End date must be in YYYY-MM-DD format', excludeEmptyString: true }),

    endTime: Yup.string()
        .notRequired()
        .matches(/^\d{2}:\d{2}$/, { message: 'End time must be in HH:mm format', excludeEmptyString: true })
        .test('endAfterStart', 'End datetime must be after start datetime', function (value) {
            const { startDate, startTime, endDate } = this.parent;
            if (!startDate || !startTime || !endDate || !value) return true;

            const start = new Date(`${startDate}T${startTime}`);
            const end = new Date(`${endDate}T${value}`);

            return end > start;
        }),

    allDay: Yup.boolean(),

    priority: Yup.number()
        .min(1, 'Priority must be at least 1')
        .max(4, 'Priority must be at most 4')
        .required(),
});
