"use client";

import { AlertTriangle } from "lucide-react";
import { Modal, Button } from "@/components/ui";

import type { WorkspaceMember } from "@/features/members/types/workspaceMember";

interface RemoveMemberModalProps {
    open: boolean;
    member: WorkspaceMember | null;
    isSubmitting?: boolean;
    onClose: () => void;
    onConfirm: (member: WorkspaceMember) => Promise<void> | void;
}

export default function RemoveMemberModal({
    open,
    member,
    isSubmitting = false,
    onClose,
    onConfirm,
}: RemoveMemberModalProps) {
    if (!member) return null;

    const handleSubmit = async () => {
        if (isSubmitting) {
            return;
        }

        await onConfirm(member);
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            size="md"
        >
            <div className="space-y-5">
                <div className="flex items-start gap-4">
                    <div
                        className=" flex h-12 w-12 items-center justify-center  rounded-full bg-destructive/10  text-destructive  " >
                        <AlertTriangle size={25} />
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold">
                            Remove Members
                        </h3>

                        <p className="mt-2 text-m text-muted-foreground">
                            Are you sure you want to Remove
                            <span className="font-medium text-foreground">
                                {" "}
                                {member.user.name}
                            </span>
                            ?
                        </p>
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <Button
                        variant="outline"
                        size="lg"
                        disabled={isSubmitting}
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="danger"
                        size="lg"
                        disabled={isSubmitting}
                        onClick={() =>
                            void handleSubmit()
                        }
                    >
                        {isSubmitting ? "Removing..." : "Remove Member"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}