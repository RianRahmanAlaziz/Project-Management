import { Avatar, Badge } from "@/components/ui";
import { priorityOptions } from "@/components/constants";

import type { Tasks } from "@/features/tasks/types/tasks";
import { getColorOption } from "@/lib/utils/getColorOption";

interface ProjectTasksProps {
    tasks: Tasks[];
    onTaskClick: (task: Tasks) => void;
}

const priorityColorMap = {
    Low: "green",
    Medium: "yellow",
    High: "red",
} as const;


export default function ProjectTasks({
    tasks,
    onTaskClick,
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

                            <th className="hidden px-4 py-3 text-center text-base font-medium text-muted-foreground sm:table-cell">
                                Status
                            </th>

                            <th className="hidden px-4 py-3 text-center text-base font-medium text-muted-foreground md:table-cell">
                                Priority
                            </th>

                            <th className="hidden px-4 py-3 text-center text-base font-medium text-muted-foreground lg:table-cell">
                                Assignee
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {tasks.map((task) => {
                            const priority = priorityOptions.find(
                                (option) => option.value === task.priority,
                            );

                            const statusName = task.column?.name ?? "Unknown";
                            const statusColor = task.column?.color ? getColorOption(task.column.color) : undefined;
                            return (
                                <tr
                                    key={task.id}
                                    onClick={() => onTaskClick(task)}
                                    className="border-b border-border transition-colors last:border-0 hover:bg-muted/30 cursor-pointer"
                                >
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            {priority?.icon}
                                            <span
                                                className={
                                                    task.column?.is_completed
                                                        ? "text-base text-muted-foreground line-through"
                                                        : "text-base text-foreground"
                                                }
                                            >
                                                {task.title}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="hidden px-4 py-3 sm:table-cell text-center">
                                        <Badge
                                            size="md"
                                            label={statusName}
                                            color={statusColor?.value ?? "gray"}
                                        />
                                    </td>

                                    <td className="hidden px-4 py-3 md:table-cell text-center">
                                        <Badge
                                            size="md"
                                            label={priority?.label ?? task.priority}
                                            color={priorityColorMap[task.priority as keyof typeof priorityColorMap]
                                            }
                                        />
                                    </td>
                                    <td className="hidden px-4 py-3 lg:table-cell text-center">
                                        {task.assignee && (
                                            <div className="flex items-center justify-center gap-2">
                                                <Avatar
                                                    name={task.assignee.name}
                                                    size="sm"
                                                />

                                                <span className="text-sm text-muted-foreground">
                                                    {task.assignee.name.split(/\s+/)[0]}
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