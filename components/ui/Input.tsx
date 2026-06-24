import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    leftIcon?: React.ReactNode;
}

export function Input({ label, error, leftIcon, className = "", ...props }: InputProps) {
    return (
        <div className="flex flex-col gap-1">
            {label && <label className="text-base font-medium text-foreground">{label}</label>}

            <div className="relative">
                {leftIcon && (
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {leftIcon}
                    </span>
                )}

                <input
                    {...props}
                    className={`w-full h-12 bg-background border border-border rounded-md px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${leftIcon ? "pl-8" : ""
                        } ${error ? "border-destructive" : ""} ${className}`}
                />
            </div>

            {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
    );
}