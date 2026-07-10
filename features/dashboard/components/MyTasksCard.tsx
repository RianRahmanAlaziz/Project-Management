"use client";

import { Badge } from "@/components/ui";
import { TASKS } from "@/data/data";
import { priorityDotColors, statusColors } from "../constants/dashboardColors";

interface MyTasksCardProps {
    onNavigate: (page: string) => void;
}

export function MyTasksCard({ onNavigate }: MyTasksCardProps) {
    return (
        <div className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
                <p className="text-base font-semibold text-foreground">
                    My Tasks
                </p>

                <button
                    type="button"
                    onClick={() => onNavigate("tasks")}
                    className="cursor-pointer text-sm text-primary hover:underline"
                >
                    View all
                </button>
            </div>

            <div className="space-y-3">
                {TASKS.filter((task) => task.assignee === "u1")
                    .slice(0, 5)
                    .map((task) => (
                        <div key={task.id} className="flex items-center gap-3">
                            <div
                                className={`h-2 w-2 shrink-0 rounded-full ${priorityDotColors[task.priority] ?? "bg-muted-foreground"
                                    }`}
                            />

                            <p
                                className={`flex-1 truncate text-sm ${task.column === "Done"
                                    ? "text-muted-foreground line-through"
                                    : "text-foreground"
                                    }`}
                            >
                                {task.title}
                            </p>

                            <Badge
                                label={task.column}
                                color={statusColors[task.column] ?? "gray"}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
}