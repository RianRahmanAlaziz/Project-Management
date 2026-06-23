"use client";

import { AlertTriangle } from "lucide-react";
import { Modal, Button, Input } from "@/components/ui";

import type { Workspace } from "@/features/workspaces/types/workspace";

interface DeleteWorkspaceModalProps {
    open: boolean;
    workspace: Workspace | null;
    onClose: () => void;
    onConfirm: (workspace: Workspace) => void;
}

export default function DeleteWorkspaceModal({
    open,
    workspace,
    onClose,
    onConfirm,
}: DeleteWorkspaceModalProps) {
    if (!workspace) return null;

    return (
        <Modal
            open={open}
            onClose={onClose}
            size="md"
        >
            <div className="space-y-5">
                <div className="flex items-start gap-4">
                    <div
                        className="
                            flex h-12 w-12 items-center justify-center
                            rounded-full
                            bg-destructive/10
                            text-destructive
                        "
                    >
                        <AlertTriangle size={25} />
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold">
                            Delete Workspace
                        </h3>

                        <p className="mt-2 text-m text-muted-foreground">
                            Are you sure you want to delete
                            <span className="font-medium text-foreground">
                                {" "}
                                {workspace.name}
                            </span>
                            ?
                        </p>

                        <p className="mt-2 text-m text-muted-foreground">
                            This action cannot be undone.
                        </p>
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="danger"
                        size="lg"
                        onClick={() => {
                            onConfirm(workspace);
                            onClose();
                        }}
                    >
                        Delete Workspace
                    </Button>
                </div>
            </div>
        </Modal>
    );
}