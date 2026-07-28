export type SystemRole =
    | ""
    | "super_admin"
    | "user";

export interface Users {
    id: number;
    name: string;
    email: string;
    role: SystemRole;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface UserListParams {
    search?: string;
    page?: number;
    per_page?: number;
}

export interface CreateUserPayload {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: SystemRole;
}

export interface UpdateUserPayload {
    name: string;
    email: string;
    role: SystemRole;
}

export interface UserPagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
}

export interface UsersResponse {
    success: boolean;
    message: string;
    data: Users[];
    meta: UserPagination;
}

export interface UserResponse {
    success: boolean;
    message: string;
    data: Users;
}

export interface CreateUserForm {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: SystemRole;
}

export interface EditUserForm {
    name: string;
    email: string;
    role: SystemRole;
}

export interface ResetPasswordForm {
    password: string;
    password_confirmation: string;
}

export interface ResetPasswordPayload {
    password: string;
    password_confirmation: string;
}