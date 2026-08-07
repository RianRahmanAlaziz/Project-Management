import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: React.ReactNode;
    error?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onRightIconClick?: () => void;
}

export function Input({ label, error, leftIcon, rightIcon, onRightIconClick, className = "", ...props }: InputProps) {
    return (
        <div className="flex flex-col gap-2">
            {label &&
                <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-1.5">
                    {label}
                </label>
            }

            <div className="relative">
                {leftIcon && (
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {leftIcon}
                    </span>
                )}

                <input
                    {...props}
                    className={`w-full h-12 bg-background border border-border rounded-lg px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${leftIcon ? "pl-8" : ""
                        } ${error ? "border-destructive" : ""} ${className}`}
                />
                {rightIcon && (
                    <button
                        type="button"
                        aria-label={props.type === "password"
                            ? "Show password"
                            : "Hide password"
                        }
                        onClick={onRightIconClick}
                        className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    >
                        {rightIcon}
                    </button>
                )}
            </div>

            {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
        </div>
    );
}