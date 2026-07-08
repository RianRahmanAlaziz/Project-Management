"use client";

import { Calendar } from "lucide-react";
import { Avatar, Badge } from "@/components/ui";

import type { Tasks } from "@/features/tasks/types/tasks";
import { Combobox } from "@/components/ui/combobox";

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

const statusColors: Record<string, string> = {
    Backlog: "bg-slate-400",
    Todo: "bg-blue-500",
    "In Progress": "bg-amber-500",
    Review: "bg-purple-500",
    Done: "bg-emerald-500",
};

const statusDescriptions: Record<string, string> = {
    Backlog: "Not started yet",
    Todo: "Ready to start",
    "In Progress": "Currently working",
    Review: "Waiting for review",
    Done: "Completed",
};

const priorityColors: Record<string, string> = {
    Low: "bg-emerald-500",
    Medium: "bg-amber-500",
    High: "bg-red-500",
};

const priorityDescriptions: Record<string, string> = {
    Low: "Low priority",
    Medium: "Normal priority",
    High: "High priority",
};


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
            <Combobox
                label="Status"
                value={status}
                onValueChange={setStatus}
                placeholder="Select status"
                searchable={false}
                options={statusOptions.map((item) => ({
                    value: item,
                    label: item,
                    description: statusDescriptions[item],
                    icon: (
                        <span
                            className={`h-2.5 w-2.5 rounded-full ${statusColors[item]}`}
                        />
                    ),
                }))}
            />

            {/* Priority */}
            <Combobox
                label="Priority"
                value={priority}
                onValueChange={setPriority}
                placeholder="Select priority"
                searchable={false}
                options={priorityOptions.map((item) => ({
                    value: item,
                    label: item,
                    description: priorityDescriptions[item],
                    icon: (
                        <span
                            className={`h-2.5 w-2.5 rounded-full ${priorityColors[item]}`}
                        />
                    ),
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
                    {task.due_date}
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
