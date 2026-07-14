"use client"

import { useState } from "react";
import { SettingsSidebar } from "@/components/layouts/settings";

import { NAV_Projets } from "@/features/projects/constants/settings"

import {
    PROJECT_COLORS,
} from "@/features/projects/constants/settings";


import GeneralSettings from "../components/settings/GeneralSettings";
import WorkflowSettings from "../components/settings/WorkflowSettings";
import NotificationsSettings from "../components/settings/NotificationsSettings";
import DangerZoneSettings from "../components/settings/DangerZoneSettings";
import { DEFAULT_WORKFLOW_COLUMNS } from "../constants/workflow";


type Toggle = { taskAssigned: boolean; taskUpdated: boolean; newComment: boolean; dailyDigest: boolean; };

interface ProjectSettingsViewProps {
    workspaceSlug: string;
    projectSlug: string;
}
export default function ProjectSettingsView({
    workspaceSlug,
    projectSlug
}: ProjectSettingsViewProps) {

    const [section, setSection] = useState("general");
    const [color, setColor] = useState(PROJECT_COLORS[0]);
    const [saved, setSaved] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState("");

    const [columns, setColumns] = useState(
        DEFAULT_WORKFLOW_COLUMNS
    );

    const [toggles, setToggles] = useState<Toggle>({ taskAssigned: true, taskUpdated: false, newComment: true, dailyDigest: false });
    const [projForm, setProjForm] = useState({
        name: "ProjectFlow v2.0",
        description: "Rebuilding the core product — new architecture, redesigned UX, and full design system.",
        identifier: "PF2",
        status: "In Progress",
        priority: "High",
        startDate: "2026-05-01",
        dueDate: "2026-07-15",
    });

    const toggle = (k: keyof Toggle) => setToggles(t => ({ ...t, [k]: !t[k] }));
    const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };


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
                                saved={saved}
                                onSave={handleSave} />
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
