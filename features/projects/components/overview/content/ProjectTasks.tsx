import { Avatar, Badge } from "@/components/ui";

import {
    priorityOptions,
    statusOptions,
} from "@/components/constants";

import type { Tasks } from "@/features/tasks/types/tasks";

interface ProjectTasksProps {
    tasks: Tasks[];
}

const priorityColorMap = {
    low: "green",
    medium: "yellow",
    high: "red",
} as const;

const statusColorMap = {
    planning: "blue",
    in_progress: "indigo",
    review: "purple",
    done: "green",
} as const;

export default function ProjectTasks({
    tasks,
}: ProjectTasksProps) {
    return (
        <div className="space-y-4">
            <div className="overflow-hidden rounded-xl border border-border bg-card">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-border bg-muted/30">
                            <th className="px-4 py-3 text-left text-base font-medium text-muted-foreground">
                                Task
                            </th>

                            <th className="hidden px-4 py-3 text-left text-base font-medium text-muted-foreground sm:table-cell">
                                Status
                            </th>

                            <th className="hidden px-4 py-3 text-left text-base font-medium text-muted-foreground md:table-cell">
                                Priority
                            </th>

                            <th className="hidden px-4 py-3 text-left text-base font-medium text-muted-foreground lg:table-cell">
                                Assignee
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {tasks.map((task) => {
                            const priority = priorityOptions.find((option) => option.value === task.priority);
                            const status = statusOptions.find((option) => option.value === task.status);

                            return (
                                <tr
                                    key={task.id}
                                    className="border-b border-border transition-colors last:border-0 hover:bg-muted/30"
                                >
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            {priority?.icon}
                                            <span
                                                className={task.status === "done" ? "text-base text-muted-foreground line-through" : "text-base text-foreground"
                                                }
                                            >
                                                {task.title}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="hidden px-4 py-3 sm:table-cell">
                                        <Badge
                                            size="md"
                                            label={status?.label ?? task.status}
                                            color={statusColorMap[task.status as keyof typeof statusColorMap]}
                                        />
                                    </td>

                                    <td className="hidden px-4 py-3 md:table-cell">
                                        <Badge
                                            size="md"
                                            label={priority?.label ?? task.priority}
                                            icon={priority?.icon}
                                            color={priorityColorMap[task.priority as keyof typeof priorityColorMap]
                                            }
                                        />
                                    </td>

                                    <td className="hidden px-4 py-3 lg:table-cell">
                                        {task.assignee && (
                                            <div className="flex items-center gap-2">
                                                <Avatar
                                                    name={task.assignee.name}
                                                    size="sm"
                                                />

                                                <span className="text-sm text-muted-foreground">
                                                    {task.assignee.name.split(" ",)[0]}
                                                </span>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}