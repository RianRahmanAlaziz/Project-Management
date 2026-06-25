import { Badge } from '@/components/ui';
import { Link2, X } from 'lucide-react';
import type { Tasks } from '@/features/tasks/types/tasks'


interface TaskHeaderProps {
    tasks: Tasks;
    status: string;
    onClose: () => void;
}
export default function TaskHeader({
    tasks,
    status,
    onClose }: TaskHeaderProps) {
    return (
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border shrink-0">
            <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground font-mono">{tasks.project.toUpperCase()}-{tasks.id.slice(1)}</span>
                <Badge label={status} color={
                    status === "Done" ? "green" : status === "In Progress" ? "indigo" : status === "Review" ? "yellow" : "gray"
                } />
            </div>
            <div className="flex items-center gap-1.5">
                <button className="text-muted-foreground hover:text-foreground transition-colors p-1 cursor-pointer">
                    <Link2 size={14} />
                </button>
                <button
                    onClick={onClose}
                    className="text-muted-foreground hover:text-foreground transition-colors p-1 cursor-pointer">
                    <X size={14} />
                </button>
            </div>
        </div>
    )
}
