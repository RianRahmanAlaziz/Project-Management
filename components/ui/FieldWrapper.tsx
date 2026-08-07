
interface FieldWrapperProps {
    label?: React.ReactNode;
    children: React.ReactNode;
}

export function FieldWrapper({
    label,
    children,
}: FieldWrapperProps) {
    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label className="mb-2.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    {label}
                </label>
            )}

            {children}
        </div>
    );
}