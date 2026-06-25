"use client";

import { Calendar } from "lucide-react";
import { Avatar, Badge, Select } from "@/components/ui";

import type { Tasks } from "@/features/tasks/types/tasks";

interface Users {
    id: number | string;
    name: string;
    email: string;
    role: string;
}

interface TaskMetaProps {
    task: Tasks;
    assignee?: Users;
    status: string;
    priority: string;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
    setPriority: React.Dispatch<React.SetStateAction<string>>;
}

const statusOptions = ["Backlog", "Todo", "In Progress", "Review", "Done"];
const priorityOptions = ["Low", "Medium", "High"];


export default function TaskMeta({
    task,
    assignee,
    status,
    priority,
    setStatus,
    setPriority,
}: TaskMetaProps) {
    return (
        <div className="px-5 pb-4 space-y-2.5">
            {/* Status */}
            <Select
                label="Status"
                className="cursor-pointer"
                value={status}
                onValueChange={setStatus}
                options={statusOptions.map((item) => ({
                    value: item,
                    label: item,
                }))}
            />

            {/* Priority */}
            <Select
                label="Priority"
                className="cursor-pointer"
                value={priority}
                onValueChange={setPriority}
                options={priorityOptions.map((item) => ({
                    value: item,
                    label: item,
                }))}
            />

            {/* Assignee */}
            <div className="flex items-center gap-3">
                <span className="text-base text-muted-foreground w-20 shrink-0">
                    Assignee
                </span>
                <div className="flex items-center gap-2">
                    {assignee &&
                        <>
                            <Avatar name={assignee.name} size="sm" />
                            <span className="text-base text-foreground">{assignee.name}
                            </span>
                        </>
                    }
                </div>
            </div>

            {/* Due Date */}
            <div className="flex items-center gap-3">
                <span className="text-base text-muted-foreground w-20 shrink-0">Due date</span>
                <div className="flex items-center gap-1.5 text-base text-foreground">
                    <Calendar size={12} className="text-muted-foreground" />
                    {task.dueDate}
                </div>
            </div>

            {/* Labels */}
            <div className="flex items-start gap-3">
                <span className="text-base text-muted-foreground w-20 shrink-0 pt-0.5">
                    Labels
                </span>
                <div className="flex flex-wrap gap-1">
                    {task.labels.map((label) => (
                        <Badge
                            key={label}
                            label={label}
                            color="indigo"
                        />
                    ))}
                    <button className="text-base text-primary hover:underline">+ Add</button>
                </div>
            </div>
        </div>
    )
}
