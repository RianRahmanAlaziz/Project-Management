const STATS_COUNT = 4;
const PROJECT_COUNT = 3;
const ACTIVITY_COUNT = 4;

export default function WorkspaceOverviewSkeleton() {
    return (
        <div className="px-6 py-8 xl:px-8">
            <div className="w-full space-y-6">
                {/* Workspace Hero */}
                <SkCard>
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex items-start gap-4">
                            <Sk className="h-14 w-14 shrink-0 rounded-xl" />

                            <div className="space-y-3">
                                <div className="space-y-2">
                                    <Sk className="h-6 w-48 rounded-md" />

                                    <Sk className="h-4 w-full max-w-md rounded-md sm:w-96" />
                                </div>

                                <div className="flex flex-wrap items-center gap-3">
                                    <Sk className="h-4 w-24 rounded-md" />
                                    <Sk className="h-4 w-32 rounded-md" />
                                </div>
                            </div>
                        </div>

                        <div className="flex shrink-0 gap-2">
                            <Sk className="h-9 w-24 rounded-lg" />
                            <Sk className="h-9 w-9 rounded-lg" />
                        </div>
                    </div>
                </SkCard>

                {/* Workspace Stats */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {Array.from({
                        length: STATS_COUNT,
                    }).map((_, index) => (
                        <SkCard key={index}>
                            <div className="flex items-center gap-4">
                                <Sk className="h-11 w-11 shrink-0 rounded-xl" />

                                <div className="space-y-2">
                                    <Sk className="h-3 w-24 rounded-md" />
                                    <Sk className="h-6 w-12 rounded-md" />
                                </div>
                            </div>
                        </SkCard>
                    ))}
                </div>

                {/* Recent Projects */}
                <SkCard>
                    <div className="mb-5 flex items-center justify-between">
                        <div className="space-y-2">
                            <Sk className="h-5 w-36 rounded-md" />
                            <Sk className="h-3 w-52 rounded-md" />
                        </div>

                        <Sk className="h-8 w-20 rounded-lg" />
                    </div>

                    <div className="space-y-3">
                        {Array.from({
                            length: PROJECT_COUNT,
                        }).map((_, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between gap-4 rounded-lg border border-border p-4"
                            >
                                <div className="flex min-w-0 items-center gap-3">
                                    <Sk className="h-10 w-10 shrink-0 rounded-lg" />

                                    <div className="space-y-2">
                                        <Sk className="h-4 w-40 rounded-md" />
                                        <Sk className="h-3 w-28 rounded-md" />
                                    </div>
                                </div>

                                <div className="hidden items-center gap-5 sm:flex">
                                    <Sk className="h-3 w-20 rounded-md" />
                                    <Sk className="h-7 w-16 rounded-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                </SkCard>

                {/* Workspace Activity */}
                <SkCard>
                    <div className="mb-5 space-y-2">
                        <Sk className="h-5 w-32 rounded-md" />
                        <Sk className="h-3 w-48 rounded-md" />
                    </div>

                    <div className="space-y-5">
                        {Array.from({
                            length: ACTIVITY_COUNT,
                        }).map((_, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-3"
                            >
                                <Sk className="h-9 w-9 shrink-0 rounded-full" />

                                <div className="flex-1 space-y-2">
                                    <Sk className="h-4 w-full max-w-sm rounded-md" />
                                    <Sk className="h-3 w-24 rounded-md" />
                                </div>
                            </div>
                        ))}
                    </div>
                </SkCard>
            </div>
        </div>
    );
}

function Sk({
    className = "",
}: {
    className?: string;
}) {
    return (
        <div
            className={`animate-pulse rounded bg-muted ${className}`}
            aria-hidden="true"
        />
    );
}

function SkCard({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={`rounded-xl border border-border bg-card p-5 ${className}`}
        >
            {children}
        </div>
    );
}