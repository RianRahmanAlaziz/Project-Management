import type { Tasks } from "@/features/tasks/types/tasks";

export function getTimelineRange(tasks: Tasks[]) {
    const dates = tasks.flatMap(task => [
        new Date(task.start_date),
        new Date(task.due_date),
    ]);
    const minDate = new Date(Math.min(...dates.map(date => date.getTime())));
    const maxDate = new Date(Math.max(...dates.map(date => date.getTime())));
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

export function getTimelineMonths(
    minDate: Date,
    maxDate: Date,
) {
    const months: string[] = [];

    const cursor = new Date(
        minDate.getFullYear(),
        minDate.getMonth(),
        1,
    );

    while (cursor <= maxDate) {

        months.push(cursor.toLocaleString("en", {
            month: "short",
        }),
        );
        cursor.setMonth(cursor.getMonth() + 1,);
    }

    return months;
}