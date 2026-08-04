"use client";
import { useState } from 'react';

import {
    PROJECT_TABS,
    type ProjectTab,
} from "@/features/projects/constants/tabs";

import {
    ProjectTabs,
    ProjectTasks,
    ProjectMembers,
    ProjectTasksActivity,
    ProjectTasksTimeline,
    ProjectHero,
    ProjectContent,
    ProjectActivity,
} from "@/features/projects/components";

import type { DetailProject } from "@/features/projects/types/projects";
import { Tasks } from '@/features/tasks/types/tasks';


type ProjectsDashboardProps = {
    project: DetailProject;
    tasks: Tasks[];
    onCreateTasks?: () => void;
    onOpenBoard?: (project: DetailProject) => void;
};

export default function ProjectDashboard({
    project,
    tasks,
    onCreateTasks,
    onOpenBoard,
}: ProjectsDashboardProps) {

    const [activeTab, setActiveTab] = useState<ProjectTab>("overview");

    const projectMembers = project.members;

    return (
        <section className="space-y-6">
            <ProjectHero
                project={project}
                onCreateTasks={onCreateTasks}
                onOpenBoard={onOpenBoard}
            />

            <ProjectTabs
                tabs={PROJECT_TABS}
                activeTab={activeTab}
                onChange={setActiveTab}
            />
            {activeTab === "overview" && (
                <ProjectContent project={project} />
            )}

            {activeTab === "tasks" && (
                <ProjectTasks tasks={tasks} />
            )}

            {activeTab === "timeline" && (
                <ProjectTasksTimeline tasks={tasks} />
            )}

            {activeTab === "members" && (
                <ProjectMembers
                    members={projectMembers}
                    tasks={tasks}
                />
            )}

            {activeTab === "activity" && (
                <>
                    <ProjectActivity project={project} />
                    <ProjectTasksActivity project={project} />
                </>
            )}
        </section>
    )
}
