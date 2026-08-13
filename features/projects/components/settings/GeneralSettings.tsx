import { Dispatch, SetStateAction } from "react";
import {
    CalendarDays,
    Check,
    Flag,
} from "lucide-react";

import {
    Combobox,
    DatePicker,
    Input,
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
    setColor: (color: Color) => void;

    projForm: ProjectForm;
    setProjForm: Dispatch<
        SetStateAction<ProjectForm>
    >;

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
    const initials =
        projForm.name
            .trim()
            .split(/\s+/)
            .map((word) => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "PR";

    return (
        <SettingSection
            title="Project Identity"
            desc="Basic information and branding for this project."
        >
            <div className="space-y-6">

                {/* Project Identity */}
                <div className="flex items-center gap-4">
                    <div
                        className={`
                            flex
                            h-14
                            w-14
                            shrink-0
                            items-center
                            justify-center
                            rounded-2xl
                            ${color.bg}
                            text-lg
                            font-bold
                            text-white
                            shadow-sm
                        `}
                    >
                        {initials}
                    </div>

                    <div className="min-w-0 flex-1">
                        <p className="mb-2 text-xs font-medium text-foreground">
                            Project color
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {COLORS.map((item) => {
                                const selected =
                                    color.label === item.label;

                                return (
                                    <button
                                        key={item.label}
                                        type="button"
                                        title={item.label}
                                        aria-label={`Select ${item.label} project color`}
                                        onClick={() =>
                                            setColor(item)
                                        }
                                        className={`
                                            flex
                                            h-7
                                            w-7
                                            cursor-pointer
                                            items-center
                                            justify-center
                                            rounded-lg
                                            ${item.bg}
                                            transition-all
                                            duration-150
                                            ${selected
                                                ? `ring-2 ${item.ring} ring-offset-2 ring-offset-card`
                                                : "opacity-60 hover:scale-105 hover:opacity-100"
                                            }
                                        `}
                                    >
                                        {selected && (
                                            <Check
                                                size={12}
                                                strokeWidth={3}
                                                className="text-white"
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Project Name */}
                <Input
                    label="Project name"
                    value={projForm.name}
                    onChange={(e) =>
                        setProjForm((prev) => ({
                            ...prev,
                            name: e.target.value,
                        }))
                    }
                />

                {/* Description */}
                <div>
                    <label className="mb-1.5 block text-xs font-medium text-foreground">
                        Description
                    </label>

                    <textarea
                        value={projForm.description}
                        onChange={(e) =>
                            setProjForm((prev) => ({
                                ...prev,
                                description: e.target.value,
                            }))
                        }
                        rows={5}
                        placeholder="Describe the purpose, goals, or scope of this project..."
                        className="
                            min-h-32
                            w-full
                            resize-y
                            rounded-lg
                            border
                            border-border
                            bg-input-background
                            px-3
                            py-2.5
                            text-sm
                            leading-relaxed
                            text-foreground
                            placeholder:text-muted-foreground
                            focus:outline-none
                            focus:ring-2
                            focus:ring-ring
                        "
                    />
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <DatePicker
                        label={
                            <span className="flex items-center gap-1.5">
                                <CalendarDays size={12} />
                                Start date
                            </span>
                        }
                        value={projForm.startDate}
                        onChange={(value) =>
                            setProjForm((prev) => ({
                                ...prev,
                                startDate: value,
                            }))
                        }
                    />

                    <DatePicker
                        label={
                            <span className="flex items-center gap-1.5">
                                <Flag size={12} />
                                Due date
                            </span>
                        }
                        value={projForm.dueDate}
                        onChange={(value) =>
                            setProjForm((prev) => ({
                                ...prev,
                                dueDate: value,
                            }))
                        }
                    />
                </div>

                {/* Status & Priority */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Combobox
                        label={
                            <span className="flex items-center gap-1.5">
                                <Check size={12} />
                                Status
                            </span>
                        }
                        placeholder="Select status"
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

                    <Combobox
                        label={
                            <span className="flex items-center gap-1.5">
                                <Flag size={12} />
                                Priority
                            </span>
                        }
                        placeholder="Select priority"
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

            <SettingFooter
                saved={saved}
                onSave={onSave}
            />
        </SettingSection>
    );
}