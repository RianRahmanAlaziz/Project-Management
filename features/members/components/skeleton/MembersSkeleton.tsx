import { Skeleton } from "@/components/ui/Skeleton";

import {
    MemberRowSkeleton,
} from "@/features/members/components";

const DEFAULT_SKELETON_COUNT = 3;

export default function MembersSkeleton() {
    return (
        <div
            className="px-6 py-8 xl:px-8"
            aria-label="Loading members"
            aria-busy="true"
        >
            {/* Header */}
            <div className="mb-5 w-full space-y-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-36" />
                        <Skeleton className="h-4 w-64" />
                    </div>

                    <Skeleton className="h-10 w-36 rounded-lg" />
                </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 flex gap-2 border-b border-border">
                <div className="pb-3">
                    <Skeleton className="h-5 w-20" />
                </div>

                <div className="pb-3">
                    <Skeleton className="h-5 w-24" />
                </div>
            </div>

            {/* Search */}
            <Skeleton className="mb-6 h-10 w-full rounded-lg" />

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-border bg-card">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-border">
                            <th className="px-6 py-4 text-left">
                                <Skeleton className="h-5 w-20" />
                            </th>

                            <th className="px-6 py-4">
                                <div className="flex justify-center">
                                    <Skeleton className="h-5 w-14" />
                                </div>
                            </th>

                            <th className="hidden px-6 py-4 text-left lg:table-cell">
                                <Skeleton className="h-5 w-16" />
                            </th>

                            <th className="px-6 py-4">
                                <div className="flex justify-center">
                                    <Skeleton className="h-5 w-16" />
                                </div>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {Array.from({
                            length: DEFAULT_SKELETON_COUNT,
                        }).map((_, index) => (
                            <MemberRowSkeleton
                                key={index}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}