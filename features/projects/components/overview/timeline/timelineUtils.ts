import type { Tasks } from "@/features/tasks/types/tasks";

export function isValidTimelineTask(task: Tasks) {
    if (!task.start_date || !task.due_date) {
        return false;
    }

    const startDate = new Date(task.start_date);
    const endDate = new Date(task.due_date);

    if (
        Number.isNaN(startDate.getTime()) ||
        Number.isNaN(endDate.getTime())
    ) {
        return false;
    }

    return endDate >= startDate;
}

export function getTimelineRange(tasks: Tasks[]) {
    const dates = tasks
        .flatMap((task) => [
            task.start_date
                ? new Date(task.start_date)
                : null,
            task.due_date
                ? new Date(task.due_date)
                : null,
        ])
        .filter(
            (date): date is Date =>
                date !== null &&
                !Number.isNaN(date.getTime()),
        );

    if (dates.length === 0) {
        const today = new Date();

        return {
            minDate: today,
            maxDate: today,
        };
    }

    const minDate = new Date(
        Math.min(
            ...dates.map((date) =>
                date.getTime(),
            ),
        ),
    );

    const maxDate = new Date(
        Math.max(
            ...dates.map((date) =>
                date.getTime(),
            ),
        ),
    );

    return {
        minDate,
        maxDate,
    };
}

export function getTotalDays(
    minDate: Date,
    maxDate: Date,
) {
    return Math.max(
        1,
        Math.ceil(
            (maxDate.getTime() - minDate.getTime()) / 86400000
        ),
    );
}

export function getPosition(
    date: Date,
    minDate: Date,
    totalDays: number,
) {
    return (
        (
            date.getTime() -
            minDate.getTime()
        ) /
        86400000 /
        totalDays
    ) * 100;
}

export interface TimelineMonth {
    key: string;
    label: string;
}

export function getTimelineMonths(
    minDate: Date,
    maxDate: Date,
): TimelineMonth[] {
    const months: TimelineMonth[] = [];

    const cursor = new Date(
        minDate.getFullYear(),
        minDate.getMonth(),
        1,
    );

    while (cursor <= maxDate) {
        const year = cursor.getFullYear();
        const month = cursor.getMonth();

        months.push({
            key: `${year}-${String(month + 1).padStart(2, "0")}`,
            label: cursor.toLocaleString("en", {
                month: "short",
            }),
        });

        cursor.setMonth(month + 1);
    }

    return months;
}

