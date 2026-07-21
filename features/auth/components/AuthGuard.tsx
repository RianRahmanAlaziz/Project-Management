"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "../hooks/useAuth";

interface AuthGuardProps {
    children: ReactNode;
}

export function AuthGuard({
    children,
}: AuthGuardProps) {
    const router = useRouter();

    const {
        isAuthenticated,
        isLoading,
    } = useAuth();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.replace("/");
        }
    }, [
        isAuthenticated,
        isLoading,
        router,
    ]);

    if (isLoading) {
        return null;
    }

    if (!isAuthenticated) {
        return null;
    }

    return children;
}