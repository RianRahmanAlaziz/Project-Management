"use client";

import { useEffect, useState } from "react";
import { Modal, Button, Input } from "@/components/ui";

interface Workspace {
    id?: string | number;
    name: string;
    description?: string;
}

interface WorkspaceFormModalProps {
    open: boolean;
    mode: "create" | "edit";
    workspace?: Workspace | null;
    onClose: () => void;
    onSubmit: (data: Workspace) => void;
}

export default function WorkspaceFormModal({
    open,
    mode,
    workspace,
    onClose,
    onSubmit,
}: WorkspaceFormModalProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (mode === "edit" && workspace) {
            setName(workspace.name ?? "");
            setDescription(workspace.description ?? "");
            return;
        }

        setName("");
        setDescription("");
    }, [mode, workspace, open]);

    const handleSubmit = () => {
        onSubmit({
            ...workspace,
            name,
            description,
        });

        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title={
                mode === "create"
                    ? "Create Workspace"
                    : "Edit Workspace"
            }
            size="lg"
        >
            <div className="space-y-4">
                <Input
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    placeholder="Workspace name"
                />

                <textarea
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                    placeholder="Workspace description"
                    rows={4}
                    className="
                        w-full rounded-lg
                        border border-border
                        bg-background
                        p-3 text-sm
                        text-foreground
                        focus:outline-none
                        focus:ring-2
                        focus:ring-primary
                    "
                />

                <div className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="primary"
                        size="lg"
                        onClick={handleSubmit}
                    >
                        {mode === "create"
                            ? "Create Workspace"
                            : "Save Changes"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}