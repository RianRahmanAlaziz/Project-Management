import React from 'react'
import { ProjectMember } from '../../types/projectMembers';
import { Button, Modal } from '@/components/ui';
import { AlertTriangle } from 'lucide-react';

interface RemoveProjectMemberModalProps {
    open: boolean;
    users: ProjectMember | null;
    isSubmitting?: boolean;
    onClose: () => void;
    onConfirm: (users: ProjectMember) => Promise<void> | void;
}

export function RemoveProjectMemberModal({
    open,
    users,
    isSubmitting = false,
    onClose,
    onConfirm,
}: RemoveProjectMemberModalProps) {
    if (!users) return null;

    const handleSubmit = async () => {
        if (isSubmitting) {
            return;
        }

        await onConfirm(users);
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
                                {users.user.name}
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
    )
}
