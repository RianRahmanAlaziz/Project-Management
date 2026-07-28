import { useState } from "react";
import { toast } from "sonner";
import { parseApiError } from "@/lib/api/apiError";
import { deleteUser as deleteUserRequest } from "../api/userApi";
import type { Users } from "../types/users";

interface UseDeleteUserOptions {
    onSuccess?: () => Promise<void> | void;
}

export function useDeleteUser({
    onSuccess,
}: UseDeleteUserOptions = {}) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState("");

    const handleDeleteUser = async (
        user: Users,
    ): Promise<void> => {
        setIsDeleting(true);
        setDeleteError("");

        const promise = deleteUserRequest(user.id)
            .then(async (response) => {
                await onSuccess?.();

                return response;
            })
            .catch((error) => {
                const apiError = parseApiError(error);

                setDeleteError(apiError.message);

                throw error;
            })
            .finally(() => {
                setIsDeleting(false);
            });

        toast.promise(promise, {
            loading: "Deleting user...",

            success: () => ({
                message: "User deleted",
                description: `${user.email} has been deleted successfully.`,
            }),

            error: (error) => {
                const apiError = parseApiError(error);

                return {
                    message: "Failed to delete user",
                    description: apiError.message,
                };
            },
        });

        await promise;
    };

    return {
        handleDeleteUser,
        isDeleting,
        deleteError,
    };
}