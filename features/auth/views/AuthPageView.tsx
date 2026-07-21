"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    AuthBrand,
    AuthForm,
    AuthHeroPanel,
    AuthModeSwitch,
    AuthSeparator,
    AuthSocialButtons
} from "@/features/auth/components";
import { motion } from "motion/react";
import { useAuthForm } from "../hooks/useAuthForm";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { DashboardShell } from "@/components/layouts/DashboardShell";
import { DashboardView } from "@/features/dashboard/views/DashboardView";


export function AuthPageView() {
    const router = useRouter();
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    const [showDashboardPreview, setShowDashboardPreview] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const {
        form,
        error,
        fieldErrors,
        loading,
        isLogin,
        isRegister,
        updateForm,
        handleSubmit,
        handleSwitchMode,
    } = useAuthForm();

    const handleAuthSuccess = () => {
        if (!isDesktop) {
            router.replace("/dashboard");
            return;
        }

        setShowDashboardPreview(true);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setIsTransitioning(true);

                setTimeout(() => {
                    router.replace("/dashboard");
                }, 750);
            });
        });
    };

    return (
        <main className="relative h-screen overflow-hidden bg-background">
            {/* DASHBOARD - LAYER BELAKANG */}
            {showDashboardPreview && (
                <div className="absolute inset-0 z-0">
                    <DashboardShell>
                        <DashboardView />
                    </DashboardShell>
                </div>
            )}

            <div className="absolute inset-0 z-10 flex">
                <motion.section
                    className="flex flex-1 items-center justify-center bg-background px-6 py-8 sm:px-8 lg:max-w-175 lg:px-12 lg:py-12"
                    animate={{
                        x: isTransitioning && isDesktop ? "-100vw" : 0,
                    }}
                    transition={{
                        duration: 0.9,
                        ease: [0.76, 0, 0.24, 1],
                    }}
                >
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
                            fieldErrors={fieldErrors}
                            loading={loading}
                            isLogin={isLogin}
                            isRegister={isRegister}
                            updateForm={updateForm}
                            onSubmit={(event) =>
                                handleSubmit(event, handleAuthSuccess)
                            }
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
                </motion.section>

                <motion.div
                    className="hidden flex-1 lg:flex"
                    animate={{
                        x: isTransitioning && isDesktop ? "100vw" : 0,
                    }}
                    transition={{
                        duration: 0.9,
                        ease: [0.76, 0, 0.24, 1],
                    }}
                >
                    <AuthHeroPanel />
                </motion.div>
            </div>
        </main>
    );
}