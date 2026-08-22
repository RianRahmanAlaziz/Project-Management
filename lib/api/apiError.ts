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

export function parseApiError(
    error: unknown,
): ParsedApiError {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
        const responseData =
            error.response?.data;

        const errors =
            responseData?.errors ?? {};

        const validationMessage =
            Object.values(errors)
                .flat()
                .find(Boolean);

        return {
            message:
                validationMessage ??
                responseData?.message ??
                "Terjadi kesalahan saat memproses permintaan.",

            errors,

            status:
                error.response?.status,
        };
    }

    if (error instanceof Error) {
        return {
            message: error.message,
            errors: {},
        };
    }

    return {
        message:
            "Terjadi kesalahan yang tidak diketahui.",
        errors: {},
    };
}