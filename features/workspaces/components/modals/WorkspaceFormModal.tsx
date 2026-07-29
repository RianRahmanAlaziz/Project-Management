"use client";

import { useEffect, useState } from "react";

import {
    Check,
    Palette,
    X,
    Shield,
    UserCheck,
    Eye,
} from "lucide-react";

import {
    Modal,
    Button,
    Combobox,
} from "@/components/ui";

import {
    WORKSPACE_COLORS,
    type WorkspaceColor,
} from "../../constants/workspaceStyles";

import type {
    WorkspaceFormData,
} from "../../types/workspace";
import { Users } from "@/features/users/types/users";
import { ROLE_OPTIONS } from "@/features/workspaces/constants/RoleOptions";

const STEPS = [
    "Details",
    "Invite",
] as const;

type Step = typeof STEPS[number];


interface WorkspaceFormModalProps {
    open: boolean;
    users: Users[];
    isSubmitting?: boolean;
    onClose: () => void;
    onSubmit: (
        data: WorkspaceFormData,
    ) => Promise<void> | void;
}

export default function WorkspaceFormModal({
    open,
    users,
    isSubmitting = false,
    onClose,
    onSubmit,
}: WorkspaceFormModalProps) {
    const [step, setStep] = useState<Step>("Details");
    const [color, setColor] = useState<WorkspaceColor>(WORKSPACE_COLORS[0],);
    const [form, setForm] = useState<
        Omit<WorkspaceFormData, "color">
    >({
        name: "",
        description: "",
        invites: [
            {
                userId: "",
                role: "",
            },
        ],
    });

    const addInvite = () => {
        setForm((current) => ({
            ...current,

            invites: [
                ...current.invites,
                {
                    userId: "",
                    role: "",
                },
            ],
        }));
    };

    const updateInvite = (
        index: number,
        field: "userId" | "role",
        value: string,
    ) => {
        setForm((current) => {
            const invites = [...current.invites];

            invites[index] = {
                ...invites[index],
                [field]: value,
            };

            return {
                ...current,
                invites,
            };
        });
    };

    const removeInvite = (
        index: number
    ) => {
        setForm(prev => ({
            ...prev,
            invites:
                prev.invites.filter(
                    (_, i) => i !== index
                )
        }));
    };

    useEffect(() => {
        if (!open) {
            return;
        }

        setStep("Details");

        setForm({
            name: "",
            description: "",
            invites: [],
        });

        setColor(WORKSPACE_COLORS[0]);
    }, [open]);

    const stepIndex = STEPS.indexOf(step);

    const next = async () => {
        if (step === "Invite") {
            await onSubmit({
                ...form,
                color: color.bg,
            });
            return;
        }
        setStep(STEPS[stepIndex + 1]);

    };

    const back = () => {
        if (stepIndex === 0) {
            onClose();
            return;
        }
        setStep(
            STEPS[stepIndex - 1]
        );
    };

    const initials = form.name
        .split(" ")
        .map(x => x[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "W";

    const canNext = form.name.trim().length >= 2;

    const userOptions = users.map((user) => ({
        value: String(user.id),
        label: user.name,
        description: user.email,
    }));

    return (
        <Modal
            open={open}
            onClose={onClose}
            size="md"
        >
            <div className="space-y-6">
                {/* HEADER */}
                <div className="flex items-center gap-3 border-b border-border shrink-0 pb-5">
                    <div>
                        <h2 className="font-semibold">
                            Create Workspace
                        </h2>
                        <p className="text-xs text-muted-foreground">
                            Step {stepIndex + 1} of {STEPS.length}
                        </p>
                    </div>
                </div>
                {/* Progress */}
                <div className="flex gap-2">
                    {STEPS.map((item, index) => (
                        <div
                            key={item}
                            className={`h-1 flex-1 rounded-full ${index <= stepIndex ? "bg-primary" : "bg-border"}`}
                        />
                    ))}
                </div>
                {/* STEP DETAILS */}
                {step === "Details" && (
                    <div className="space-y-4">
                        <div className="flex flex-col items-center gap-3 py-2">
                            <div className={`w-16 h-16 rounded-2xl ${color.bg} flex items-center justify-center text-white font-bold text-2xl shadow-lg select-none`}>
                                {initials}
                            </div>
                            <p className="text-xs text-muted-foreground">Workspace icon preview</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">
                                Workspace name <span className="text-destructive">*</span>
                            </label>
                            <input
                                autoFocus
                                value={form.name}
                                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                placeholder="Workspace name"
                                className="w-full h-9 bg-input-background border border-border rounded-sm px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                            />
                            <p className="text-xs text-muted-foreground mt-1">This will be visible to all members.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
                            <textarea
                                value={form.description}
                                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                placeholder="What is this workspace for?"
                                rows={3}
                                className="w-full bg-input-background border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                <Palette size={11} className="inline mr-1" />Color
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {WORKSPACE_COLORS.map((colorOption) => {
                                    const isSelected = colorOption.bg === color.bg;
                                    return (
                                        <button
                                            key={colorOption.bg}
                                            type="button"
                                            onClick={() =>
                                                setColor(colorOption)
                                            }
                                            title={colorOption.label}
                                            className={`flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${colorOption.bg} transition-all ${isSelected
                                                ? `ring-2 ring-offset-2 ring-offset-card ${colorOption.ring}`
                                                : "opacity-70 hover:opacity-100"
                                                }`}
                                        >
                                            {isSelected && (
                                                <Check
                                                    size={12}
                                                    className="text-white"
                                                    strokeWidth={3}
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* STEP INVITE */}

                {step === "Invite" && (
                    <div className="space-y-4">
                        <p className="text-xs text-muted-foreground">
                            Invite teammates to <span className="text-foreground font-semibold">{form.name}</span>. You can also do this later.
                        </p>
                        <div className="space-y-2">
                            {form.invites.map((invite, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className="flex-1">
                                        <Combobox
                                            value={invite.userId}
                                            onValueChange={(value) =>
                                                updateInvite(
                                                    i,
                                                    "userId",
                                                    value
                                                )
                                            }
                                            placeholder="Select teammate"
                                            searchPlaceholder="Search user..."
                                            options={userOptions}
                                        />
                                    </div>
                                    <div className="w-32">

                                        <Combobox
                                            value={invite.role}
                                            onValueChange={(value) =>
                                                updateInvite(
                                                    i,
                                                    "role",
                                                    value
                                                )
                                            }

                                            placeholder="Role"
                                            searchable={false}
                                            options={ROLE_OPTIONS}
                                        />

                                    </div>
                                    {form.invites.length > 1 && (
                                        <button onClick={() => removeInvite(i)} className="text-muted-foreground hover:text-destructive transition-colors p-1 cursor-pointer">
                                            <X size={13} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={addInvite}
                            className="text-xs text-primary hover:underline flex items-center gap-1 font-medium cursor-pointer"
                        >
                            + Add another
                        </button>

                        {/* Workspace summary card */}
                        <div className="mt-4 p-4 bg-muted/40 border border-border rounded-xl">
                            <p className="text-xs font-semibold text-foreground mb-2">Workspace summary</p>
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl ${color.bg} flex items-center justify-center text-white font-bold`}>
                                    {initials}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-foreground">{form.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {form.invites.filter(i => i.userId).length} invited members
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* FOOTER */}
                <div className="flex justify-between border-t border-border pt-4">
                    <Button
                        variant="outline"
                        onClick={back}
                        disabled={isSubmitting}
                    >
                        {stepIndex === 0
                            ? "Cancel"
                            : "Back"}
                    </Button>
                    <Button
                        variant="primary"
                        onClick={next}
                        disabled={!canNext || isSubmitting}
                    >
                        {step === "Invite"
                            ? isSubmitting
                                ? "Creating..."
                                : "Create Workspace"
                            : "Next"}
                    </Button>
                </div>
            </div>
        </Modal>
    );


}