"use client";

import {
    Calendar,
    MessageSquare,
    MoreHorizontal,
    Paperclip,
} from "lucide-react";

import { Avatar, Badge } from "@/components/ui";
import { USERS } from "@/data/data";

const priorityConfig = {
    High: "bg-destructive",
    Medium: "bg-warning",
    Low: "bg-muted-foreground",
} as const;

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
    task: any;
    dragging: boolean;
    style: {
        text: string;
        bg: string;
        border: string;
        ring: string;
        hoverBorder: string;
    };
    onClick: () => void;
    onDragStart: () => void;
    onDragEnd: () => void;
}

export default function TaskCard({
    task,
    style,
    dragging,
    onClick,
    onDragStart,
    onDragEnd,
}: TaskCardProps) {

    const assignee = USERS.find(
        (user) => user.id === task.assignee
    );

    return (
        <div
            draggable
            onClick={onClick}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            className={`rounded-lg border border-border bg-card p-3 cursor-pointer ${style.hoverBorder} hover:shadow-sm transition-all group ${dragging ? "opacity-40" : ""}`}
        >
            <div className="mb-2 flex items-center gap-2">
                {task.labels.slice(0, 2).map((label: string) => (
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
                        {task.dueDate.slice(5)}
                    </span>
                    <span className="flex items-center gap-1">
                        <Paperclip size={11} />
                        {task.attachments}
                    </span>
                    <span className="flex items-center gap-1">
                        <MessageSquare size={11} />
                        {task.comments}
                    </span>
                </div>
            </div>
        </div>
    );
}