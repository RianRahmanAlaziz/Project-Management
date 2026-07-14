"use client"

import { useState } from "react";

import {
    DangerZoneSettings,
    NotificationSettings,
    SecuritySettings,
    GeneralSettings,
} from "@/features/workspaces/components";

import { SettingsSidebar } from "@/components/layouts/settings";

import { WORKSPACE_SETTINGS } from "@/features/workspaces/constants/settings";

const COLORS = [
    { label: "Indigo", bg: "bg-indigo-500", ring: "ring-indigo-500" },
    { label: "Violet", bg: "bg-violet-500", ring: "ring-violet-500" },
    { label: "Blue", bg: "bg-blue-500", ring: "ring-blue-500" },
    { label: "Emerald", bg: "bg-emerald-500", ring: "ring-emerald-500" },
    { label: "Rose", bg: "bg-rose-500", ring: "ring-rose-500" },
    { label: "Amber", bg: "bg-amber-500", ring: "ring-amber-500" },
];

type Toggle = {
    taskAssigned: boolean; taskUpdated: boolean; newComment: boolean;
    weeklyDigest: boolean; memberJoined: boolean; projectCreated: boolean;
};

interface WorkspaceForm {
    name: string;
    desc: string;
    url: string;
    email: string;
}

interface WorkspaceSettingsProps {
    workspaceSlug: string;
}

export default function WorkspaceSettings({
    workspaceSlug
}: WorkspaceSettingsProps) {

    const [activeSection, setActiveSection] = useState("general");
    const [color, setColor] = useState(COLORS[0]);
    const [saved, setSaved] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState("");
    const [toggles, setToggles] = useState<Toggle>({
        taskAssigned: true, taskUpdated: true, newComment: true,
        weeklyDigest: false, memberJoined: true, projectCreated: false,
    });

    const [wsForm, setWsForm] = useState<WorkspaceForm>({
        name: "Acme Corp",
        desc: "Main product workspace...",
        url: "acme-corp",
        email: "admin@acme.com",
    });

    const toggle = (k: keyof Toggle) => setToggles(t => ({ ...t, [k]: !t[k] }));

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

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
                                wsForm={wsForm}
                                color={color}
                                setColor={setColor}
                                saved={saved}
                                onSave={handleSave}
                                onNameChange={(value) =>
                                    setWsForm((prev) => ({
                                        ...prev,
                                        name: value,
                                    }))
                                }
                                onDescriptionChange={(value) =>
                                    setWsForm((prev) => ({
                                        ...prev,
                                        desc: value,
                                    }))
                                }
                            />
                        )}

                        {activeSection === "security" && (
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
                        )}


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


