"use client";

import { useState } from "react";
import { toast } from "sonner";
import { updateUser as updateUserRequest } from "../api/userApi";
import { parseApiError } from "@/lib/api/apiError";
import type {
    UpdateUserPayload,
    EditUserForm,
    Users,
} from "../types/users";

interface UseUpdateUserOptions {
    onSuccess?: () => void | Promise<void>;
}

export function useUpdateUser({
    onSuccess,
}: UseUpdateUserOptions = {}) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateError, setUpdateError] = useState<string | null>(null);

    const handleUpdateUser = async (
        user: Users,
        data: EditUserForm,
    ): Promise<void> => {
        if (isUpdating) {
            return;
        }

        const payload: UpdateUserPayload = {
            name: data.name.trim(),
            email: data.email.trim(),
            role: data.role,
        };

        setIsUpdating(true);
        setUpdateError(null);

        const promise = updateUserRequest(user.id, payload)
            .then(async (response) => {
                await onSuccess?.();

                return response;
            })
            .catch((error) => {
                const apiError =
                    parseApiError(error);

                setUpdateError(apiError.message);

                throw error;
            })
            .finally(() => {
                setIsUpdating(false);
            });

        toast.promise(promise, {
            loading: "Updating user...",

            success: () => ({
                message: "User updated",
                description:
                    `${payload.email} has been updated successfully.`,
            }),

            error: (error) => {
                const apiError =
                    parseApiError(error);

                return {
                    message: "Failed to update user",
                    description: apiError.message,
                };
            },
        });

        await promise;
    };

    return {
        handleUpdateUser,
        isUpdating,
        updateError,
    };
}
