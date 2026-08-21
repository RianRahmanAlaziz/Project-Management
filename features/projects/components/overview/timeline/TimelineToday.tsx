interface TimelineTodayProps {
    percent: number;
}

export default function TimelineToday({
    percent,
}: TimelineTodayProps) {
    return (
        <div
            className="absolute inset-y-0 z-20"
            style={{
                left: `${percent}%`,
            }}
        >
            <div className="absolute -top-7 left-1/2 -translate-x-1/2">
                <span className="rounded-md bg-destructive px-2 py-1 text-[10px] font-semibold text-white shadow-sm">
                    Today
                </span>
            </div>

            <div className="h-full w-px bg-destructive" />

            <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-destructive" />
        </div>
    );
}