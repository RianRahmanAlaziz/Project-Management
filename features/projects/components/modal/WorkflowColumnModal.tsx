"use client";

import { useEffect, useState } from "react";
import {
    Button,
    Input,
    Modal,
} from "@/components/ui";

import {
    CheckCircle2,
    Palette,
} from "lucide-react";

import {
    COLORS,
    type Color,
} from "@/components/constants";
import { CreateWorkflowColumnPayload, WorkflowColumn } from "../../types/workflow";
import Toggle from "@/components/ui/Toggle";

interface WorkflowColumnModalProps {
    open: boolean;
    mode: "create" | "edit";
    column?: WorkflowColumn | null;
    isSubmitting?: boolean;

    onClose: () => void;
    onSubmit: (
        payload: CreateWorkflowColumnPayload,
    ) => Promise<void> | void;
}


export function WorkflowColumnModal({
    open,
    mode,
    column = null,
    isSubmitting = false,
    onClose,
    onSubmit,
}: WorkflowColumnModalProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState<Color>(COLORS[0]);
    const [isCompleted, setIsCompleted] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!open) {
            return;
        }

        if (mode === "edit" && column) {
            setName(column.name ?? "");
            setDescription(column.description ?? "");

            const selectedColor = COLORS.find(
                (item) =>
                    item.bg === column.color ||
                    item.label.toLowerCase() === column.color,
            ) ?? COLORS[0];

            setColor(selectedColor);
            setIsCompleted(column.is_completed);

            setError("");

            return;
        }

        // CREATE
        setName("");
        setDescription("");
        setColor(COLORS[0]);
        setIsCompleted(false);
        setError("");
    }, [open, mode, column]);

    const handleSubmit = async () => {
        const trimmedName = name.trim();

        if (!trimmedName) {
            setError("Column name is required.");
            return;
        }

        if (isSubmitting) {
            return;
        }

        setError("");

        await onSubmit({
            name: trimmedName,
            description: description.trim(),
            color: color.label.toLowerCase(),
            is_completed: isCompleted,
        });
    };

    return (
        <Modal
            open={open}
            onClose={
                isSubmitting
                    ? () => { }
                    : onClose
            }
            title={
                mode === "create"
                    ? "Create Workflow Column"
                    : "Edit Workflow Column"
            }
            size="md"
        >
            <div className="space-y-5">
                {/* Name */}
                <Input
                    label="Name"
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                        if (error) {
                            setError("");
                        }
                    }}
                    placeholder="e.g. Development"
                    error={error}
                    disabled={isSubmitting}
                />

                {/* Description */}
                <div className="flex flex-col gap-1">
                    <label className="mb-2.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(event) =>
                            setDescription(
                                event.target.value,
                            )
                        }
                        disabled={isSubmitting}
                        placeholder="Describe this workflow stage..."
                        rows={3}
                        className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                </div>

                {/* Color */}
                <div className="space-y-2">
                    <div className="flex items-center gap-1.5">
                        <Palette
                            size={12}
                            className="text-muted-foreground"
                        />

                        <label className="text-sm font-medium text-foreground">
                            Color
                        </label>
                    </div>


                    <div className="rounded-lg border border-border bg-background p-3">
                        <div className="grid grid-cols-9 gap-2">
                            {COLORS.map((item) => {
                                return (
                                    <button
                                        key={item.label}
                                        type="button"
                                        disabled={isSubmitting}
                                        onClick={() => setColor(item)}
                                        title={item.label}
                                        aria-label={`Select ${item.label} color`}
                                        className={`w-7 h-7 cursor-pointer rounded-lg ${item.bg} flex items-center justify-center transition-all ${color.label === item.label ? `ring-2 ring-offset-2 ring-offset-card ${item.ring}` : "opacity-70 hover:opacity-100"}`}
                                    >
                                        <span
                                            className={`h-5 w-5 rounded-lg ${item.bg}`}
                                        />
                                    </button>
                                );
                            })}
                        </div>
                        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                            <span
                                className={`h-2.5 w-2.5 rounded-full ${color.bg}`}
                            />
                            <span>
                                {color.label}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Completed */}
                <div
                    onClick={() => {
                        if (isSubmitting) {
                            return;
                        }

                        setIsCompleted((current) => !current);
                    }}
                    className={[
                        "flex w-full cursor-pointer items-center justify-between rounded-lg border px-3 py-3",
                        "transition-colors",
                        isCompleted
                            ? "border-success/40 bg-success/5"
                            : "border-border bg-transparent",
                        isSubmitting
                            ? "cursor-not-allowed opacity-60"
                            : "hover:bg-muted/30",
                    ]
                        .filter(Boolean)
                        .join(" ")}
                >
                    <div className="flex items-center gap-2.5">
                        <CheckCircle2
                            size={15}
                            className={
                                isCompleted
                                    ? "text-success"
                                    : "text-muted-foreground"
                            }
                        />

                        <div>
                            <p
                                className={
                                    isCompleted
                                        ? "text-sm font-medium text-success"
                                        : "text-sm font-medium text-foreground"
                                }
                            >
                                Completed column
                            </p>

                            <p
                                className={
                                    isCompleted
                                        ? "text-xs text-success/70"
                                        : "text-xs text-muted-foreground"
                                }
                            >
                                Tasks in this column are considered completed.
                            </p>
                        </div>
                    </div>

                    <div
                        onClick={(event) => {
                            event.stopPropagation();
                        }}
                    >
                        <Toggle
                            value={isCompleted}
                            onChange={() =>
                                setIsCompleted((current) => !current)
                            }
                            disabled={isSubmitting}
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 border-t border-border pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="button"
                        variant="primary"
                        size="lg"
                        onClick={handleSubmit}
                        disabled={isSubmitting || !name.trim()}
                    >
                        {isSubmitting
                            ? mode === "create"
                                ? "Creating..."
                                : "Saving..."
                            : mode === "create"
                                ? "Add Column"
                                : "Save Changes"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}