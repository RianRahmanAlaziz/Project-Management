"use client";

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

import { useTasks } from "@/features/tasks/hooks/useTasks";
import { useWorkspaceMembers } from "@/features/members/hooks";

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
    } = useOverviewProject(workspaceSlug, projectSlug);

    const { tasks } = useTasks(workspaceSlug, projectSlug);

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
            (projectMember) =>
                projectMember.user_id === workspaceMember.user.id,
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

        </div>
    )
}
