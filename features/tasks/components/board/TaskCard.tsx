"use client";

import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import {
    Calendar,
    MessageSquare,
    Paperclip,
} from "lucide-react";

import { Avatar, Badge } from "@/components/ui";
import type { Tasks } from "@/features/tasks/types/tasks";

const labelColors = {
    Frontend: "blue",
    Backend: "indigo",
    Design: "purple",
    DevOps: "gray",
    Database: "green",
    Docs: "gray",
    UX: "yellow",
    Data: "blue",
    Feature: "indigo",
    Performance: "red",
} as const;

interface TaskCardProps {
    task: Tasks;
    preview?: boolean;
    onClick?: () => void;
}

export default function TaskCard({
    task,
    preview = false,
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
        disabled: preview,
        data: {
            type: "task",
            task,
            column: task.column,
        },
    });

    return (
        <div
            ref={setNodeRef}
            style={{
                transform: CSS.Transform.toString(transform),
                transition,
            }}
            {...attributes}
            {...listeners}
            onClick={onClick}
            className={[
                "group cursor-pointer rounded-lg border border-border bg-card p-3 transition-all",
                "hover:border-primary/30 hover:shadow-sm",
                isDragging && "opacity-40",
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
                        <Calendar size={11} />
                        {task.due_date
                            ? task.due_date.slice(5)
                            : "-"}
                    </span>

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