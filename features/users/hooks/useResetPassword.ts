"use client";

import { useState } from "react";
import { toast } from "sonner";
import { parseApiError } from "@/lib/api/apiError";
import { resetPasswordUser as resetPasswordUserRequest } from "../api/userApi";

import type { Users, ResetPasswordForm, ResetPasswordPayload } from "../types/users";

interface UseResetPasswordOptions {
    onSuccess?: () => Promise<void> | void;
}

export function useResetPassword({
    onSuccess,
}: UseResetPasswordOptions = {}) {
    const [isResetting, setIsResetting] = useState(false);
    const [resetError, setResetError] = useState("");

    const handleResetPassword = async (
        user: Users,
        data: ResetPasswordForm,
    ): Promise<void> => {
        setIsResetting(true);
        setResetError("");

        const payload: ResetPasswordPayload = {
            password: data.password,
            password_confirmation: data.password_confirmation,
        };

        const promise = resetPasswordUserRequest(user.id, payload)
            .then(async (response) => {
                await onSuccess?.();

                return response;
            })
            .catch((error) => {
                const apiError = parseApiError(error);

                setResetError(apiError.message);

                throw error;
            })
            .finally(() => {
                setIsResetting(false);
            });

        toast.promise(promise, {
            loading: "Resetting password...",

            success: () => ({
                message: "Password reset",
                description: `Password for ${user.email} has been reset successfully.`,
            }),

            error: (error) => {
                const apiError = parseApiError(error);

                return {
                    message: "Failed to reset password",
                    description: apiError.message,
                };
            },
        });

        await promise;
    };

    return {
        handleResetPassword,
        isResetting,
        resetError,
    };
}