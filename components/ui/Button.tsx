import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
    size?: "xs" | "sm" | "md" | "lg";
    loading?: boolean;
}

export function Button({
    variant = "primary",
    size = "md",
    loading,
    children,
    className = "",
    disabled,
    ...props
}: ButtonProps) {
    const variants = {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        ghost: "bg-transparent text-foreground hover:bg-muted",
        danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-border bg-transparent text-foreground hover:bg-muted",
    };

    const sizes = {
        xs: "h-6 px-2 text-xs rounded",
        sm: "h-7 px-3 text-xs rounded",
        md: "h-8 px-4 text-sm rounded-md",
        lg: "h-12 px-6 text-base rounded-lg"
    };

    return (
        <button
            {...props}
            disabled={disabled || loading}
            className={`cursor-pointer inline-flex items-center justify-center gap-1.5 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
        >
            {loading && (
                <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
            )}
            {children}
        </button>
    );
}