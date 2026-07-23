
import { Check } from 'lucide-react';
import { Input } from '@/components/ui';

import {
    SettingSection,
    SettingFooter,
} from "@/components/layouts/settings";

import {
    WORKSPACE_COLORS,
} from "@/features/workspaces/constants/workspaceStyles";


import {
    getWorkspaceInitials,
} from "../../utils/getWorkspaceInitials";

import type {
    UpdateWorkspacePayload,
} from "@/features/workspaces/types/workspace";


interface GeneralSettingsProps {
    workspace: UpdateWorkspacePayload;
    isSubmitting: boolean;
    isSaved: boolean;
    error: string | null;

    onChange: < K extends keyof UpdateWorkspacePayload >(
        field: K,
        value: UpdateWorkspacePayload[K],
    ) => void;

    onSave: () => Promise<void> | void;
}

export default function GeneralSettings({
    workspace,
    isSubmitting,
    isSaved,
    error,
    onChange,
    onSave,
}: GeneralSettingsProps) {

    return (
        <SettingSection title="Workspace Identity" desc="Basic information about your workspace.">
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl ${workspace.color} flex items-center justify-center text-white font-bold text-xl select-none shrink-0`}>
                        {getWorkspaceInitials(workspace.name)}
                    </div>
                    <div className="flex-1">
                        <p className="text-xs font-medium text-foreground mb-1.5">Workspace color</p>
                        <div className="flex gap-1.5">
                            {WORKSPACE_COLORS.map(
                                (color) => (
                                    <button
                                        key={color.bg}
                                        type="button"
                                        onClick={() =>
                                            onChange("color", color.bg)
                                        }
                                        className={`cursor-pointer flex h-6 w-6 items-center justify-center rounded-md
                                            ${color.bg}
                                            transition-all
                                            ${workspace.color ===
                                                color.bg
                                                ? `ring-2 ring-offset-1 ring-offset-card ${color.ring}`
                                                : "opacity-60 hover:opacity-100"
                                            }
                                        `}
                                        aria-label={color.label}
                                    >
                                        {workspace.color === color.bg && (
                                            <Check
                                                size={10}
                                                className="text-white"
                                                strokeWidth={3}
                                            />
                                        )}
                                    </button>
                                ),
                            )}
                        </div>
                    </div>
                </div>

                <Input
                    label="Workspace name"
                    value={workspace.name}
                    onChange={(event) =>
                        onChange(
                            "name",
                            event.target.value,
                        )
                    }
                />

                <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">Description</label>
                    <textarea
                        value={
                            workspace.description
                        }
                        onChange={(event) =>
                            onChange(
                                "description",
                                event.target.value,
                            )
                        }
                        rows={3}
                        className="w-full bg-input-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    />
                </div>
                {error && (
                    <p className="text-sm text-destructive">
                        {error}
                    </p>
                )}
            </div>
            <SettingFooter
                onSave={onSave}
                saved={isSaved}
                isSubmitting={isSubmitting}
                disabled={!workspace.name.trim()}
            />
        </SettingSection>
    )
}
