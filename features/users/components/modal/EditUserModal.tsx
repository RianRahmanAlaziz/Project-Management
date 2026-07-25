"use client";

import { useEffect, useState } from "react";

import { ShieldCheck, UserRound } from "lucide-react";

import {
    Button,
    Combobox,
    Input,
    Modal,
} from "@/components/ui";
import { FaUserShield } from "react-icons/fa";

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

export interface EditUserForm {
    name: string;
    email: string;
    role: "super_admin" | "user";
}

interface EditUserModalProps {
    open: boolean;
    user: EditUserForm | null;
    isSubmitting?: boolean;
    onClose: () => void;
    onConfirm: (
        data: EditUserForm,
    ) => Promise<void> | void;
}

const INITIAL_FORM: EditUserForm = {
    name: "",
    email: "",
    role: "user",
};

export default function EditUserModal({
    open,
    user,
    isSubmitting = false,
    onClose,
    onConfirm,
}: EditUserModalProps) {
    const [form, setForm] =
        useState<EditUserForm>(INITIAL_FORM);

    useEffect(() => {
        if (open && user) {
            setForm(user);
        }
    }, [open, user]);

    const updateField = <
        K extends keyof EditUserForm,
    >(
        key: K,
        value: EditUserForm[K],
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
        !form.email.trim();

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Edit User"
            size="md"
        >
            <div className="space-y-5">
                <Input
                    label="Full Name"
                    value={form.name}
                    placeholder="Enter full name"
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
                    value={form.email}
                    placeholder="Enter email address"
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
                            value as
                            | "super_admin"
                            | "user",
                        )
                    }
                    placeholder="Select role"
                    searchable={false}
                    options={ROLE_OPTIONS}
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
                        Save Changes
                    </Button>
                </div>
            </div>
        </Modal>
    );
}