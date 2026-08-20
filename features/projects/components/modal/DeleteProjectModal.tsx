import React from 'react'
import { Projects } from '../../types/projects';
import { Button, Modal } from '@/components/ui';
import { AlertTriangle, Loader2 } from 'lucide-react';

interface DeleteProjectModalProps {
    open: boolean;
    project: Projects | null;
    isSubmitting?: boolean;
    error?: string | null;
    onClose: () => void;
    onConfirm: () => Promise<void> | void;
}

export function DeleteProjectModal({
    open,
    project,
    isSubmitting = false,
    error,
    onClose,
    onConfirm,
}: DeleteProjectModalProps) {
    if (!project) return null;

    const handleConfirm = async (): Promise<void> => {
        await onConfirm();
    };
    return (
        <Modal
            open={open}
            onClose={isSubmitting ? () => { } : onClose}
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
                            Delete Project
                        </h3>

                        <p className="mt-2 text-m text-muted-foreground">
                            Are you sure you want to delete
                            <span className="font-medium text-foreground">
                                {" "}
                                {project.name}
                            </span>
                            ?
                        </p>

                        <p className="mt-2 text-m text-muted-foreground">
                            This action cannot be undone.
                        </p>
                    </div>
                </div>
                {error && (
                    <p className="text-sm text-destructive">
                        {error}
                    </p>
                )}
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
                            void handleConfirm()
                        }
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2
                                    size={16}
                                    className="animate-spin"
                                />
                                Deleting...
                            </>
                        ) : (
                            "Delete Project"
                        )}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
