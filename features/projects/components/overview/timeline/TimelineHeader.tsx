import type { TimelineMonth } from "./timelineUtils";

interface Props {
    months: TimelineMonth[];
}

export default function TimelineHeader({
    months,
}: Props) {
    return (
        <div
            className="grid gap-5"
            style={{
                gridTemplateColumns: "280px 1fr",
            }}
        >
            <p className="text-sm font-medium text-muted-foreground">
                Task
            </p>

            <div
                className="grid"
                style={{
                    gridTemplateColumns: `repeat(${months.length}, minmax(80px, 1fr))`,
                }}
            >
                {months.map((month) => (
                    <div
                        key={month.key}
                        className="min-w-20 text-center text-xs font-medium text-muted-foreground"
                    >
                        {month.label}
                    </div>
                ))}
            </div>
        </div>
    );
}