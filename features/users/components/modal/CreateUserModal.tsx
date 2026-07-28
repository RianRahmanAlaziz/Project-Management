"use client";

import { useEffect, useState } from "react";

import { ShieldCheck, Eye, EyeOff } from "lucide-react";

import {
    Button,
    Combobox,
    Input,
    Modal,
} from "@/components/ui";
import { FaUserShield } from "react-icons/fa";
import { Users, CreateUserForm } from "../../types/users";

const ROLE_OPTIONS = [
    {
        value: "super_admin",
        label: "Super Admin",
        description: "Full system access",
        icon: (
            <ShieldCheck
                size={16}
                className="text-blue-500"
            />
        ),
    },
    {
        value: "user",
        label: "User",
        description: "Standard user access",
        icon: (
            <FaUserShield
                size={16}
                className="text-emerald-500"
            />
        ),
    },
];

interface CreateUserModalProps {
    open: boolean;
    isSubmitting?: boolean;
    onClose: () => void;
    onConfirm: (
        data: CreateUserForm,
    ) => Promise<void>;
}

const INITIAL_FORM: CreateUserForm = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "",
};

export function CreateUserModal({
    open,
    isSubmitting = false,
    onClose,
    onConfirm,
}: CreateUserModalProps) {
    const [form, setForm] = useState<CreateUserForm>(INITIAL_FORM);
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
        K extends keyof CreateUserForm,
    >(
        key: K,
        value: CreateUserForm[K],
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
        !form.name.trim() ||
        !form.email.trim() ||
        !form.password ||
        !form.password_confirmation;

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Create User"
            size="md"
        >
            <div className="space-y-5">
                <Input
                    label="Full Name"
                    placeholder="Enter full name"
                    value={form.name}
                    onChange={(e) =>
                        updateField(
                            "name",
                            e.target.value,
                        )
                    }
                />

                <Input
                    label="Email Address"
                    type="email"
                    placeholder="Enter email address"
                    value={form.email}
                    onChange={(e) =>
                        updateField(
                            "email",
                            e.target.value,
                        )
                    }
                />

                <Combobox
                    label="Role"
                    value={form.role}
                    onValueChange={(value) =>
                        updateField(
                            "role",
                            value as "" | "super_admin" | "user",
                        )
                    }
                    placeholder="Select role"
                    searchable={false}
                    options={ROLE_OPTIONS}
                />

                <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
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
                    placeholder="Confirm password"
                    value={form.password_confirmation}
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
                    rightIcon={showConfirmPassword ? (
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
                        Create User
                    </Button>
                </div>
            </div>
        </Modal>
    );
}