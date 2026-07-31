"use client";

import { useEffect, useState, useMemo, } from "react";

import {
    AlertTriangle,
    Crown,
} from "lucide-react";

import { Button, Modal, Combobox } from "@/components/ui";
import type { WorkspaceMember } from "@/features/members/types/workspaceMember";

interface TransferOwnershipModalProps {
    open: boolean;
    members: WorkspaceMember[];
    isSubmitting?: boolean;
    error?: string | null;
    onClose: () => void;
    onConfirm: (userId: number) => Promise<void> | void;
}

export default function TransferOwnershipModal({
    open,
    members,
    isSubmitting = false,
    error,
    onClose,
    onConfirm,
}: TransferOwnershipModalProps) {
    const [selectedUserId, setSelectedUserId] = useState("");

    useEffect(() => {
        if (!open) {
            return;
        }

        setSelectedUserId("");
    }, [open]);

    const memberOptions = useMemo(() =>
        members.filter((member) => member.role !== "owner")
            .map((member) => ({
                value: String(member.user.id),
                label: member.user.name,
                description:
                    member.user.email,
            })),
        [members],
    );

    const handleSubmit = async (): Promise<void> => {
        if (
            !selectedUserId ||
            isSubmitting
        ) {
            return;
        }

        await onConfirm(
            Number(selectedUserId),
        );
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Transfer Ownership"
            size="md"
        >
            <div className="space-y-5">
                <div className="flex items-start gap-3 rounded-lg border border-warning/30 bg-warning/5 p-4">
                    <AlertTriangle
                        size={20}
                        className="mt-0.5 shrink-0 text-warning"
                    />

                    <div className="space-y-1">
                        <p className="text-sm font-medium">
                            This action changes workspace ownership
                        </p>

                        <p className="text-xs text-muted-foreground">
                            The selected member will become
                            the new workspace owner. You will
                            lose owner privileges.
                        </p>
                    </div>
                </div>

                <Combobox
                    label="New workspace owner"
                    value={selectedUserId}
                    onValueChange={setSelectedUserId}
                    placeholder={memberOptions.length ? "Select a member" : "No eligible members"}
                    searchPlaceholder="Search member..."
                    searchable
                    options={memberOptions}
                />

                {error && (
                    <p className="text-sm text-destructive">
                        {error}
                    </p>
                )}

                <div className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        size="lg"
                        disabled={isSubmitting}
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="primary"
                        size="lg"
                        disabled={
                            !selectedUserId ||
                            isSubmitting
                        }
                        onClick={handleSubmit}
                    >
                        <Crown size={16} />

                        {isSubmitting
                            ? "Transferring..."
                            : "Transfer Ownership"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}