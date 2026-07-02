"use client";

import {
    AuthBrand,
    AuthForm,
    AuthHeroPanel,
    AuthModeSwitch,
    AuthSeparator,
    AuthSocialButtons
} from "@/features/auth/components";
import { useAuthForm } from "../hooks/useAuthForm";

export function AuthPageView() {
    const {
        form,
        error,
        loading,
        isLogin,
        isRegister,
        updateForm,
        handleSubmit,
        handleSwitchMode,
    } = useAuthForm();

    return (
        <main className="flex min-h-screen bg-background">
            <section className="flex flex-1 items-center justify-center px-12 py-12 lg:max-w-[700px]">
                <div className="w-full max-w-lg">
                    <AuthBrand />

                    <div className="mb-6">
                        <h1 className="mb-2 text-4xl font-bold text-foreground">
                            {isLogin ? "Welcome back" : "Create your account"}
                        </h1>

                        <p className="text-base text-muted-foreground">
                            {isLogin
                                ? "Enter your credentials to access your workspace."
                                : "Join thousands of teams using ProjectFlow."}
                        </p>
                    </div>

                    <AuthSocialButtons />
                    <AuthSeparator />

                    <AuthForm
                        form={form}
                        error={error}
                        loading={loading}
                        isLogin={isLogin}
                        isRegister={isRegister}
                        updateForm={updateForm}
                        onSubmit={handleSubmit}
                    />

                    <AuthModeSwitch
                        isLogin={isLogin}
                        onSwitchMode={handleSwitchMode}
                    />

                    {isRegister && (
                        <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
                            By creating an account, you agree to our{" "}
                            <button type="button" className="text-primary hover:underline">
                                Terms of Service
                            </button>{" "}
                            and{" "}
                            <button type="button" className="text-primary hover:underline">
                                Privacy Policy
                            </button>
                            .
                        </p>
                    )}
                </div>
            </section>

            <AuthHeroPanel />
        </main>
    );
}