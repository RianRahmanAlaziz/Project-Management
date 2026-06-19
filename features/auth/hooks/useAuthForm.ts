"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthForm, AuthMode } from "../types/auth";
import { validateAuthForm } from "../utils/validateAuthForm";

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
            if (isLogin) {
                console.log("Login payload:", {
                    email: form.email,
                    password: form.password,
                });
            } else {
                console.log("Register payload:", {
                    name: form.name,
                    email: form.email,
                    password: form.password,
                    password_confirmation: form.confirmPassword,
                });
            }

            await new Promise((resolve) => window.setTimeout(resolve, 800));

            router.push("/dashboard");
        } catch (submitError) {
            console.error(submitError);

            setError(
                isLogin
                    ? "Failed to sign in. Please check your credentials."
                    : "Failed to create an account. Please try again.",
            );
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