import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import type { DetailProject } from "@/features/projects/types/projects";

const COMPLETION_DATA = [
    { week: "Wk 1", done: 3, total: 8 },
    { week: "Wk 2", done: 5, total: 9 },
    { week: "Wk 3", done: 7, total: 10 },
    { week: "Wk 4", done: 6, total: 8 },
    { week: "Wk 5", done: 9, total: 11 },
    { week: "Wk 6", done: 8, total: 10 },
];

interface ProjectTasksActivityProps {
    project: DetailProject;
}

export default function ProjectTasksActivity({
    project,
}: ProjectTasksActivityProps) {
    return (
        <div className="rounded-xl border border-border bg-card p-4 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
                <div>
                    <p className="text-base font-semibold text-foreground">
                        Weekly Completion
                    </p>

                    <p className="text-sm text-muted-foreground">
                        Tasks completed per week
                    </p>
                </div>

                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                        <span className="inline-block h-2 w-2 rounded-full bg-primary" />
                        Completed
                    </span>

                    <span className="flex items-center gap-1">
                        <span className="inline-block h-2 w-2 rounded-full bg-muted-foreground" />
                        Total
                    </span>
                </div>
            </div>

            <ResponsiveContainer
                width="100%"
                height={150}
            >
                <AreaChart data={COMPLETION_DATA}>
                    <defs>
                        <linearGradient
                            id={`project-completion-${project.id}`}
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor="#4F46E5"
                                stopOpacity={0.15}
                            />

                            <stop
                                offset="95%"
                                stopColor="#4F46E5"
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="var(--border)"
                    />

                    <XAxis
                        dataKey="week"
                        tick={{
                            fontSize: 10,
                            fill: "var(--muted-foreground)",
                        }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <YAxis
                        tick={{
                            fontSize: 10,
                            fill: "var(--muted-foreground)",
                        }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <Tooltip
                        contentStyle={{
                            background: "var(--card)",
                            border: "1px solid var(--border)",
                            borderRadius: "8px",
                            fontSize: "12px",
                        }}
                    />

                    <Area
                        type="monotone"
                        dataKey="total"
                        stroke="var(--muted-foreground)"
                        strokeWidth={1.5}
                        fill="none"
                        strokeDasharray="3 2"
                        dot={false}
                    />

                    <Area
                        type="monotone"
                        dataKey="done"
                        stroke="#4F46E5"
                        strokeWidth={2}
                        fill={`url(#project-completion-${project.id})`}
                        dot={false}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}