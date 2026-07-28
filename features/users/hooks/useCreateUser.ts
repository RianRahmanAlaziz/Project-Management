"use client";

import { useState } from "react";
import { toast } from "sonner";

import { createUser as createUserRequest } from "../api/userApi";
import type { CreateUserForm, CreateUserPayload } from "../types/users";
import { parseApiError } from "@/lib/api/apiError";

interface UseCreateUserOptions {
    onSuccess?: () => Promise<void> | void;
}

export function useCreateUser({
    onSuccess,
}: UseCreateUserOptions = {}) {
    const [isCreating, setIsCreating] = useState(false);
    const [createError, setCreateError] = useState<string | null>(null);

    const handleCreateUser = async (
        data: CreateUserForm,
    ): Promise<void> => {

        if (isCreating) {
            return;
        }

        const payload: CreateUserPayload = {
            name: data.name.trim(),
            email: data.email.trim(),
            password: data.password,
            password_confirmation: data.password_confirmation,
            role: data.role,
        };
        setIsCreating(true);
        setCreateError(null);

        const promise = createUserRequest(payload)
            .then(async (response) => {
                await onSuccess?.();

                return response;
            })
            .catch((error) => {
                const apiError = parseApiError(error);

                setCreateError(apiError.message);

                throw error;
            })
            .finally(() => {
                setIsCreating(false);
            });

        toast.promise(promise, {
            loading: "Creating User...",

            success: () => ({
                message: "User created",
                description: `${payload.email} has been created successfully.`,
            }),

            error: (error) => {
                const apiError =
                    parseApiError(error);

                return {
                    message: "Failed to create User",
                    description: apiError.message,
                };
            },
        });

        await promise;
    };

    return {
        handleCreateUser,
        isCreating,
    }
}
