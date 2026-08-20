import { Badge } from "@/components/ui";
import type { MyTasks } from "@/features/tasks/types/tasks";
import { formatDate } from "@/lib/utils/formatDate";
import {
    priorityOptions,
} from "@/components/constants";
import { getColorOption } from "@/lib/utils/getColorOption";

const priorityColorMap = {
    Low: "green",
    Medium: "yellow",
    High: "red",
} as const;

interface MyTasksTableProps {
    tasks: MyTasks[];
    onTaskClick: (task: MyTasks) => void;
}


export default function MyTasksTable({
    tasks,
    onTaskClick,
}: MyTasksTableProps) {
    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-border">
                        <th className="text-left px-4 py-2.5 text-m font-medium text-muted-foreground">Task</th>
                        <th className="text-center px-4 py-2.5 text-m font-medium text-muted-foreground hidden md:table-cell">Status</th>
                        <th className="text-center px-4 py-2.5 text-m font-medium text-muted-foreground hidden lg:table-cell">Priority</th>
                        <th className="text-center px-4 py-2.5 text-m font-medium text-muted-foreground hidden sm:table-cell">Due</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => {
                        const priority = priorityOptions.find((option) => option.value === task.priority);
                        const statusName = task.column?.name ?? "Unknown";
                        const statusColor = task.column?.color ? getColorOption(task.column.color) : undefined;
                        return (
                            <tr key={task.id} onClick={() => onTaskClick(task)} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors cursor-pointer">
                                <td className="px-4 py-2.5">
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
                                <td className="px-4 py-2.5 hidden md:table-cell text-center">
                                    <Badge
                                        size="md"
                                        label={statusName}
                                        color={statusColor?.value ?? "gray"}
                                    />
                                </td>
                                <td className="px-4 py-2.5 hidden lg:table-cell text-center">
                                    <Badge
                                        size="md"
                                        label={priority?.label ?? task.priority}
                                        color={priorityColorMap[task.priority as keyof typeof priorityColorMap]
                                        }
                                    />
                                </td>
                                <td className="px-4 py-2.5 hidden sm:table-cell text-center">
                                    <span className="text-m text-muted-foreground">{formatDate(task.due_date)}</span>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
