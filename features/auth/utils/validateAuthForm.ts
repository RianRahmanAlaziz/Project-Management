import { AuthForm, AuthMode } from "../types/auth";

export function validateAuthForm(form: AuthForm, mode: AuthMode): string {
    const isRegister = mode === "register";

    if (isRegister && !form.name.trim()) {
        return "Full name is required.";
    }

    if (!form.email.trim()) {
        return "Email address is required.";
    }

    if (!form.password) {
        return "Password is required.";
    }

    if (form.password.length < 8) {
        return "Password must contain at least 8 characters.";
    }

    if (isRegister && form.password !== form.confirmPassword) {
        return "Password confirmation does not match.";
    }

    return "";
}