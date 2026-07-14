
import { Dispatch, SetStateAction } from "react";
import { Check, Hash } from 'lucide-react';
import { Input } from '@/components/ui';

import {
    SettingSection,
    SettingFooter,
} from "@/components/layouts/settings";

import {
    PROJECT_COLORS,
} from "@/features/projects/constants/settings";

import type {
    ProjectColor,
    ProjectForm,
} from "@/features/projects/types/settings";

interface GeneralSettingsProps {
    color: ProjectColor;
    setColor: (
        color: ProjectColor
    ) => void;
    projForm: ProjectForm;
    setProjForm: Dispatch<SetStateAction<ProjectForm>>;

    saved: boolean;
    onSave: () => void;
}

export default function GeneralSettings({
    color,
    setColor,
    projForm,
    setProjForm,
    saved,
    onSave,
}: GeneralSettingsProps) {
    return (
        <>
            <SettingSection title="Project Identity" desc="Basic information and branding for this project.">
                <div className="space-y-4">
                    {/* Icon preview */}
                    <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl ${color.bg} flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-md`}>
                            {projForm.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-medium text-foreground mb-1.5">Project color</p>
                            <div className="flex gap-1.5 flex-wrap">
                                {PROJECT_COLORS.map(c => (
                                    <button key={c.label} onClick={() => setColor(c)} className={`cursor-pointer w-6 h-6 rounded-md ${c.bg} flex items-center justify-center transition-all ${color.label === c.label ? `ring-2 ring-offset-1 ring-offset-card ${c.ring}` : "opacity-60 hover:opacity-100"}`}>
                                        {color.label === c.label && <Check size={10} className="text-white" strokeWidth={3} />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <Input label="Project name" value={projForm.name} onChange={e => setProjForm(f => ({ ...f, name: e.target.value }))} />
                    <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Description</label>
                        <textarea
                            value={projForm.description}
                            onChange={e => setProjForm(f => ({ ...f, description: e.target.value }))}
                            rows={3}
                            className="w-full bg-input-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">
                            <Hash size={11} className="inline mr-1" />Project identifier
                        </label>
                        <input
                            value={projForm.identifier}
                            onChange={e => setProjForm(f => ({ ...f, identifier: e.target.value.toUpperCase().slice(0, 5) }))}
                            maxLength={5}
                            className="w-32 h-8 bg-input-background border border-border rounded-lg px-3 text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                        <p className="text-xs text-muted-foreground mt-1">Used as prefix for task IDs (e.g. {projForm.identifier}-42)</p>
                    </div>
                </div>
                <SettingFooter onSave={onSave} saved={saved} />
            </SettingSection>

            <SettingSection title="Schedule & Status" desc="Dates, priority, and current status.">
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Start date</label>
                        <input type="date" value={projForm.startDate} onChange={e => setProjForm(f => ({ ...f, startDate: e.target.value }))} className="w-full h-8 bg-input-background border border-border rounded-lg px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Due date</label>
                        <input type="date" value={projForm.dueDate} onChange={e => setProjForm(f => ({ ...f, dueDate: e.target.value }))} className="w-full h-8 bg-input-background border border-border rounded-lg px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Status</label>
                        <select value={projForm.status} onChange={e => setProjForm(f => ({ ...f, status: e.target.value }))} className="w-full h-8 bg-input-background border border-border rounded-lg px-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                            {["Todo", "In Progress", "Review", "Done"].map(s => <option key={s}>{s}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-foreground mb-1.5">Priority</label>
                        <select value={projForm.priority} onChange={e => setProjForm(f => ({ ...f, priority: e.target.value }))} className="w-full h-8 bg-input-background border border-border rounded-lg px-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                            {["Low", "Medium", "High"].map(p => <option key={p}>{p}</option>)}
                        </select>
                    </div>
                </div>
                <SettingFooter onSave={onSave} saved={saved} />
            </SettingSection>
        </>
    )
}
