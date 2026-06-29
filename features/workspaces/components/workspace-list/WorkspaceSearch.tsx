import { Search } from "lucide-react";

interface WorkspaceSearchProps {
    value: string;
    onChange: (value: string) => void;
}

export default function WorkspaceSearch({
    value,
    onChange,
}: WorkspaceSearchProps) {
    return (
        <div className="relative mb-4 ">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="Search workspaces..."
                className="w-full h-12 bg-card border border-border rounded-lg pl-8 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring shadow-m"
            />
        </div>
    );
}