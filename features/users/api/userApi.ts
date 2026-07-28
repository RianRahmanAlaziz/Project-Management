import { apiClient } from "@/lib/api/apiClient";


import type {
    CreateUserPayload,
    UpdateUserPayload,
    UserListParams,
    ResetPasswordPayload,
    UserResponse,
    UsersResponse,
} from "../types/users";

export async function getUsers(): Promise<UsersResponse> {
    const response = await apiClient.get<UsersResponse>("/users");

    return response.data;
}

export async function getUser(id: number): Promise<UserResponse> {
    const { data } = await apiClient.get<UserResponse>(
        `/users/${id}`
    );

    return data;
}

export async function createUser(payload: CreateUserPayload): Promise<UserResponse> {
    const { data } = await apiClient.post<UserResponse>(
        "/users",
        payload
    );

    return data;
}

export async function updateUser(
    id: number,
    payload: UpdateUserPayload
): Promise<UserResponse> {
    const { data } = await apiClient.put<UserResponse>(
        `/users/${id}`,
        payload
    );

    return data;
}

export async function resetPasswordUser(
    id: number,
    payload: ResetPasswordPayload
): Promise<UserResponse> {
    const { data } = await apiClient.patch<UserResponse>(
        `/users/${id}/reset-password`,
        payload
    );

    return data;
}

export async function deleteUser(id: number): Promise<void> {
    await apiClient.delete(`/users/${id}`);

}