"use client";

import type { ReactNode } from "react";

import { AuthProvider } from "@/features/auth/context/authContext";

interface AppProviderProps {
    children: ReactNode;
}

export function AppProvider({
    children,
}: AppProviderProps) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}