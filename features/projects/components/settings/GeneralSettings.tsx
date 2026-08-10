
import { Dispatch, SetStateAction } from "react";
import { Check, Hash } from 'lucide-react';
import { Input } from '@/components/ui';
import {
    Combobox,
    DatePicker,
} from "@/components/ui";

import {
    Color,
    COLORS,
    priorityOptions,
    statusOptions,
} from "@/components/constants";

import {
    SettingSection,
    SettingFooter,
} from "@/components/layouts/settings";


import type {
    ProjectForm,
} from "@/features/projects/types/settings";

interface GeneralSettingsProps {
    color: Color;
    setColor: (
        color: Color
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
                                {COLORS.map(c => (
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
                </div>
                <SettingFooter onSave={onSave} saved={saved} />
            </SettingSection>

            <SettingSection title="Schedule & Status" desc="Dates, priority, and current status.">
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <DatePicker
                            label="Start date"
                            value={projForm.startDate}
                            onChange={(value) =>
                                setProjForm((prev) => ({
                                    ...prev,
                                    startDate: value,
                                }))
                            }
                        />
                    </div>

                    <div>
                        <DatePicker
                            label="Due date"
                            value={projForm.dueDate}
                            onChange={(value) =>
                                setProjForm((prev) => ({
                                    ...prev,
                                    dueDate: value,
                                }))
                            }
                        />
                    </div>

                    <div>
                        <Combobox
                            label="Status"
                            placeholder="Select Status"
                            value={projForm.status}
                            onValueChange={(value) =>
                                setProjForm((prev) => ({
                                    ...prev,
                                    status: value,
                                }))
                            }
                            searchable={false}
                            options={statusOptions}
                        />
                    </div>

                    <div>
                        <Combobox
                            label="Priority"
                            placeholder="Select Priority"
                            value={projForm.priority}
                            onValueChange={(value) =>
                                setProjForm((prev) => ({
                                    ...prev,
                                    priority: value,
                                }))
                            }
                            searchable={false}
                            options={priorityOptions}
                        />
                    </div>
                </div>
                <SettingFooter onSave={onSave} saved={saved} />
            </SettingSection>
        </>
    )
}
