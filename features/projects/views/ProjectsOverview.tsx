"use client";
import { useState } from "react";
import {
    ProjectDashboard,
    ProjectTaskModal,
    SkeletonProjectsOverview,
} from "@/features/projects/components";

import {
    useAddProjectMember,
    useProjectMemberModal,
    useProjectMembers,
    useProjectNavigation,
    useProjectTaskModal,
} from "../hooks";

import { useOverviewProject } from "../hooks/queries/useOverviewProject";
import { useTasks } from "@/features/tasks/hooks/useTasks";
import { useWorkspaceMembers } from "@/features/members/hooks";
import InviteProjectMemberModal from "../components/modal/InviteProjectMemberModal";

interface ProjectsOverviewProps {
    workspaceSlug: string;
    projectSlug: string;
}


export default function ProjectsOverview({
    workspaceSlug,
    projectSlug,
}: ProjectsOverviewProps) {
    const {
        project,
        isLoading,
        error,
        refetch,
    } = useOverviewProject(workspaceSlug, projectSlug);

    const {
        tasks,
    } = useTasks(workspaceSlug, projectSlug);

    const {
        handleOpenProjectBoard,
        handleSettingProject
    } = useProjectNavigation(workspaceSlug);

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
            (projectMember) =>
                projectMember.user_id === workspaceMember.user.id,
        ),
    );

    const {
        isInviteMemberOpen,
        openInviteMember,
        closeInviteMember,
    } = useProjectMemberModal();

    const {
        handleAddProjectMember,
        isAdding,
    } = useAddProjectMember({
        workspaceSlug,

        onSuccess: async () => {
            await refetchProjectMembers();
            closeInviteMember();
        },
    });

    const {
        taskModal,
        openCreateTask,
        closeTaskModal,
    } = useProjectTaskModal();

    const handleCreateTask = () => {
        openCreateTask();
    };

    if (!project) {
        return (
            <SkeletonProjectsOverview />
        );
    }
    return (
        <div className="px-6 py-8 xl:px-8">
            <div className="w-full space-y-6">
                <ProjectDashboard
                    project={project}
                    tasks={tasks}
                    members={projectMembers}
                    onAddMember={openInviteMember}
                    onCreateTasks={handleCreateTask}
                    onOpenBoard={handleOpenProjectBoard}
                    onSettingProject={handleSettingProject}
                />
            </div>

            {/* <ProjectTaskModal
                open={taskModal.open}
                mode={taskModal.mode}
                task={taskModal.task}
                onClose={closeTaskModal}
            /> */}

            <InviteProjectMemberModal
                open={isInviteMemberOpen}
                users={availableMembers}
                isSubmitting={isAdding}
                onClose={closeInviteMember}
                onConfirm={(userId) =>
                    handleAddProjectMember(
                        projectSlug,
                        userId,
                    )
                }
            />
        </div>
    )
}
