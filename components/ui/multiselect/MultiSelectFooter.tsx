interface MultiSelectFooterProps {
    selectedCount: number;
    onDone: () => void;
}

export default function MultiSelectFooter({
    selectedCount,
    onDone
}: MultiSelectFooterProps) {
    return (
        <div className="mt-2 border-t border-border pt-2">
            <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                    {selectedCount} selected
                </span>
                <div
                    role="button"
                    tabIndex={0}
                    onClick={onDone}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            onDone();
                        }
                    }}
                    className="cursor-pointer rounded-md px-2 py-1 text-xs font-medium text-primary hover:bg-primary/10"
                >
                    Done
                </div>
            </div>
        </div>
    )
}
