"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SettingsSidebar } from "@/components/layouts/settings";
import {
    NAV_Projets,
} from "@/features/projects/constants/settings";

import {
    Color,
    COLORS,
    priorityOptions,
    statusOptions,
} from "@/components/constants";

import {
    GeneralSettings,
    WorkflowSettings,
    NotificationsSettings,
    DangerZoneSettings,
} from "@/features/projects/components";

import type {
    NotificationToggle,
} from "@/features/projects/types/notifications";

import type {
    ProjectForm,
} from "@/features/projects/types/settings";


import { useOverviewProject, useProjectColumns, useUpdateProject } from "../hooks";
import ProjectsSettingsSkeleton from "../components/skeleton/ProjectsSettingsSkeleton";

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

    const toggle = (key: keyof NotificationToggle) => {
        setToggles(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const [color, setColor] = useState<Color>(COLORS[0]);
    const [saved, setSaved] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState("");

    const {
        columns,
        setColumns,
        isLoading: isColumnsLoading,
        error: columnsError,
        refetch: refetchColumns,
    } = useProjectColumns({
        workspaceSlug,
        projectSlug,
    });

    const [projForm, setProjForm] =
        useState<ProjectForm>({
            name: "",
            description: "",
            identifier: "",
            status: "",
            priority: "",
            startDate: "",
            dueDate: "",
        });

    const {
        project,
        isLoading,
        error,
        refetch,
    } = useOverviewProject(workspaceSlug, projectSlug);

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
        isUpdating,
        updateError,
        isSaved,
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

    const handleSave = () => {
        setSaved(true);

        setTimeout(() => {
            setSaved(false);
        }, 2000);
    };

    if (isLoading || !projForm) {
        return <ProjectsSettingsSkeleton />;
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
                    <div className="max-w-2xl space-y-6">
                        {section === "general" && (
                            <GeneralSettings
                                color={color}
                                setColor={setColor}
                                projForm={projForm}
                                setProjForm={setProjForm}
                                saved={isSaved}
                                onSave={handleSaveGeneral}
                            />
                        )}

                        {section === "workflow" && (
                            <WorkflowSettings
                                columns={columns}
                                setColumns={setColumns}
                                saved={saved}
                                onSave={handleSave}
                            />
                        )}

                        {section === "notifications" && (
                            <NotificationsSettings
                                toggles={toggles}
                                toggle={toggle}
                                saved={saved}
                                onSave={handleSave}
                            />
                        )}

                        {section === "danger" && (
                            <DangerZoneSettings
                                projectSlug={projectSlug}
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
