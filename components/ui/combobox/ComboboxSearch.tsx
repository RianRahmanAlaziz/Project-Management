import clsx from "clsx";
import { Command } from "cmdk";

export function ComboboxSearch({
    searchable,
    placeholder,
}: {
    searchable: boolean;
    placeholder: string;
}) {
    return (
        <Command.Input
            placeholder={placeholder}
            className={clsx(
                searchable
                    ? "mb-2 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none"
                    : "absolute h-0 w-0 overflow-hidden opacity-0 pointer-events-none"
            )}
        />
    );
}