

interface ToggleRowProps {
    label: string,
    desc: string,
    value: boolean,
    onChange: () => void,
}

export default function ToggleRow({
    label,
    desc,
    value,
    onChange }: ToggleRowProps) {
    return (
        <div className="flex items-start justify-between gap-6 border-b border-border py-4 last:border-0">
            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground">
                    {label}
                </h4>

                <p className=" text-xs leading-5 text-muted-foreground">
                    {desc}
                </p>
            </div>

            <button
                type="button"
                onClick={onChange}
                aria-pressed={value}
                className={`
                    relative h-6 w-11 shrink-0 rounded-full
                    transition-colors duration-200 cursor-pointer
                    ${value ? "bg-primary" : "bg-muted"}
                `}
            >
                <span
                    className={`
                        absolute left-0.5 top-0.5
                        h-5 w-5 rounded-full bg-white shadow
                        transition-transform duration-200
                        ${value ? "translate-x-5" : "translate-x-0"}
                    `}
                />
            </button>
        </div>
    )
}
