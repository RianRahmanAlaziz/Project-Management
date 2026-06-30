
import { Badge } from "@/components/ui";

interface Tasks {
    id: string;
    title: string;
    column: string;
    priority: string;
    dueDate: string;
    assignee: string;
}

interface MyTasksTableProps {
    tasks: Tasks[];
    onTaskClick: (taskId: string) => void;
}

const priorityDot: Record<string, string> = { High: "bg-destructive", Medium: "bg-warning", Low: "bg-muted-foreground" };

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
                        <th className="text-left px-4 py-2.5 text-m font-medium text-muted-foreground hidden md:table-cell">Status</th>
                        <th className="text-left px-4 py-2.5 text-m font-medium text-muted-foreground hidden lg:table-cell">Priority</th>
                        <th className="text-left px-4 py-2.5 text-m font-medium text-muted-foreground hidden sm:table-cell">Due</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <tr key={task.id} onClick={() => onTaskClick(task.id)} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors cursor-pointer">
                            <td className="px-4 py-2.5">
                                <div className="flex items-center gap-2.5">
                                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${priorityDot[task.priority]}`} />
                                    <span className={`text-m ${task.column === "Done" ? "line-through text-muted-foreground" : "text-foreground"}`}>{task.title}</span>
                                </div>
                            </td>
                            <td className="px-4 py-2.5 hidden md:table-cell">
                                <Badge
                                    size="md"
                                    label={task.column}
                                    color={
                                        task.column === "Done"
                                            ? "green"
                                            : task.column === "In Progress"
                                                ? "indigo"
                                                : task.column === "Review"
                                                    ? "yellow"
                                                    : "gray"
                                    }
                                />
                            </td>
                            <td className="px-4 py-2.5 hidden lg:table-cell">
                                <span className={`text-m font-medium ${task.priority === "High" ? "text-destructive" : task.priority === "Medium" ? "text-warning" : "text-muted-foreground"}`}>{task.priority}</span>
                            </td>
                            <td className="px-4 py-2.5 hidden sm:table-cell">
                                <span className="text-m text-muted-foreground">{task.dueDate}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
