"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

import {
    Button,
    Combobox,
    Modal,
} from "@/components/ui";

import type { WorkspaceMember } from "@/features/members/types/workspaceMember";

interface InviteProjectMemberModalProps {
    open: boolean;
    users: WorkspaceMember[];
    isSubmitting?: boolean;
    onClose: () => void;
    onConfirm: (userId: number) => Promise<void> | void;
}

export function InviteProjectMemberModal({
    open,
    users,
    isSubmitting = false,
    onClose,
    onConfirm,
}: InviteProjectMemberModalProps) {
    const [userId, setUserId] = useState("");

    const userOptions = users.map((member) => ({
        value: String(member.user.id),
        label: member.user.name,
        description: member.user.email,
    }));

    const handleSubmit = async () => {
        if (!userId) {
            return;
        }

        await onConfirm(Number(userId));
    };

    const handleClose = () => {
        if (isSubmitting) {
            return;
        }

        setUserId("");
        onClose();
    };

    useEffect(() => {
        if (!open) {
            setUserId("");
        }
    }, [open]);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            size="md"
        >
            <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-border pb-5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Users size={18} />
                    </div>

                    <div>
                        <h2 className="font-semibold">
                            Add Project Member
                        </h2>

                        <p className="text-xs text-muted-foreground">
                            Add a workspace member to this project.
                        </p>
                    </div>
                </div>

                <Combobox
                    label="Member"
                    placeholder="Select member"
                    searchable
                    value={userId}
                    onValueChange={setUserId}
                    options={userOptions}
                />

                <div className="flex justify-between gap-2 border-t border-border pt-5">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={handleClose}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="primary"
                        size="lg"
                        onClick={handleSubmit}
                        loading={isSubmitting}
                        disabled={!userId}
                    >
                        Add Member
                    </Button>
                </div>
            </div>
        </Modal>
    );
}