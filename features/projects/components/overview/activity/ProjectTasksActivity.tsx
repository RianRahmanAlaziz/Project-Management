import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import type { Projects } from "@/features/projects/types/projects";

const COMPLETION_DATA = [
    { week: "Wk 1", done: 3, total: 8 },
    { week: "Wk 2", done: 5, total: 9 },
    { week: "Wk 3", done: 7, total: 10 },
    { week: "Wk 4", done: 6, total: 8 },
    { week: "Wk 5", done: 9, total: 11 },
    { week: "Wk 6", done: 8, total: 10 },
];

interface ProjectTasksActivityProps {
    project: Projects;
}
export default function ProjectTasksActivity({ project }: ProjectTasksActivityProps) {
    const startDate = new Date(project.start_date);
    const dueDate = new Date(project.due_date);
    const today = new Date();

    const totalDays = Math.max(
        1,
        Math.ceil(
            (dueDate.getTime() - startDate.getTime()) /
            (1000 * 60 * 60 * 24)
        )
    );

    const passedDays = Math.min(
        totalDays,
        Math.max(
            0,
            Math.ceil(
                (today.getTime() - startDate.getTime()) /
                (1000 * 60 * 60 * 24)
            )
        )
    );
    return (
        <div className="bg-card border border-border rounded-xl p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3">
                <div>
                    <p className="font-semibold text-foreground text-base">Weekly Completion</p>
                    <p className="text-sm text-muted-foreground">Tasks completed per week</p>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary inline-block" />Completed</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-muted-foreground inline-block" />Total</span>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={150}>
                <AreaChart data={COMPLETION_DATA}>
                    <defs>
                        <linearGradient id="pg1" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.15} />
                            <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="week" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "8px", fontSize: "12px" }} />
                    <Area type="monotone" dataKey="total" stroke="var(--muted-foreground)" strokeWidth={1.5} fill="none" strokeDasharray="3 2" dot={false} />
                    <Area type="monotone" dataKey="done" stroke="#4F46E5" strokeWidth={2} fill="url(#pg1)" dot={false} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}
