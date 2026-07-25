"use client";

import { useEffect, useState } from "react";

import {
    Button,
    Input,
    Modal,
} from "@/components/ui";
import { Eye, EyeOff } from "lucide-react";

export interface ResetPasswordForm {
    password: string;
    password_confirmation: string;
}

interface ResetPasswordModalProps {
    open: boolean;
    user: {
        id: number;
        name: string;
        email: string;
    } | null;
    isSubmitting?: boolean;
    onClose: () => void;
    onConfirm: (
        data: ResetPasswordForm,
    ) => Promise<void> | void;
}

const INITIAL_FORM: ResetPasswordForm = {
    password: "",
    password_confirmation: "",
};

export default function ResetPasswordModal({
    open,
    user,
    isSubmitting = false,
    onClose,
    onConfirm,
}: ResetPasswordModalProps) {
    const [form, setForm] = useState(INITIAL_FORM);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const showPasswordError =
        form.password_confirmation.length > 0 &&
        form.password !== form.password_confirmation;

    useEffect(() => {
        if (open) {
            setForm(INITIAL_FORM);
        }
    }, [open]);

    const updateField = <
        K extends keyof ResetPasswordForm,
    >(
        key: K,
        value: ResetPasswordForm[K],
    ) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = async () => {
        await onConfirm(form);
    };

    const isDisabled =
        !form.password ||
        !form.password_confirmation;

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Reset Password"
            size="md"
        >
            <div className="space-y-5">
                {user && (
                    <div className="rounded-lg border border-border bg-muted/40 p-4">
                        <p className="font-medium">
                            {user.name}
                        </p>

                        <p className="text-sm text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                )}

                <Input
                    label="New Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={form.password}
                    onChange={(e) =>
                        updateField(
                            "password",
                            e.target.value,
                        )
                    }
                    rightIcon={
                        showPassword ? (
                            <Eye size={18} />
                        ) : (
                            <EyeOff size={18} />
                        )
                    }
                    onRightIconClick={() =>
                        setShowPassword((prev) => !prev)
                    }
                />

                <Input
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={
                        form.password_confirmation
                    }
                    error={
                        showPasswordError
                            ? "Passwords do not match."
                            : undefined
                    }
                    onChange={(e) =>
                        updateField(
                            "password_confirmation",
                            e.target.value,
                        )
                    }
                    rightIcon={
                        showConfirmPassword ? (
                            <Eye size={18} />
                        ) : (
                            <EyeOff size={18} />
                        )
                    }
                    onRightIconClick={() =>
                        setShowConfirmPassword(
                            (prev) => !prev,
                        )
                    }
                />

                <div className="flex justify-end gap-2 pt-2">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="primary"
                        size="lg"
                        loading={isSubmitting}
                        disabled={isDisabled}
                        onClick={handleSubmit}
                    >
                        Reset Password
                    </Button>
                </div>
            </div>
        </Modal>
    );
}