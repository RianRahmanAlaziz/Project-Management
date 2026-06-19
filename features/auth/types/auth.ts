export type AuthMode = "login" | "register";

export interface AuthForm {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}