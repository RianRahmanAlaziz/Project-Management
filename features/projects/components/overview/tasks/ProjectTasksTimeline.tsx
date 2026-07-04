
import type { Tasks } from "@/features/tasks/types/tasks";

interface ProjectTasksTimelineProps {
    tasks: Tasks[];
}

export default function ProjectTasksTimeline({
    tasks,
}: ProjectTasksTimelineProps) {
    return (
        <div className="bg-card border border-border rounded-xl p-5">
            <p className="font-semibold text-foreground text-base mb-4">Project Timeline</p>
            {/* Gantt-style bars */}
            <div className="space-y-1">
                {/* Header */}
                <div className="grid grid-cols-[180px_1fr] gap-4 mb-3">
                    <span className="text-sm font-medium text-muted-foreground">Task</span>
                    <div className="flex justify-between text-sm text-muted-foreground">
                        {["May", "Jun", "Jul", "Aug"].map(m => <span key={m}>{m}</span>)}
                    </div>
                </div>
                {tasks.slice(0, 8).map((task, i) => {
                    const barLeft = [0, 5, 10, 20, 30, 35, 45, 55][i];
                    const barWidth = [20, 15, 25, 18, 22, 30, 20, 15][i];
                    const colors = ["bg-primary", "bg-violet-500", "bg-blue-500", "bg-success", "bg-warning", "bg-primary", "bg-violet-500", "bg-blue-500"];
                    return (
                        <div key={task.id} className="grid grid-cols-[180px_1fr] gap-4 items-center py-1.5 hover:bg-muted/20 rounded-lg px-1 transition-colors">
                            <p className="text-sm text-foreground truncate">{task.title}</p>
                            <div className="relative h-5 bg-muted/40 rounded-full overflow-hidden">
                                <div
                                    className={`absolute h-full ${colors[i % colors.length]} rounded-full opacity-80 flex items-center px-2`}
                                    style={{ left: `${barLeft}%`, width: `${barWidth}%` }}
                                >
                                    <span className="text-white text-xs font-medium truncate">{task.status}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
