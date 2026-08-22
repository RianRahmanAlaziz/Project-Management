"use client";

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import {
    Calendar,
    MessageSquare,
    Paperclip,
} from "lucide-react";

import { Avatar } from "@/components/ui";
import type { Tasks } from "@/features/tasks/types/tasks";
import { getColorOption } from "@/lib/utils/getColorOption";
import { formatDate } from "@/lib/utils/formatDate";

interface TaskCardProps {
    task: Tasks;
    preview?: boolean;
    isDropTarget?: boolean;
    disabled?: boolean;
    onClick?: () => void;
}

export default function TaskCard({
    task,
    preview = false,
    isDropTarget = false,
    disabled = false,
    onClick,
}: TaskCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        disabled: preview || disabled,
        data: {
            type: "task",
            task,
            column: task.column,
        },
    });

    const columnColor = getColorOption(task.column?.color);

    return (
        <div
            ref={setNodeRef}
            style={{
                transform:
                    CSS.Transform.toString(
                        transform,
                    ),
                transition,
            }}
            {...attributes}
            {...listeners}
            onClick={disabled ? undefined : onClick}
            className={[
                "group relative rounded-lg border border-border bg-card p-3 transition-all",
                disabled
                    ? "cursor-not-allowed opacity-50"
                    : [
                        "cursor-pointer",
                        "hover:shadow-sm",
                        columnColor.hoverBorder,
                    ].join(" "),
                isDragging && !preview ? "opacity-40" : "",
                isDropTarget && !preview && !disabled
                    ? "before:absolute before:-top-1.5 before:left-0 before:right-0 before:h-0.5 before:rounded-full before:bg-primary"
                    : "",
            ]
                .filter(Boolean)
                .join(" ")}
        >
            {/* Title */}
            <p className="mb-3 text-sm font-medium text-foreground">
                {task.title}
            </p>

            {/* Footer */}
            <div className="flex items-center">
                {task.assignee && (
                    <Avatar
                        name={task.assignee.name}
                        size="sm"
                    />
                )}

                <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">


                    <span className="flex items-center gap-1">
                        <Paperclip size={11} />
                        {0}
                    </span>

                    <span className="flex items-center gap-1">
                        <MessageSquare size={11} />
                        {0}
                    </span>
                </div>
            </div>
        </div>
    );
}