"use client";

import { useEffect, useState } from "react";

import {
    Check,
    Palette,
    X,
    Crown,
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
    Workspace,
} from "../../types/workspace";


const STEPS = [
    "Details",
    "Invite",
] as const;

type Step = typeof STEPS[number];

interface WorkspaceFormData {
    name: string;
    description: string;
    color: string;
    invites: {
        email: string;
        role: string;
    }[];
}

interface WorkspaceFormModalProps {
    open: boolean;
    mode: "create" | "edit";
    workspace?: Workspace | null;
    onClose: () => void;
    onSubmit: (
        data: WorkspaceFormData,
    ) => Promise<void> | void;
}


export default function WorkspaceFormModal({
    open,
    mode,
    workspace,
    onClose,
    onSubmit,
}: WorkspaceFormModalProps) {
    const [step, setStep] = useState<Step>("Details");

    const [color, setColor] = useState<WorkspaceColor>(WORKSPACE_COLORS[0],);

    const [form, setForm] = useState({
        name: "",
        description: "",
        invites: [
            {
                email: "",
                role: "Member",
            }
        ],
    });

    const addInvite = () => {
        setForm(prev => ({
            ...prev,
            invites: [
                ...prev.invites,
                {
                    email: "",
                    role: "Member",
                }
            ]
        }));
    };

    const updateInvite = (
        index: number,
        field: "email" | "role",
        value: string
    ) => {
        setForm(prev => {
            const invites =
                [...prev.invites];
            invites[index] = {
                ...invites[index],
                [field]: value,
            };
            return {
                ...prev,
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
        setStep("Details");

        if (mode === "edit" && workspace) {
            setForm({
                name: workspace.name,
                description:
                    workspace.description ?? "",
                invites: [
                    {
                        email: "",
                        role: "Member",
                    },
                ],
            });

            const workspaceColor =
                WORKSPACE_COLORS.find(
                    (item) =>
                        item.bg === workspace.color,
                ) ?? WORKSPACE_COLORS[0];

            setColor(workspaceColor);

            return;
        }

        setForm({
            name: "",
            description: "",
            invites: [
                {
                    email: "",
                    role: "Member",
                },
            ],
        });

        setColor(WORKSPACE_COLORS[0]);
    }, [
        workspace,
        mode,
        open,
    ]);


    const stepIndex =
        STEPS.indexOf(step);


    const next = async () => {
        if (step === "Invite") {
            onSubmit({
                ...form,
                color: color.bg,
            });
            return;
        }
        setStep(
            STEPS[stepIndex + 1]
        );

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


    const initials =
        form.name
            .split(" ")
            .map(x => x[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "W";

    const canNext = form.name.trim().length >= 2;

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
                            {mode === "create"
                                ? "Create Workspace"
                                : "Edit Workspace"}
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
                                    const isSelected =
                                        colorOption.bg === color.bg;

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
                                            value={invite.email}
                                            onValueChange={(value) =>
                                                updateInvite(
                                                    i,
                                                    "email",
                                                    value
                                                )
                                            }
                                            placeholder={`teammate${i + 1}@company.com`}
                                            options={[
                                                {
                                                    value: "alex@projectflow.io",
                                                    label: "Alex Rivera",
                                                    description: "alex@projectflow.io",
                                                },
                                                {
                                                    value: "sarah@projectflow.io",
                                                    label: "Sarah Chen",
                                                    description: "sarah@projectflow.io",
                                                },
                                                {
                                                    value: "michael@projectflow.io",
                                                    label: "Michael Brown",
                                                    description: "michael@projectflow.io",
                                                },
                                            ]}
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
                                            options={[
                                                {
                                                    value: "Owner",
                                                    label: "Owner",
                                                    icon:
                                                        <Crown
                                                            size={15}
                                                            className="text-amber-500"
                                                        />,
                                                },
                                                {
                                                    value: "Admin",
                                                    label: "Admin",
                                                    icon:
                                                        <Shield
                                                            size={15}
                                                            className="text-indigo-500"
                                                        />,
                                                },
                                                {
                                                    value: "Member",
                                                    label: "Member",
                                                    icon:
                                                        <UserCheck
                                                            size={15}
                                                            className="text-emerald-500"
                                                        />,
                                                },
                                                {
                                                    value: "Viewer",
                                                    label: "Viewer",
                                                    icon:
                                                        <Eye
                                                            size={15}
                                                            className="text-slate-500"
                                                        />,
                                                },
                                            ]}
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
                                        {form.invites.filter(i => i.email).length} invited members
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
                    >
                        {stepIndex === 0
                            ? "Cancel"
                            : "Back"}
                    </Button>
                    <Button
                        variant="primary"
                        onClick={next}
                        disabled={!canNext}
                    >
                        {step === "Invite"
                            ? "Create Workspace"
                            : "Continue"}
                    </Button>
                </div>
            </div>
        </Modal>
    );


}