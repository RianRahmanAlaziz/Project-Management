"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    DangerZoneSettings,
    NotificationSettings,
    SecuritySettings,
    GeneralSettings,
    WorkspaceSettingsSkeleton,
} from "@/features/workspaces/components";

import { SettingsSidebar } from "@/components/layouts/settings";

import { WORKSPACE_SETTINGS } from "@/features/workspaces/constants/settings";

import {
    useUpdateWorkspace,
    useDetailWorkspace,
} from "@/features/workspaces/hooks";

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

    const {
        workspace,
        isLoading,
        error,
    } = useDetailWorkspace(workspaceSlug);

    const [workspaceData, setWorkspaceData] = useState<UpdateWorkspacePayload | null>(null);

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
                    <div className="max-w-2xl space-y-6">
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
                                workspaceSlug={workspaceSlug}
                                confirmDelete={confirmDelete}
                                setConfirmDelete={setConfirmDelete}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}


