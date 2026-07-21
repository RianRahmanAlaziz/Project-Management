"use client";

import { LogOut } from "lucide-react";

import {
    Modal,
    Button,
} from "@/components/ui";

interface LogoutModalProps {
    open: boolean;
    loading?: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function LogoutModal({
    open,
    loading = false,
    onClose,
    onConfirm,
}: LogoutModalProps) {
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
                            flex h-12 w-12 shrink-0
                            items-center justify-center
                            rounded-full
                            bg-destructive/10
                            text-destructive
                        "
                    >
                        <LogOut size={20} />
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold">
                            Log out
                        </h3>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Are you sure you want to log out
                            of your account?
                        </p>
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <Button
                        variant="outline"
                        size="lg"
                        disabled={loading}
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="danger"
                        size="lg"
                        disabled={loading}
                        onClick={onConfirm}
                    >
                        {loading
                            ? "Logging out..."
                            : "Log out"}
                    </Button>
                </div>
            </div>
        </Modal>
    );
}