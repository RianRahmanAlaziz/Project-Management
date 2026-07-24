"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    DangerZoneSettings,
    NotificationSettings,
    SecuritySettings,
    GeneralSettings,
    WorkspaceSettingsSkeleton,
    DeleteWorkspaceModal,
    TransferOwnershipModal,
} from "@/features/workspaces/components";

import { SettingsSidebar } from "@/components/layouts/settings";
import { WORKSPACE_SETTINGS } from "@/features/workspaces/constants/settings";

import {
    useUpdateWorkspace,
    useDetailWorkspace,
    useDeleteWorkspace,
    useTransferWorkspaceOwnership,
} from "@/features/workspaces/hooks";

import { useWorkspaceMembers } from "@/features/members/hooks";

import type { UpdateWorkspacePayload } from "@/features/workspaces/types/workspace";

interface WorkspaceSettingsProps {
    workspaceSlug: string;
}

export default function WorkspaceSettings({
    workspaceSlug
}: WorkspaceSettingsProps) {
    const router = useRouter();
    const [activeSection, setActiveSection] = useState("general");
    const [confirmDelete, setConfirmDelete] = useState("");
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [workspaceData, setWorkspaceData] = useState<UpdateWorkspacePayload | null>(null);

    const {
        members,
        isLoading: isLoadingMembers,
    } = useWorkspaceMembers(workspaceSlug);

    const {
        workspace,
        isLoading,
        error,
    } = useDetailWorkspace(workspaceSlug);

    useEffect(() => {
        if (!workspace) {
            return;
        }

        setWorkspaceData({
            name: workspace.name,
            description: workspace.description ?? "",
            color: workspace.color,
        });
    }, [workspace]);

    const updateWorkspaceField = <
        K extends keyof UpdateWorkspacePayload,
    >(
        field: K,
        value: UpdateWorkspacePayload[K],
    ) => {
        setWorkspaceData((current) => {
            if (!current) {
                return current;
            }

            return {
                ...current,
                [field]: value,
            };
        });
    };

    const {
        handleUpdateWorkspace,
        isUpdating,
        updateError,
        isSaved,
    } = useUpdateWorkspace({
        workspaceSlug,
        onSuccess: (updatedWorkspace) => {
            setWorkspaceData({
                name: updatedWorkspace.name,
                description:
                    updatedWorkspace.description ?? "",
                color: updatedWorkspace.color,
            });

            if (
                updatedWorkspace.slug !==
                workspaceSlug
            ) {
                router.replace(
                    `/workspaces/${updatedWorkspace.slug}/settings`,
                );
            }
        },
    });

    const handleSaveGeneral =
        async (): Promise<void> => {
            if (!workspaceData) {
                return;
            }

            await handleUpdateWorkspace({
                name: workspaceData.name.trim(),
                description: workspaceData.description.trim(),
                color: workspaceData.color,
            });
        };

    const {
        handleDeleteWorkspace,
        isDeleting,
        deleteError,
    } = useDeleteWorkspace({
        workspaceSlug,

        onSuccess: () => {
            router.replace("/workspaces");
            router.refresh();
        },
    });

    const handleOpenDeleteModal = () => {
        setDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        if (isDeleting) {
            return;
        }

        setDeleteModalOpen(false);
    };

    const [
        transferModalOpen,
        setTransferModalOpen,
    ] = useState(false);

    const handleOpenTransferModal = () => {
        setTransferModalOpen(true);
    };

    const {
        handleTransferOwnership,
        isTransferring,
        transferError,
    } = useTransferWorkspaceOwnership({
        workspaceSlug,

        onSuccess: (updatedWorkspace) => {
            setTransferModalOpen(false);

            router.replace(
                `/workspaces/${updatedWorkspace.slug}`,
            );

            router.refresh();
        },
    });

    const handleCloseTransferModal = () => {
        if (isTransferring) {
            return;
        }

        setTransferModalOpen(false);
    };

    if (isLoading || !workspaceData) {
        return <WorkspaceSettingsSkeleton />;
    }

    if (error || !workspace) {
        return (
            <div className="p-6">
                <p className="text-sm text-destructive">
                    {error ??
                        "Workspace not found."}
                </p>
            </div>
        );
    }

    if (!workspaceData) {
        return <WorkspaceSettingsSkeleton />;
    }

    return (
        <>
            <div className="flex h-full flex-1 flex-col overflow-hidden">
                <div className="flex flex-1 overflow-hidden">

                    <SettingsSidebar
                        title="Workspace"
                        items={WORKSPACE_SETTINGS}
                        activeItem={activeSection}
                        onChange={setActiveSection}
                    />

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="max-w space-y-6">
                            {activeSection === "general" && (
                                <GeneralSettings
                                    workspace={workspaceData}
                                    isSubmitting={isUpdating}
                                    isSaved={isSaved}
                                    error={updateError}
                                    onChange={updateWorkspaceField}
                                    onSave={
                                        handleSaveGeneral
                                    }
                                />
                            )}

                            {/* {activeSection === "security" && (
                            <SecuritySettings
                                toggles={toggles}
                                toggle={toggle}
                                saved={saved}
                                onSave={handleSave}
                            />
                        )}

                        {activeSection === "notifications" && (
                            <NotificationSettings
                                toggles={toggles}
                                toggle={toggle}
                                saved={saved}
                                onSave={handleSave}
                            />
                        )} */}


                            {activeSection === "danger" && (
                                <DangerZoneSettings
                                    workspaceSlug={workspace.slug}
                                    confirmDelete={confirmDelete}
                                    onConfirmDeleteChange={setConfirmDelete}
                                    onOpenDeleteModal={handleOpenDeleteModal}
                                    onOpenTransferModal={handleOpenTransferModal}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <TransferOwnershipModal
                open={transferModalOpen}
                members={members}
                isSubmitting={isTransferring}
                error={transferError}
                onClose={handleCloseTransferModal}
                onConfirm={(userId) => handleTransferOwnership({ user_id: userId })}
            />

            <DeleteWorkspaceModal
                open={deleteModalOpen}
                workspace={workspace}
                isSubmitting={isDeleting}
                error={deleteError}
                onClose={handleCloseDeleteModal}
                onConfirm={handleDeleteWorkspace}
            />
        </>
    )
}


