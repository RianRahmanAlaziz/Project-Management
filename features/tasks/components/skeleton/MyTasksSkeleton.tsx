import { Skeleton } from "@/components/ui";

export default function MyTasksSkeleton() {
    return (
        <div className="px-6 py-8 xl:px-8">
            {/* Header */}
            <div className="mb-5 flex flex-col gap-2">
                <Skeleton className="h-9 w-32 rounded-md" />
                <Skeleton className="h-4 w-20 rounded-md" />
            </div>

            {/* Tabs */}
            <div className="pb-2 flex gap-2 border-b border-border">
                <Skeleton className="h-11 w-16 rounded-t-md" />
                <Skeleton className="h-11 w-20 rounded-t-md" />
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-border bg-card mt-5">
                {/* Header */}
                <div className="grid grid-cols-[1fr_140px_120px_120px] gap-4 border-b border-border px-4 py-3">
                    <Skeleton className="h-4 w-16 rounded-md" />
                    <Skeleton className="h-4 w-16 rounded-md" />
                    <Skeleton className="h-4 w-16 rounded-md" />
                    <Skeleton className="h-4 w-16 rounded-md" />
                </div>

                {/* Rows */}
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-[1fr_140px_120px_120px] gap-4 border-b border-border px-4 py-4 last:border-0" >
                        <div className="flex items-center gap-2.5">
                            <Skeleton className="h-1.5 w-1.5 rounded-full" />
                            <Skeleton className="h-4 w-48 rounded-md" />
                        </div>

                        <Skeleton className="h-6 w-24 rounded-full" />

                        <Skeleton className="h-4 w-16 rounded-md" />

                        <Skeleton className="h-4 w-20 rounded-md" />
                    </div>
                ))}
            </div>
        </div>
    );
}
