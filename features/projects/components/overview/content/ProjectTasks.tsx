import { Avatar, Button } from "@/components/ui";
import type { Tasks } from "@/features/tasks/types/tasks";
import { USERS } from "@/features/users/mocks/users";
import { Plus } from "lucide-react";

interface ProjectTasksProps {
    tasks: Tasks[];
}

const priorityDot: Record<string, string> = {
    High: "bg-destructive",
    Medium: "bg-warning",
    Low: "bg-muted-foreground",
};

const statusColor: Record<string, string> = {
    Done: "text-success bg-green-50 dark:bg-green-950/30",
    "In Progress": "text-primary bg-indigo-50 dark:bg-indigo-950/30",
    Review: "text-warning bg-amber-50 dark:bg-amber-950/30",
    Todo: "text-muted-foreground bg-muted",
    Backlog: "text-muted-foreground bg-muted",
};

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
                            const assignee = USERS.data.find(
                                (user) => user.id === task.assignee_id
                            );
                            return (
                                <tr
                                    key={task.id}
                                    className="border-b border-border transition-colors last:border-0 hover:bg-muted/30">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`h-2 w-2 rounded-full ${priorityDot[task.priority]}`}
                                            />
                                            <span
                                                className={
                                                    task.status === "Done"
                                                        ? "text-base text-muted-foreground line-through"
                                                        : "text-base text-foreground"
                                                }
                                            >
                                                {task.title}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="hidden px-4 py-3 sm:table-cell">
                                        <span
                                            className={`rounded-full px-2 py-1 text-sm font-medium ${statusColor[task.status]}`}
                                        >
                                            {task.status}
                                        </span>
                                    </td>
                                    <td className="hidden px-4 py-3 md:table-cell">
                                        <span
                                            className={`text-sm font-medium ${task.priority === "High"
                                                ? "text-destructive"
                                                : task.priority === "Medium"
                                                    ? "text-warning"
                                                    : "text-muted-foreground"
                                                }`}
                                        >
                                            {task.priority}
                                        </span>
                                    </td>
                                    <td className="hidden px-4 py-3 lg:table-cell">
                                        {assignee && (
                                            <div className="flex items-center gap-2">
                                                <Avatar
                                                    name={assignee.name}
                                                    size="sm"
                                                />
                                                <span className="text-sm text-muted-foreground">
                                                    {assignee.name.split(" ")[0]}
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