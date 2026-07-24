"use client";

import { useState } from "react";
import { toast } from "sonner";
import { transferWorkspaceOwnership } from "../api/workspaceApi";
import { parseApiError } from "@/lib/api/apiError";

import type {
    TransferWorkspaceOwnershipPayload,
    Workspace,
} from "../types/workspace";

interface UseTransferWorkspaceOwnershipOptions {
    workspaceSlug: string;
    onSuccess?: (workspace: Workspace) => Promise<void> | void;
}

export function useTransferWorkspaceOwnership({
    workspaceSlug,
    onSuccess,
}: UseTransferWorkspaceOwnershipOptions) {
    const [isTransferring, setIsTransferring] = useState(false);
    const [transferError, setTransferError] = useState<string | null>(null);

    const handleTransferOwnership = async (
        payload: TransferWorkspaceOwnershipPayload,
    ): Promise<void> => {
        if (isTransferring) {
            return;
        }

        setIsTransferring(true);
        setTransferError(null);

        const transferPromise = transferWorkspaceOwnership(
            workspaceSlug,
            payload,
        );

        toast.promise(transferPromise, {
            loading:
                "Transferring workspace ownership...",

            success: (response) =>
                response.message,

            error: (error) => {
                const apiError = parseApiError(error);

                return apiError.message;
            },
        },
        );

        try {
            const response = await transferPromise;

            try {
                await onSuccess?.(response.data);
            } catch (error) {
                console.error(
                    "Workspace post-transfer action failed:",
                    error,
                );
            }
        } catch (error) {
            const apiError = parseApiError(error);
            setTransferError(apiError.message);
        } finally {
            setIsTransferring(false);
        }
    };

    return {
        handleTransferOwnership,
        isTransferring,
        transferError,
    };
}