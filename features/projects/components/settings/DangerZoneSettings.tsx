import { DangerCard } from '@/components/layouts/settings'
import { Button } from '@/components/ui'
import { AlertTriangle, Download, Trash2 } from 'lucide-react'
import {
    Dispatch,
    SetStateAction,
} from "react";

interface DangerZoneSettingsProps {
    projectSlug: string;
    confirmDelete: string;
    setConfirmDelete: Dispatch<SetStateAction<string>>;
}

export default function DangerZoneSettings(
    {
        projectSlug,
        confirmDelete,
        setConfirmDelete
    }: DangerZoneSettingsProps
) {
    return (
        <div className="space-y-4">
            <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl flex items-start gap-2.5">
                <AlertTriangle size={14} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700 dark:text-amber-300">
                    These actions are <strong>permanent</strong>. Please read each action carefully before proceeding.
                </p>
            </div>
            <DangerCard title="Export project data" desc="Download all tasks, comments, and activity as JSON or CSV." action={<Button size="sm" variant="outline"><Download size={12} />Export</Button>} />
            <DangerCard title="Archive project" desc="Mark this project as archived. Tasks become read-only but are preserved." action={<Button size="sm" variant="outline">Archive</Button>} />
            <DangerCard
                title="Delete project"
                desc="Permanently delete this project and all its tasks, comments, and attachments."
                danger
                action={
                    <div className="space-y-2">
                        <p className="text-xs text-muted-foreground">
                            Type <span className="font-mono font-bold text-foreground">ProjectFlow v2.0</span> to confirm:
                        </p>
                        <div className="flex gap-2">
                            <input
                                value={confirmDelete}
                                onChange={e => setConfirmDelete(e.target.value)}
                                placeholder="ProjectFlow v2.0"
                                className="h-8 flex-1 bg-input-background border border-destructive/40 rounded-lg px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-destructive"
                            />
                            <Button size="sm" variant="danger" disabled={confirmDelete !== "ProjectFlow v2.0"}>
                                <Trash2 size={12} />Delete
                            </Button>
                        </div>
                    </div>
                }
            />
        </div>
    )
}
