"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import AuthPasswordInput from "./AuthPasswordInput";
import { AuthForm as AuthFormType } from "../types/auth";

interface AuthFormProps {
    form: AuthFormType;
    error: string;
    loading: boolean;
    isLogin: boolean;
    isRegister: boolean;
    updateForm: (field: keyof AuthFormType, value: string) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function AuthForm({
    form,
    error,
    loading,
    isLogin,
    isRegister,
    updateForm,
    onSubmit,
}: AuthFormProps) {
    return (
        <>
            {error && (
                <div
                    role="alert"
                    className="mb-4 rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2.5 text-xs text-destructive"
                >
                    {error}
                </div>
            )}

            <form onSubmit={onSubmit} className="space-y-3.5">
                {isRegister && (
                    <Input
                        label="Full name"
                        name="name"
                        type="text"
                        placeholder="Alex Rivera"
                        autoComplete="name"
                        value={form.name}
                        onChange={(event) => updateForm("name", event.target.value)}
                        required
                    />
                )}

                <Input
                    label="Email address"
                    name="email"
                    type="email"
                    placeholder="alex@company.com"
                    autoComplete="email"
                    value={form.email}
                    onChange={(event) => updateForm("email", event.target.value)}
                    required
                />

                <AuthPasswordInput
                    id="password"
                    name="password"
                    label="Password"
                    value={form.password}
                    placeholder="Enter your password"
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    onChange={(value) => updateForm("password", value)}
                />

                {isRegister && (
                    <AuthPasswordInput
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm password"
                        value={form.confirmPassword}
                        placeholder="Re-enter your password"
                        autoComplete="new-password"
                        onChange={(value) => updateForm("confirmPassword", value)}
                    />
                )}

                {isLogin && (
                    <div className="flex items-center justify-between">
                        <label className="flex cursor-pointer items-center gap-1.5">
                            <input
                                type="checkbox"
                                name="remember"
                                className="h-3.5 w-3.5 rounded border-border accent-primary"
                            />

                            <span className="text-xs text-muted-foreground">
                                Remember me
                            </span>
                        </label>

                        <button
                            type="button"
                            className="text-xs text-primary hover:underline cursor-pointer"
                        >
                            Forgot password?
                        </button>
                    </div>
                )}

                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={loading}
                    disabled={loading}
                    className="mt-1 w-full cursor-pointer"
                >
                    {isLogin ? "Sign in" : "Create account"}
                    {!loading && <ArrowRight size={14} />}
                </Button>
            </form>
        </>
    );
}