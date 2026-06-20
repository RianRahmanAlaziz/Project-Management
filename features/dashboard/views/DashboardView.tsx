"use client";

import {
    AlertTriangle,
    Briefcase,
    CheckSquare,
    FolderOpen,
    TrendingUp,
} from "lucide-react";

import { PROJECTS, TASKS } from "@/features/dashboard/data/data";
import { DashboardStatCard } from "../components/DashboardStatCard";
import { TaskCompletionChart } from "../components/TaskCompletionChart";
import { ProjectProgressCard } from "../components/ProjectProgressCard";
import { RecentActivityCard } from "../components/RecentActivityCard";
import { MyTasksCard } from "../components/MyTasksCard";
import { NotificationsCard } from "../components/NotificationsCard";



export function DashboardView() {
    const completedTasks = TASKS.filter((task) => task.column === "Done").length;
    const overdueTasks = 3;
    const handleNavigate = (page: string) => {
        console.log("Navigate to:", page);
    };

    return (
        <div className="flex-1 overflow-auto px-6 py-8 xl:px-8">
            <div className="w-full max-w-none space-y-8">
                <div>
                    <h2 className="text-3xl font-bold text-foreground">
                        Good morning, Alex 👋
                    </h2>

                    <p className="mt-2 text-base text-muted-foreground">
                        Here's what's happening with your projects today.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
                    <DashboardStatCard
                        title="Workspaces"
                        value={3}
                        icon={<Briefcase size={18} />}
                        color="bg-indigo-500"
                        change="+1 this month"
                    />

                    <DashboardStatCard
                        title="Projects"
                        value={PROJECTS.length}
                        icon={<FolderOpen size={18} />}
                        color="bg-violet-500"
                        change="+2 this week"
                    />

                    <DashboardStatCard
                        title="Total Tasks"
                        value={TASKS.length}
                        icon={<CheckSquare size={18} />}
                        color="bg-blue-500"
                    />

                    <DashboardStatCard
                        title="Completed"
                        value={completedTasks}
                        icon={<TrendingUp size={18} />}
                        color="bg-success"
                        change="↑ 24% vs last week"
                    />

                    <DashboardStatCard
                        title="Overdue"
                        value={overdueTasks}
                        icon={<AlertTriangle size={18} />}
                        color="bg-destructive"
                    />
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <TaskCompletionChart />
                    <ProjectProgressCard onNavigate={handleNavigate} />
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <RecentActivityCard />
                    <MyTasksCard onNavigate={handleNavigate} />
                    <NotificationsCard onNavigate={handleNavigate} />
                </div>
            </div>
        </div>
    );
}