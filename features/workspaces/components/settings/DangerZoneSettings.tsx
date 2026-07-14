import { Button } from '@/components/ui'
import { AlertTriangle, Download, Trash2 } from 'lucide-react'
import { Dispatch, SetStateAction } from "react";

import {
    DangerCard
} from "@/components/layouts/settings";


interface DangerZoneSettingsProps {
    workspaceSlug: string;
    confirmDelete: string;
    setConfirmDelete: Dispatch<SetStateAction<string>>;
}

export default function DangerZoneSettings({
    workspaceSlug,
    confirmDelete,
    setConfirmDelete
}: DangerZoneSettingsProps) {
    return (
        <div className="space-y-4">
            <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl flex items-start gap-2.5">
                <AlertTriangle size={15} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700 dark:text-amber-300">
                    Actions in this section are <strong>permanent and cannot be undone.</strong> Proceed with extreme caution.
                </p>
            </div>

            <DangerCard
                title="Transfer ownership"
                desc="Transfer this workspace to another member. You will lose owner privileges."
                action={<Button size="sm" variant="outline" className="border-warning text-warning hover:bg-warning/5">Transfer</Button>}
            />
            <DangerCard
                title="Export workspace data"
                desc="Download all workspace data including projects, tasks, and member activity."
                action={<Button size="sm" variant="outline"><Download size={12} />Export</Button>}
            />
            <DangerCard
                title="Archive workspace"
                desc="Archiving will make the workspace read-only. You can restore it at any time."
                action={<Button size="sm" variant="outline">Archive</Button>}
            />
            <DangerCard
                title="Delete workspace"
                desc="Permanently delete this workspace and all its data. This cannot be undone."
                danger
                action={
                    <div className="space-y-2">
                        <p className="text-xs text-muted-foreground">
                            Type <span className="font-mono font-bold text-foreground">{workspaceSlug}</span> to confirm:
                        </p>
                        <div className="flex gap-2">
                            <input
                                placeholder={workspaceSlug}
                                value={confirmDelete}
                                onChange={(e) =>
                                    setConfirmDelete(e.target.value)
                                }
                                className="h-8 flex-1 bg-input-background border border-destructive/40 rounded-lg px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-destructive"
                            />
                            <Button
                                size="sm"
                                variant="danger"
                                disabled={confirmDelete !== workspaceSlug}
                            >
                                <Trash2 size={12} />Delete
                            </Button>
                        </div>
                    </div>
                }
            />
        </div>
    )
}
