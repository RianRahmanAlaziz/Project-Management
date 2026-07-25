import type { User } from "../types/users";

export const USERS: User[] = [
    {
        id: 1,
        name: "Rian Rahman",
        email: "rian@example.com",
        role: "super_admin",
        email_verified_at: "2026-07-20T08:00:00.000000Z",
        created_at: "2026-07-01T08:00:00.000000Z",
        updated_at: "2026-07-01T08:00:00.000000Z",
    },
    {
        id: 2,
        name: "John Doe",
        email: "john@example.com",
        role: "user",
        email_verified_at: "2026-07-21T08:00:00.000000Z",
        created_at: "2026-07-10T08:00:00.000000Z",
        updated_at: "2026-07-01T08:00:00.000000Z",
    },
    {
        id: 3,
        name: "Sarah Smith",
        email: "sarah@example.com",
        role: "user",
        email_verified_at: null,
        created_at: "2026-07-15T08:00:00.000000Z",
        updated_at: "2026-07-01T08:00:00.000000Z",
    },
];