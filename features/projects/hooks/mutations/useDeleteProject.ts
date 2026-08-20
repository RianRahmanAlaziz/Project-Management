"use client";

import { toast } from "sonner";
import { useState } from "react";
import { deleteProject } from "../../api/projectsApi";
import { parseApiError } from "@/lib/api";

interface UseDeleteProjectProps {
    workspaceSlug: string;
    projectSlug: string;
    onSuccess?: () => Promise<void> | void;
}

export function useDeleteProject({
    workspaceSlug,
    projectSlug,
    onSuccess,
}: UseDeleteProjectProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState<string | null>(null);

    const handleDeleteProject = async (): Promise<void> => {
        if (isDeleting) {
            return;
        }

        setIsDeleting(true);
        setDeleteError(null);

        const deletePromise = async () => {
            try {
                const response = await deleteProject(workspaceSlug, projectSlug,);
                await onSuccess?.();
                return response;
            } catch (error) {
                const apiError = parseApiError(error);
                setDeleteError(apiError.message);
                throw new Error(apiError.message);
            } finally {
                setIsDeleting(false);
            }
        };
        toast.promise(
            deletePromise(),
            {
                loading: "Deleting Project...",
                success: "Project deleted successfully.",
                error: (error) => error instanceof Error ? error.message : "Failed to delete Project.",
            },
        );
    };

    return {
        handleDeleteProject,
        isDeleting,
        deleteError,
    };
}