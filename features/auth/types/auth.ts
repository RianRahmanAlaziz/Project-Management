export type AuthMode = "login" | "register";

export interface AuthForm {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface AuthData {
    user: User;
    access_token: string;
    token_type: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data: AuthData;
}

export interface MeResponse {
    success: boolean;
    message: string;
    data: User;
}

export interface LogoutResponse {
    success: boolean;
    message: string;
}

export type AuthFieldErrors = Partial<
    Record<keyof AuthForm, string[]>
>;