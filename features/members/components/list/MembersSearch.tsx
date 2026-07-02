import { Search } from "lucide-react";

interface MembersSearchProps {
    value: string;
    onChange: (value: string) => void;
}

export default function MembersSearch({
    value,
    onChange,
}: MembersSearchProps) {
    return (
        <div className="relative mb-4">
            <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                placeholder="Search members..."
                className="w-full h-12 bg-card border border-border rounded-lg pl-12 pr-3"
            />
        </div>
    );
}