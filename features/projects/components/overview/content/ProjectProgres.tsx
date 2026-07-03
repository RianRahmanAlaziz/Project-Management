"use client";

import {
    RadialBar,
    RadialBarChart,
} from 'recharts'
import type { Projects } from "@/features/projects/types/projects";
import { TASKS } from '@/features/tasks/mocks/tasks';

type ProjectProgresProps = {
    project: Projects;
};

export default function ProjectProgres({
    project
}: ProjectProgresProps) {

    const radialData = [{ name: "Progress", value: project.progress, fill: "#4F46E5" }];
    const colCounts = (status: string) =>
        TASKS.data.filter(
            (task) =>
                task.status === status &&
                task.project_id === project.id
        ).length;

    return (
        <div className="bg-card border border-border rounded-xl p-4 flex flex-col items-center justify-center shadow-sm">
            <p className="font-semibold text-foreground text-base mb-2">Overall Progress</p>
            <div className="relative">
                <RadialBarChart width={130} height={130} cx={65} cy={65} innerRadius={45} outerRadius={58} barSize={10} data={radialData} startAngle={90} endAngle={-270}>
                    <RadialBar background dataKey="value" fill="#4F46E5" cornerRadius={5} />
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
