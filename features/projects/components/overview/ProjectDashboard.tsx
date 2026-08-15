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
import { ProjectMember } from '../../types/projectMembers';


type ProjectsDashboardProps = {
    project: DetailProject;
    tasks: Tasks[];
    members: ProjectMember[];

    onAddMember?: () => void;
    onRemoveMember?: (project: ProjectMember) => void;
    onCreateTasks?: () => void;
    onOpenBoard: (project: DetailProject) => void;
    onSettingProject: (project: DetailProject) => void;
    onTaskClick: (task: Tasks) => void;
};

export default function ProjectDashboard({
    project,
    tasks,
    members,
    onAddMember,
    onRemoveMember,
    onCreateTasks,
    onOpenBoard,
    onSettingProject,
    onTaskClick,
}: ProjectsDashboardProps) {

    const [activeTab, setActiveTab] = useState<ProjectTab>("overview");

    return (
        <section className="space-y-6">
            <ProjectHero
                project={project}
                onCreateTasks={onCreateTasks}
                onOpenBoard={onOpenBoard}
                onSettingProject={onSettingProject}
            />

            <ProjectTabs
                tabs={PROJECT_TABS}
                activeTab={activeTab}
                onChange={setActiveTab}
            />
            {activeTab === "overview" && (
                <ProjectContent tasks={tasks} project={project} />
            )}

            {activeTab === "tasks" && (
                <ProjectTasks tasks={tasks} onTaskClick={onTaskClick} />
            )}

            {activeTab === "timeline" && (
                <ProjectTasksTimeline tasks={tasks} />
            )}

            {activeTab === "members" && (
                <ProjectMembers
                    members={members}
                    tasks={tasks}
                    onAddMember={onAddMember}
                    onRemove={onRemoveMember}
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
