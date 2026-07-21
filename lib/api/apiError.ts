import axios from "axios";

export interface ApiErrorResponse {
    success?: boolean;
    message?: string;
    errors?: Record<string, string[]>;
}

export interface ParsedApiError {
    message: string;
    errors: Record<string, string[]>;
    status?: number;
}

export function parseApiError(error: unknown): ParsedApiError {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
        return {
            message:
                error.response?.data?.message ??
                "Terjadi kesalahan saat memproses permintaan.",
            errors: error.response?.data?.errors ?? {},
            status: error.response?.status,
        };
    }

    if (error instanceof Error) {
        return {
            message: error.message,
            errors: {},
        };
    }

    return {
        message: "Terjadi kesalahan yang tidak diketahui.",
        errors: {},
    };
}