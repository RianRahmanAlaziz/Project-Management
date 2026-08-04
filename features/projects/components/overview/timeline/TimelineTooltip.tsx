import {
    formatDate,
} from "@/lib/utils/formatDate";

import type {
    Tasks,
} from "@/features/tasks/types/tasks";

interface Props {
    task: Tasks;
    duration: number;
    status: string;
}

export default function TimelineTooltip({
    task,
    duration,
    status,
}: Props) {

    return (
        <div
            className="
                invisible
                absolute
                left-1/2
                top-0
                z-50
                -translate-x-1/2
                -translate-y-full
                rounded-xl
                border
                border-border
                bg-popover
                px-3
                py-2
                text-xs
                opacity-0
                shadow-xl
                transition-all
                group-hover:visible
                group-hover:opacity-100
            "
        >
            <p className="font-semibold">
                {task.title}
            </p>
            <p className="text-muted-foreground">
                {status}
            </p>
            <p className="text-muted-foreground">
                {formatDate(task.start_date)}
            </p>
            <p className="text-muted-foreground">
                {formatDate(task.due_date)}
            </p>
            <p className="mt-1 font-medium">
                {duration} days
            </p>
        </div>

    );

}