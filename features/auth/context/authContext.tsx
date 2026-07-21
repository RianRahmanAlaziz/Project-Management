"use client";

import {
    createContext,
    useCallback,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import {
    getMe,
    logout as logoutRequest,
} from "../api/authApi";

import type { User } from "../types/auth";

import {
    getAuthToken,
    removeAuthToken,
} from "@/lib/api/authToken";

interface AuthContextValue {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<
    AuthContextValue | undefined
>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({
    children,
}: AuthProviderProps) {
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUser = useCallback(async () => {
        const token = getAuthToken();

        if (!token) {
            setUser(null);
            setIsLoading(false);
            return;
        }

        try {
            const response = await getMe();

            setUser(response.data);
        } catch {
            removeAuthToken();
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchUser();
    }, [fetchUser]);

    const logout = async () => {
        try {
            await logoutRequest();
        } finally {
            removeAuthToken();
            setUser(null);

            router.replace("/");
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: Boolean(user),
                isLoading,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}