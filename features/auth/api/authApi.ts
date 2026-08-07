import { apiClient } from "@/lib/api/apiClient";
import axios from "axios";
import type {
    AuthResponse,
    LoginPayload,
    RegisterPayload,
    MeResponse,
    LogoutResponse,
} from "../types/auth";

export async function initializeCsrf() {
    await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/sanctum/csrf-cookie`,
        {
            withCredentials: true,
        },
    );
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
        "/auth/login",
        payload,
    );
    return response.data;
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
        "/auth/register",
        payload,
    );

    return response.data;
}

export async function getMe(): Promise<MeResponse> {
    const response = await apiClient.get<MeResponse>("/auth/me");

    return response.data;
}

export async function logout(): Promise<LogoutResponse> {
    const response = await apiClient.post<LogoutResponse>(
        "/auth/logout",
    );

    return response.data;
}