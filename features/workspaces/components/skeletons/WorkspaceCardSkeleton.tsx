import { Skeleton } from "@/components/ui/Skeleton";

export default function WorkspaceCardSkeleton() {
    return (
        <article className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-5 flex items-start justify-between gap-3">
                <div className="flex min-w-0 flex-1 items-start gap-3">
                    <Skeleton className="h-12 w-12 shrink-0 rounded-xl" />

                    <div className="min-w-0 flex-1">
                        <Skeleton className="h-5 w-36" />

                        <div className="mt-2 space-y-2">
                            <Skeleton className="h-3.5 w-full max-w-64" />
                            <Skeleton className="h-3.5 w-2/3" />
                        </div>
                    </div>
                </div>

            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-3.5 w-20" />
                </div>

                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-3.5 w-20" />
                </div>
            </div>
        </article>
    );
}