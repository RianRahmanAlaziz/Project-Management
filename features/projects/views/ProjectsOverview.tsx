"use client";
import { useState } from "react";
import { AnimatePresence } from "motion/react";

import {
    ProjectDashboard,
    ProjectTaskModal,
    SkeletonProjectsOverview,
    InviteProjectMemberModal,
    RemoveProjectMemberModal,
} from "@/features/projects/components";

import {
    useAddProjectMember,
    useProjectMembers,
    useProjectNavigation,
    useOverviewProject,
    useProjectModals,
    useRemoveProjectMember,
} from "../hooks";

import TaskDrawer from "@/features/tasks/views/TaskDrawer";
import { useTasks } from "@/features/tasks/hooks";
import { useWorkspaceMembers } from "@/features/members/hooks";
import type {
    Tasks,
    TaskDrawer as TaskDrawerData,
} from "@/features/tasks/types/tasks";


interface ProjectsOverviewProps {
    workspaceSlug: string;
    projectSlug: string;
}


export default function ProjectsOverview({
    workspaceSlug,
    projectSlug,
}: ProjectsOverviewProps) {
    const [selectedTask, setSelectedTask] = useState<TaskDrawerData | null>(null);
    const {
        project,
        isLoading,
    } = useOverviewProject(workspaceSlug, projectSlug);

    const {
        tasks,
        refetch: refetchTasks,
    } = useTasks(
        workspaceSlug,
        projectSlug,
    );

    const {
        handleOpenProjectBoard,
        handleSettingProject
    } = useProjectNavigation(workspaceSlug);

    const {
        member,
        task,
    } = useProjectModals();

    const {
        members: workspaceMembers,
    } = useWorkspaceMembers(workspaceSlug);

    const {
        members: projectMembers,
        refetch: refetchProjectMembers,
    } = useProjectMembers({
        workspaceSlug,
        projectSlug,
    });

    const availableMembers = workspaceMembers.filter((workspaceMember) =>
        !projectMembers.some(
            (projectMember) => projectMember.user_id === workspaceMember.user.id,
        ),
    );

    const {
        handleAddProjectMember,
        isAdding,
    } = useAddProjectMember({
        workspaceSlug,

        onSuccess: async () => {
            await refetchProjectMembers();
            member.closeInvite();
        },
    });

    const {
        handleRemoveMemberProject,
        isRemoving,
    } = useRemoveProjectMember({
        workspaceSlug,
        projectSlug,
        onSuccess: async () => {
            await refetchProjectMembers();
            member.remove.close();
        },
    });

    const handleTaskClick = (task: Tasks) => {
        setSelectedTask({
            id: task.id,
            title: task.title,
            description: task.description,
            priority: task.priority,
            due_date: task.due_date,

            column: {
                id: task.column.id,
                name: task.column.name,
                description: task.column.description,
                color: task.column.color,
                position: task.column.position,
            },

            assignee: task.assignee,
        });
    };

    if (isLoading) {
        return <SkeletonProjectsOverview />;
    }

    if (!project) {
        return (
            <div className="p-6 text-sm text-muted-foreground">
                Project not found.
            </div>
        );
    }
    return (
        <div className="px-6 py-8 xl:px-8">
            <div className="w-full space-y-6">
                <ProjectDashboard
                    project={project}
                    tasks={tasks}
                    onTaskClick={handleTaskClick}
                    members={projectMembers}
                    onAddMember={member.openInvite}
                    onRemoveMember={member.remove.open}
                    onCreateTasks={task.openCreate}
                    onOpenBoard={handleOpenProjectBoard}
                    onSettingProject={handleSettingProject}
                />
            </div>

            {/* <ProjectTaskModal
                open={task.modal.open}
                mode={task.modal.mode}
                task={task.modal.task}
                onClose={task.close}
            /> */}

            <InviteProjectMemberModal
                open={member.inviteOpen}
                users={availableMembers}
                isSubmitting={isAdding}
                onClose={member.closeInvite}
                onConfirm={(userId) =>
                    handleAddProjectMember(
                        projectSlug,
                        userId,
                    )
                }
            />

            <RemoveProjectMemberModal
                open={member.remove.modal.open}
                users={member.remove.modal.member}
                isSubmitting={isRemoving}
                onClose={member.remove.close}
                onConfirm={handleRemoveMemberProject}
            />

            <AnimatePresence initial={false} mode="wait">
                {selectedTask && (
                    <TaskDrawer
                        key={selectedTask.id}
                        task={selectedTask}
                        workspaceSlug={workspaceSlug}
                        projectSlug={projectSlug}
                        projectName={project.name}
                        onClose={() => setSelectedTask(null)}
                        onTaskUpdated={async (changes) => {
                            setSelectedTask((currentTask) => {
                                if (!currentTask) {
                                    return null;
                                }

                                return {
                                    ...currentTask,
                                    priority: changes.priority,
                                    column: {
                                        ...currentTask.column,
                                        ...changes.column,
                                    },
                                };
                            });

                            await refetchTasks();
                        }}
                    />
                )}
            </AnimatePresence>

        </div>
    )
}
