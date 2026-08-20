"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { SettingsSidebar } from "@/components/layouts/settings";
import {
    NAV_Projets,
} from "@/features/projects/constants/settings";

import {
    Color,
    COLORS,
} from "@/components/constants";

import {
    GeneralSettings,
    WorkflowSettings,
    NotificationsSettings,
    DangerZoneSettings,
    ProjectsSettingsSkeleton,
    DeleteProjectModal,
    WorkflowColumnModal,
} from "@/features/projects/components";

import type { NotificationToggle } from "@/features/projects/types/notifications";

import type { ProjectForm } from "@/features/projects/types/settings";

import {
    useOverviewProject,
    useUpdateProject,
    useProjectColumns,
    useCreateProjectColumn,
    useReorderProjectColumns,
    useUpdateProjectColumn,
    useDeleteProjectColumn,
    useDeleteProject,
    useProjectModals,
} from "../hooks";
import { CreateWorkflowColumnPayload, WorkflowColumn } from "../types/workflow";

interface ProjectSettingsViewProps {
    workspaceSlug: string;
    projectSlug: string;
}
export default function ProjectSettingsView({
    workspaceSlug,
    projectSlug
}: ProjectSettingsViewProps) {
    const router = useRouter();
    const [section, setSection] = useState("general");
    const [toggles, setToggles] = useState<NotificationToggle>({
        taskAssigned: true,
        taskUpdated: false,
        newComment: true,
        dailyDigest: false,
    });

    const [color, setColor] = useState<Color>(COLORS[0]);
    const initialColumnsRef = useRef<WorkflowColumn[]>([]);

    const {
        project,
        isLoading,
        refetch,
    } = useOverviewProject(
        workspaceSlug,
        projectSlug,
    );

    const [projForm, setProjForm] = useState<ProjectForm>({
        name: "",
        description: "",
        identifier: "",
        status: "",
        priority: "",
        startDate: "",
        dueDate: "",
    });

    useEffect(() => {
        if (!project) {
            return;
        }

        setProjForm({
            name: project.name,
            description: project.description ?? "",
            identifier: "",
            status: project.status,
            priority: project.priority,
            startDate: project.start_date ?? "",
            dueDate: project.due_date ?? "",
        });
    }, [project]);

    useEffect(() => {
        if (!project) {
            return;
        }

        const selectedColor = COLORS.find(
            (item) => item.bg === project.color,
        );

        if (selectedColor) {
            setColor(selectedColor);
        }
    }, [project]);

    const {
        handleUpdateProject,
        isSaved: isGeneralSaved,
    } = useUpdateProject({
        workspaceSlug,
        projectSlug,
        onSuccess: async (updatedProject) => {
            if (updatedProject.slug !== projectSlug) {
                router.replace(
                    `/workspaces/${workspaceSlug}/projects/${updatedProject.slug}/settings`,
                );
                return;
            }

            await refetch();
        },
    });

    const handleSaveGeneral = async () => {
        await handleUpdateProject({
            name: projForm.name.trim(),
            description: projForm.description.trim(),
            color: color.bg,
            status: projForm.status,
            start_date: projForm.startDate || undefined,
            due_date: projForm.dueDate || undefined,
        });
    };


    const {
        columns,
        setColumns,
        isLoading: isColumnsLoading,
        refetch: refetchColumns,
    } = useProjectColumns({
        workspaceSlug,
        projectSlug,
    });

    useEffect(() => {
        if (
            columns.length > 0 &&
            initialColumnsRef.current.length === 0
        ) {
            initialColumnsRef.current =
                columns.map((column) => ({
                    ...column,
                }));
        }
    }, [columns]);

    const {
        handleCreateColumn,
        isCreating,
    } = useCreateProjectColumn({
        workspaceSlug,
        projectSlug,

        onSuccess: async () => {
            await refetchColumns();
            initialColumnsRef.current = [];
            workflowModal.close();
        },
    });

    const {
        handleUpdateColumn,
        isUpdating: isUpdatingColumn,
    } = useUpdateProjectColumn({
        workspaceSlug,
        projectSlug,
    });

    const {
        handleReorderColumns,
        isReordering,
    } = useReorderProjectColumns({
        workspaceSlug,
        projectSlug,
    });

    const handleAutoSaveReorder = async (
        reorderedColumns: WorkflowColumn[],
    ) => {
        await handleReorderColumns(
            reorderedColumns.map(
                (column, index) => ({
                    id: column.id,
                    position: index + 1,
                }),
            ),
        );

        await refetchColumns();
    };

    const {
        handleDeleteColumn,
        isDeleting: deleteProjectColumn,
    } = useDeleteProjectColumn({
        workspaceSlug,
        projectSlug,

        onSuccess: async () => {
            await refetchColumns();
            initialColumnsRef.current = [];
        },
    });

    const handleToggleColumn = async (
        column: WorkflowColumn,
    ) => {
        await handleUpdateColumn(column.id, {
            enabled: !column.enabled,
        });

        await refetchColumns();
    };

    const toggle = (
        key: keyof NotificationToggle,
    ) => {
        setToggles((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const {
        project: projectModal,
        workflow: workflowModal,
    } = useProjectModals();

    const {
        handleDeleteProject,
        isDeleting: isDeletingProject,
        deleteError,
    } = useDeleteProject({
        workspaceSlug,
        projectSlug,
        onSuccess: () => {
            projectModal.closeDelete();
            projectModal.setConfirmDelete("");
            router.replace(`/workspaces/${workspaceSlug}/projects`);
            router.refresh();
        },
    });

    const handleWorkflowColumnSubmit = async (
        payload: CreateWorkflowColumnPayload,
    ) => {
        if (workflowModal.modal.mode === "create") {
            await handleCreateColumn(payload);
            return;
        }

        const column = workflowModal.modal.column;

        if (!column) {
            return;
        }

        await handleUpdateColumn(column.id, {
            name: payload.name,
            description: payload.description,
            color: payload.color,
            is_completed: payload.is_completed,
        });

        await refetchColumns();
        initialColumnsRef.current = [];
        workflowModal.close();
    };

    if (isLoading) {
        return (
            <ProjectsSettingsSkeleton />
        );
    }

    if (!project) {
        return (
            <div className="flex h-full items-center justify-center p-6">
                <p className="text-sm text-muted-foreground">
                    Project not found.
                </p>
            </div>
        );
    }


    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden">
            <div className="flex flex-1 overflow-hidden">
                <SettingsSidebar
                    title="Project"
                    items={NAV_Projets}
                    activeItem={section}
                    onChange={setSection}
                />

                <div className="flex-1 overflow-y-auto p-6">
                    <div className="max-w space-y-6">
                        {section === "general" && (
                            <GeneralSettings
                                color={color}
                                setColor={setColor}
                                projForm={projForm}
                                setProjForm={setProjForm}
                                saved={isGeneralSaved}
                                onSave={handleSaveGeneral}
                            />
                        )}

                        {section === "workflow" && (
                            <WorkflowSettings
                                columns={columns}
                                setColumns={setColumns}
                                isSaving={
                                    isCreating ||
                                    isUpdatingColumn ||
                                    isReordering
                                }
                                onOpenCreateColumn={workflowModal.openCreate}
                                onEdit={workflowModal.openEdit}
                                onReorder={handleAutoSaveReorder}
                                onToggle={handleToggleColumn}
                                onDelete={handleDeleteColumn}
                            />
                        )}

                        {section === "notifications" && (
                            <NotificationsSettings
                                toggles={toggles}
                                toggle={toggle}
                                saved={false}
                                onSave={() => { }}
                            />
                        )}

                        {section === "danger" && (
                            <DangerZoneSettings
                                projectSlug={projectSlug}
                                confirmDelete={projectModal.confirmDelete}
                                setConfirmDelete={projectModal.setConfirmDelete}
                                onOpenDeleteModal={projectModal.openDelete}
                            />
                        )}
                    </div>
                </div>
            </div>

            <WorkflowColumnModal
                open={workflowModal.modal.open}
                mode={workflowModal.modal.mode}
                column={workflowModal.modal.column}
                isSubmitting={isCreating || isUpdatingColumn}
                onClose={workflowModal.close}
                onSubmit={handleWorkflowColumnSubmit}
            />

            <DeleteProjectModal
                open={projectModal.deleteOpen}
                project={project}
                isSubmitting={isDeletingProject}
                error={deleteError}
                onClose={projectModal.closeDelete}
                onConfirm={handleDeleteProject}
            />
        </div>
    )
}
