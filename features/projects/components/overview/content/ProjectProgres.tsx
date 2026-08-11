"use client";

import {
    RadialBar,
    RadialBarChart,
    PolarAngleAxis,
} from "recharts";
import type { DetailProject } from "@/features/projects/types/projects";
import { Tasks } from "@/features/tasks/types/tasks";

type ProjectProgresProps = {
    project: DetailProject;
    tasks: Tasks[];
};

export default function ProjectProgres({
    project,
    tasks,
}: ProjectProgresProps) {

    const radialData = [{ name: "Progress", value: project.progress, fill: "#4F46E5" }];
    const colCounts = (status: string) =>
        tasks.filter(
            (task) =>
                task.status === status &&
                task.project_id === project.id,
        ).length;

    return (
        <div className="bg-card border border-border rounded-xl p-4 flex flex-col items-center justify-center shadow-sm">
            <p className="font-semibold text-foreground text-base mb-2">Overall Progress</p>
            <div className="relative">
                <RadialBarChart
                    width={130}
                    height={130}
                    innerRadius={45}
                    outerRadius={58}
                    data={[
                        {
                            value: 100,
                            fill: "#31384A",
                        },
                        {
                            value: project.progress,
                            fill: "#4F46E5",
                        },
                    ]}
                    startAngle={90}
                    endAngle={-270}
                >
                    <PolarAngleAxis
                        type="number"
                        domain={[0, 100]}
                        tick={false}
                    />

                    <RadialBar
                        dataKey="value"
                        cornerRadius={8}
                    />
                </RadialBarChart>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <p className="text-2xl font-bold text-foreground">{project.progress}%</p>
                    <p className="text-sm text-muted-foreground">complete</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2 w-full mt-3">
                {[
                    { label: "Done", value: colCounts("Done"), color: "text-success" },
                    { label: "In Progress", value: colCounts("In Progress"), color: "text-primary" },
                    { label: "Review", value: colCounts("Review"), color: "text-warning" },
                    { label: "Todo", value: colCounts("Todo") + colCounts("Backlog"), color: "text-muted-foreground" },
                ].map(s => (
                    <div key={s.label} className="text-center p-2 bg-muted/40 rounded-lg border border-border">
                        <p className={`text-base font-bold ${s.color}`}>{s.value}</p>
                        <p className="text-sm text-muted-foreground">{s.label}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
