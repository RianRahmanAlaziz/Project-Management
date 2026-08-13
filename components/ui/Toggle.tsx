"use client";

interface ToggleProps {
    value: boolean;
    onChange: () => void;
    disabled?: boolean;
}

export default function Toggle({
    value,
    onChange,
    disabled = false,
}: ToggleProps) {
    return (
        <button
            type="button"
            onClick={onChange}
            disabled={disabled}
            aria-pressed={value}
            className={`
                relative
                h-6
                w-11
                shrink-0
                rounded-full
                transition-colors
                duration-200
                cursor-pointer
                disabled:cursor-not-allowed
                disabled:opacity-50
                ${value ? "bg-primary" : "bg-muted"}
            `}
        >
            <span
                className={`
                    absolute
                    left-0.5
                    top-0.5
                    h-5
                    w-5
                    rounded-full
                    bg-white
                    shadow
                    transition-transform
                    duration-200
                    ${value
                        ? "translate-x-5"
                        : "translate-x-0"
                    }
                `}
            />
        </button>
    );
}