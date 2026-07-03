
import { useState } from 'react';
import ProjectsContent from './ProjectContent';
import ProjectsHero from './ProjectHero'
import type { Projects } from "@/features/projects/types/projects";

import {
    PROJECT_TABS,
    type ProjectTab,
} from "@/features/projects/constants/tabs";

import ProjectTabs from './content/ProjectTabs';
import ProjectTasksTimeline from './tasks/ProjectTasksTimeline';
import { TASKS } from '@/features/tasks/mocks/tasks';
import { USERS } from '@/features/users/mocks/users';
import ProjectTasks from './content/ProjectTasks';

import ProjectActivity from './activity/ProjectActivity';
import ProjectMembers from './members/ProjectMembers';



type ProjectsDashboardProps = {
    project: Projects;
    onCreateTasks?: () => void;
    onOpenBoard?: () => void;
};

export default function ProjectsDashboard({
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
            <ProjectsHero
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
                <ProjectsContent project={project} />
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
                <ProjectActivity project={project} />
            )}
        </section>
    )
}
