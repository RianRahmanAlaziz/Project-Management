"use client";

import {
    Button,
    Modal,
} from "@/components/ui";
import { AlertTriangle } from "lucide-react";
import { Users } from "../../types/users";


interface DeleteUserModalProps {
    open: boolean;
    user: Users | null;
    isSubmitting?: boolean;
    onClose: () => void;
    onConfirm: (
        user: Users,
    ) => Promise<void>;
}

export function DeleteUserModal({
    open,
    user,
    isSubmitting = false,
    onClose,
    onConfirm,
}: DeleteUserModalProps) {

    const handleDelete = async () => {
        if (!user) {
            return;
        }

        await onConfirm(user);
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Delete User"
            size="sm"
        >
            <div className="space-y-5">
                <div className="flex items-start gap-4">
                    <div className=" flex h-12 w-12 items-center justify-center  rounded-full bg-destructive/10  text-destructive  " >
                        <AlertTriangle size={25} />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">
                            Remove User
                        </h3>

                        <p className="mt-2 text-m text-muted-foreground">
                            Are you sure you want to Remove
                            <span className="font-medium text-foreground">
                                {" "}
                                {user?.name}
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
                        loading={isSubmitting}
                        onClick={handleDelete}
                    >
                        Delete User
                    </Button>
                </div>
            </div>
        </Modal>
    );
}