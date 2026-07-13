
import { Check } from 'lucide-react';
import { Input } from '@/components/ui';

import {
    SettingSection,
    SettingFooter,
} from "@/features/workspaces/components";

import type {
    WorkspaceColor,
    WorkspaceForm
} from "@/features/workspaces/types/settings";


const COLORS: WorkspaceColor[] = [
    { label: "Indigo", bg: "bg-indigo-500", ring: "ring-indigo-500" },
    { label: "Violet", bg: "bg-violet-500", ring: "ring-violet-500" },
    { label: "Blue", bg: "bg-blue-500", ring: "ring-blue-500" },
    { label: "Emerald", bg: "bg-emerald-500", ring: "ring-emerald-500" },
    { label: "Rose", bg: "bg-rose-500", ring: "ring-rose-500" },
    { label: "Amber", bg: "bg-amber-500", ring: "ring-amber-500" },
];

interface GeneralSettingsProps {
    wsForm: WorkspaceForm;
    color: WorkspaceColor;
    setColor: (color: WorkspaceColor) => void;
    onNameChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
    saved: boolean;
    onSave: () => void;
}

export default function GeneralSettings({
    wsForm,
    color,
    setColor,
    onNameChange,
    onDescriptionChange,
    saved,
    onSave,
}: GeneralSettingsProps) {
    return (
        <SettingSection title="Workspace Identity" desc="Basic information about your workspace.">
            <div className="space-y-4">
                {/* Icon + name row */}
                <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl ${color.bg} flex items-center justify-center text-white font-bold text-xl select-none shrink-0`}>
                        {wsForm.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
                    </div>
                    <div className="flex-1">
                        <p className="text-xs font-medium text-foreground mb-1.5">Workspace color</p>
                        <div className="flex gap-1.5">
                            {COLORS.map(c => (
                                <button key={c.label} onClick={() => setColor(c)} className={`w-6 h-6 rounded-md ${c.bg} flex items-center justify-center transition-all ${color.label === c.label ? `ring-2 ring-offset-1 ring-offset-card ${c.ring}` : "opacity-60 hover:opacity-100"}`}>
                                    {color.label === c.label && <Check size={10} className="text-white" strokeWidth={3} />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <Input
                    label="Workspace name"
                    value={wsForm.name}
                    onChange={(e) =>
                        onNameChange(e.target.value)
                    }
                />

                <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">Description</label>
                    <textarea
                        value={wsForm.desc}
                        onChange={(e) =>
                            onDescriptionChange(e.target.value)
                        }
                        rows={3}
                        className="w-full bg-input-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    />
                </div>
            </div>
            <SettingFooter onSave={onSave} saved={saved} />
        </SettingSection>
    )
}
