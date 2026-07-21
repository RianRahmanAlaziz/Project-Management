"use client";

import { useState } from "react";
import { useAuth } from "./useAuth";
import { register, login } from "../api/authApi";
import type {
    AuthForm,
    AuthMode,
    AuthFieldErrors,
} from "../types/auth";
import { setAuthToken } from "@/lib/api/authToken";
import { validateAuthForm } from "../utils/validateAuthForm";

import { parseApiError } from "@/lib/api/apiError";

const INITIAL_FORM: AuthForm = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
};

export function useAuthForm() {
    const { refreshUser } = useAuth();
    const [mode, setMode] = useState<AuthMode>("login");
    const [form, setForm] = useState<AuthForm>(INITIAL_FORM);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [fieldErrors, setFieldErrors] = useState<AuthFieldErrors>({});

    const isLogin = mode === "login";
    const isRegister = mode === "register";

    const updateForm = (
        field: keyof AuthForm,
        value: string,
    ) => {
        setForm((previousForm) => ({
            ...previousForm,
            [field]: value,
        }));

        if (error) {
            setError("");
        }

        setFieldErrors((previousErrors) => {
            if (!previousErrors[field]) {
                return previousErrors;
            }

            const nextErrors = {
                ...previousErrors,
            };

            delete nextErrors[field];

            return nextErrors;
        });
    };

    const resetForm = () => {
        setForm(INITIAL_FORM);
        setError("");
    };

    const handleSwitchMode = () => {
        setMode((currentMode) =>
            currentMode === "login" ? "register" : "login",
        );

        resetForm();
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
        onSuccess?: () => void,
    ) => {
        event.preventDefault();

        const validationErrors =
            validateAuthForm(form, mode);

        if (Object.keys(validationErrors).length > 0) {
            setFieldErrors(validationErrors);
            return;
        }

        setLoading(true);
        setError("");
        setFieldErrors({});

        try {
            const response = isLogin
                ? await login({
                    email: form.email,
                    password: form.password,
                })
                : await register({
                    name: form.name,
                    email: form.email,
                    password: form.password,
                    password_confirmation: form.confirmPassword,
                });

            setAuthToken(response.data.access_token);

            await refreshUser();
            onSuccess?.();
        } catch (submitError) {
            const apiError = parseApiError(submitError);

            console.error("Auth error:", apiError,);

            setError(apiError.message);

            setFieldErrors({
                name: apiError.errors.name,
                email: apiError.errors.email,
                password: apiError.errors.password,
                confirmPassword:
                    apiError.errors.password_confirmation,
            });

            setLoading(false);
        }
    };

    return {
        mode,
        form,
        error,
        fieldErrors,
        loading,
        isLogin,
        isRegister,
        updateForm,
        handleSubmit,
        handleSwitchMode,
    };
}