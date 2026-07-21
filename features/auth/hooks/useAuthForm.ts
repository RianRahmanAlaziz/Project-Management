"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { register, login, getMe, logout } from "../api/authApi";
import type { AuthForm, AuthMode } from "../types/auth";
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
    const router = useRouter();

    const [mode, setMode] = useState<AuthMode>("login");
    const [form, setForm] = useState<AuthForm>(INITIAL_FORM);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const isLogin = mode === "login";
    const isRegister = mode === "register";

    const updateForm = (field: keyof AuthForm, value: string) => {
        setForm((previousForm) => ({
            ...previousForm,
            [field]: value,
        }));

        if (error) setError("");
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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const validationError = validateAuthForm(form, mode);

        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        setError("");

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

            router.push("/dashboard");
        } catch (submitError) {
            const apiError = parseApiError(submitError);

            console.error("Auth error:", apiError);

            setError(apiError.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        mode,
        form,
        error,
        loading,
        isLogin,
        isRegister,
        updateForm,
        handleSubmit,
        handleSwitchMode,
    };
}