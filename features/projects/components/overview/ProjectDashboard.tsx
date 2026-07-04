
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
    ProjectActivity
}
    from "@/features/projects/components";

import { TASKS } from '@/features/tasks/mocks/tasks';
import { USERS } from '@/features/users/mocks/users';
import type { Projects } from "@/features/projects/types/projects";


type ProjectsDashboardProps = {
    project: Projects;
    onCreateTasks?: () => void;
    onOpenBoard?: (project: Projects) => void;
};

export default function ProjectDashboard({
    project,
    onCreateTasks,
    onOpenBoard,
}: ProjectsDashboardProps) {

    const [activeTab, setActiveTab] = useState<ProjectTab>("overview");
    const projectTasks = TASKS.data.filter(
        task => task.project_id === project.id
    );

    const projectMembers = USERS.data.filter((user) =>
        project.member_id.includes(user.id)
    );

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
                <ProjectTasks tasks={projectTasks} />
            )}

            {activeTab === "timeline" && (
                <ProjectTasksTimeline tasks={projectTasks} />
            )}

            {activeTab === "members" && (
                <ProjectMembers
                    members={projectMembers}
                    tasks={projectTasks}
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
