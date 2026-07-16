
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import {
    Calendar,
    MessageSquare,
    Paperclip,
} from "lucide-react";


import { Avatar, Badge } from "@/components/ui";
import { USERS } from "@/features/users/mocks/users";
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
    style: {
        text: string;
        bg: string;
        border: string;
        ring: string;
        hoverBorder: string;
    };
    onClick?: () => void;
}

export default function TaskCard({
    task,
    preview = false,
    style,
    onClick,
}: TaskCardProps) {

    const assignee = USERS.data.find(
        (user) => user.id === task.assignee_id
    );

    const sortable = useSortable({
        id: task.id,
        disabled: preview,
        data: {
            type: "task",
            task,
            column: task.status,
        },
    });

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = sortable;

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

            className={`rounded-lg border border-border bg-card p-3 cursor-pointer ${style.hoverBorder} hover:shadow-sm transition-all group ${isDragging ? "opacity-40" : ""}`}
        >
            <div className="mb-2 flex items-center gap-2">
                {task.labels?.slice(0, 2).map((label: string) => (
                    <Badge
                        key={label}
                        label={label}
                        color={
                            labelColors[
                            label as keyof typeof labelColors
                            ]
                        }
                    />
                ))}
                {/* <button className="ml-auto">
                    <MoreHorizontal size={14} />
                </button> */}
            </div>
            <p className="mb-3 text-sm font-medium">
                {task.title}
            </p>
            <div className="flex items-center">
                {assignee && (
                    <Avatar
                        name={assignee.name}
                        size="sm"
                    />
                )}
                <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        {task.due_date ? task.due_date.slice(5) : "-"}
                    </span>
                    <span className="flex items-center gap-1">
                        <Paperclip size={11} />
                        {task.attachments_count}
                    </span>
                    <span className="flex items-center gap-1">
                        <MessageSquare size={11} />
                        {task.comments_count}
                    </span>
                </div>
            </div>
        </div>
    );
}