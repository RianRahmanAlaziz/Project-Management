"use client";

import { AlertTriangle } from "lucide-react";
import { Modal, Button } from "@/components/ui";

import type { Members } from "@/features/members/types/members";

interface RemoveMemberModalProps {
    open: boolean;
    member: Members | null;
    onClose: () => void;
    onConfirm: (member: Members) => void;
}

export default function RemoveMemberModal({
    open,
    member,
    onClose,
    onConfirm,
}: RemoveMemberModalProps) {
    if (!member) return null;

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
                            Remove Members
                        </h3>

                        <p className="mt-2 text-m text-muted-foreground">
                            Are you sure you want to Remove
                            <span className="font-medium text-foreground">
                                {" "}
                                {member.name}
                            </span>
                            ?
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
                            onConfirm(member);
                            onClose();
                        }}
                    >
                        Remove Member
                    </Button>
                </div>
            </div>
        </Modal>
    );
}