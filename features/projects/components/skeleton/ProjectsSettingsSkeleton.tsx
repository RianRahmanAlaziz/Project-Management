import { Skeleton } from "@/components/ui";

const COLOR_COUNT = 18;

export function ProjectsSettingsSkeleton() {
    return (
        <div className="flex h-full flex-1 flex-col overflow-hidden">
            <div className="flex flex-1 overflow-hidden">

                {/* Settings Sidebar */}
                <div className="w-56 shrink-0 border-r border-border p-4">
                    <Skeleton className="mb-5 h-5 w-24 rounded-md" />

                    <div className="space-y-2">
                        <SidebarItemSkeleton />
                        <SidebarItemSkeleton />
                        <SidebarItemSkeleton />
                        <SidebarItemSkeleton />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="max-w space-y-6">
                        <div className="rounded-xl border border-border bg-card">

                            {/* Section Header */}
                            <div className="border-b border-border p-6">
                                <Skeleton className="h-6 w-40 rounded-md" />
                                <Skeleton className="mt-2 h-4 w-72 rounded-md" />
                            </div>

                            {/* Form */}
                            <div className="space-y-6 p-6">

                                {/* Project Identity */}
                                <div className="flex items-center gap-4">
                                    <Skeleton className="h-14 w-14 shrink-0 rounded-2xl" />

                                    <div className="min-w-0 flex-1">
                                        <Skeleton className="mb-2 h-3 w-24 rounded-md" />

                                        <div className="flex flex-wrap gap-2">
                                            {Array.from({
                                                length: COLOR_COUNT,
                                            }).map((_, index) => (
                                                <Skeleton
                                                    key={index}
                                                    className="h-7 w-7 rounded-lg"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Project Name */}
                                <div className="space-y-1.5">
                                    <Skeleton className="h-3 w-28 rounded-md" />
                                    <Skeleton className="h-9 w-full rounded-lg" />
                                </div>

                                {/* Description */}
                                <div className="space-y-1.5">
                                    <Skeleton className="h-3 w-20 rounded-md" />

                                    <Skeleton className="h-32 w-full rounded-lg" />
                                </div>

                                {/* Dates */}
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-1.5">
                                        <Skeleton className="h-3 w-20 rounded-md" />
                                        <Skeleton className="h-9 w-full rounded-lg" />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Skeleton className="h-3 w-20 rounded-md" />
                                        <Skeleton className="h-9 w-full rounded-lg" />
                                    </div>
                                </div>

                                {/* Status & Priority */}
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="space-y-1.5">
                                        <Skeleton className="h-3 w-16 rounded-md" />
                                        <Skeleton className="h-12 w-full rounded-lg" />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Skeleton className="h-3 w-20 rounded-md" />
                                        <Skeleton className="h-12 w-full rounded-lg" />
                                    </div>
                                </div>

                            </div>

                            {/* Footer */}
                            <div className="flex justify-end border-t border-border px-6 py-4">
                                <Skeleton className="h-10 w-32 rounded-lg" />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SidebarItemSkeleton() {
    return (
        <div className="flex items-center gap-1 rounded-lg px-1 py-0.5">
            <Skeleton className="h-9 w-full rounded-lg" />
        </div>
    );
}
