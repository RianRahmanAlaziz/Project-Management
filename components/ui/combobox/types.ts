import React from "react";

export interface ComboboxOption {
    value: string;
    label: string;
    description?: string;
    icon?: React.ReactNode;
    avatar?: React.ReactNode;
    disabled?: boolean;
}