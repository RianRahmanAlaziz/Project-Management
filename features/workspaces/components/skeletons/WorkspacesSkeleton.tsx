import { Skeleton } from "@/components/ui/Skeleton";

import { WorkspaceCardSkeleton } from "@/features/workspaces/components/skeletons";

const SKELETON_COUNT = 3;


export default function WorkspacesSkeleton() {
    return (
        <div
            className="px-6 py-8 xl:px-8"
            aria-label="Loading workspaces"
            aria-busy="true"
        >
            <div className="w-full space-y-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-36" />
                        <Skeleton className="h-4 w-64" />
                    </div>

                    <Skeleton className="h-10 w-36 rounded-lg" />
                </div>

                <Skeleton className="h-10 w-full rounded-lg" />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {Array.from({
                        length: SKELETON_COUNT,
                    }).map((_, index) => (
                        <WorkspaceCardSkeleton
                            key={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}