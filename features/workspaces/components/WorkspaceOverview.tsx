"use client";

import {
    BriefcaseBusiness,
    Users,
    Clock3,
    BarChart3,
    Globe,
    Plus,
    Settings,
} from "lucide-react";

import { Button } from "@/components/ui";

type WorkspaceOverviewProps = {
    workspace: {
        name: string;
        slug: string;
        description: string;
        createdAt: string;
        initials: string;
        color: string;
        totalProjects: number;
        totalMembers: number;
        totalTasks: number;
        completionRate: number;
    };

    onCreateProject?: () => void;
    onSettings?: () => void;
};

export default function WorkspaceOverview({
    workspace,
    onCreateProject,
    onSettings,
}: WorkspaceOverviewProps) {
    return (
        <section className="rounded-2xl border border-border bg-card p-7 transition-all ">
            <div className="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
                <div className="flex gap-5">
                    <div
                        className={`flex h-18 w-18 shrink-0 items-center justify-center rounded-2xl ${workspace.color} text-3xl font-bold text-white`}
                    >
                        {workspace.initials}
                    </div>
                    <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-3xl font-bold">
                                {workspace.name}
                            </h1>
                        </div>
                        <p className="max-w-3xl text-muted-foreground">
                            {workspace.description}
                        </p>
                        <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
                            <span>
                                Created {workspace.createdAt}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        onClick={onSettings}
                    >
                        Settings
                    </Button>
                    <Button
                        variant="primary"
                        onClick={onCreateProject}
                    >
                        <Plus size={16} />
                        New Project
                    </Button>
                </div>
            </div>
            <div className="mt-8 border-t border-border pt-8">
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard
                        icon={<BriefcaseBusiness size={18} />}
                        label="Total Projects"
                        value={workspace.totalProjects}
                        color="bg-indigo-500/10 text-indigo-500"
                    />
                    <StatCard
                        icon={<Users size={18} />}
                        label="Active Members"
                        value={workspace.totalMembers}
                        color="bg-emerald-500/10 text-emerald-500"
                    />
                    <StatCard
                        icon={<Clock3 size={18} />}
                        label="Tasks This Week"
                        value={workspace.totalTasks}
                        color="bg-amber-500/10 text-amber-500"
                    />
                    <StatCard
                        icon={<BarChart3 size={18} />}
                        label="Completion Rate"
                        value={`${workspace.completionRate}%`}
                        color="bg-violet-500/10 text-violet-500"
                    />
                </div>
            </div>
        </section>
    );
}

function StatCard({
    icon,
    value,
    label,
    color,
}: {
    icon: React.ReactNode;
    value: string | number;
    label: string;
    color: string;
}) {
    return (
        <div className="flex items-center gap-4">

            <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}
            >
                {icon}
            </div>

            <div>

                <p className="text-3xl font-bold">
                    {value}
                </p>

                <p className="text-sm text-muted-foreground">
                    {label}
                </p>

            </div>

        </div>
    );
}