import { Command } from "cmdk";
import { CheckSquare, Square } from "lucide-react";

interface MultiSelectHeaderProps {
    selectedCount: number;
    totalCount: number;
    onToggleAll: () => void;
}

export function MultiSelectHeader({
    selectedCount,
    totalCount,
    onToggleAll,
}: MultiSelectHeaderProps) {
    return (
        <div className="border-b border-border py-2">
            <Command.Item
                value="__select_all__"
                onSelect={onToggleAll}
                className="cursor-pointer rounded-lg outline-none data-[selected=true]:bg-muted"
            >
                <div className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted">
                    {selectedCount === totalCount ? (
                        <CheckSquare
                            size={18}
                            className="text-primary"
                        />
                    ) : (
                        <Square
                            size={18}
                            className="text-muted-foreground"
                        />
                    )}

                    <span className="text-sm font-medium">
                        Select All
                    </span>
                </div>
            </Command.Item>
        </div>
    )
}
