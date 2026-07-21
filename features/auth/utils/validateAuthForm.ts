import type {
    AuthForm,
    AuthMode,
    AuthFieldErrors,
} from "../types/auth";

export function validateAuthForm(
    form: AuthForm,
    mode: AuthMode,
): AuthFieldErrors {
    const errors: AuthFieldErrors = {};

    if (!form.email.trim()) {
        errors.email = [
            "Email address is required.",
        ];
    }

    if (!form.password) {
        errors.password = [
            "Password is required.",
        ];
    }

    if (mode === "register" && form.password) {
        const passwordErrors: string[] = [];

        if (form.password.length < 8) {
            passwordErrors.push(
                "Password must be at least 8 characters.",
            );
        }

        if (
            !/[a-z]/.test(form.password) ||
            !/[A-Z]/.test(form.password)
        ) {
            passwordErrors.push(
                "Password must contain at least one uppercase and one lowercase letter.",
            );
        }

        if (!/[0-9]/.test(form.password)) {
            passwordErrors.push(
                "Password must contain at least one number.",
            );
        }

        if (passwordErrors.length > 0) {
            errors.password = passwordErrors;
        }

        if (!form.confirmPassword) {
            errors.confirmPassword = [
                "Please confirm your password.",
            ];
        } else if (
            form.password !== form.confirmPassword
        ) {
            errors.confirmPassword = [
                "Password confirmation does not match.",
            ];
        }
    }

    return errors;
}