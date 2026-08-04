interface Props {
    months: string[];
}

export default function TimelineHeader({
    months,
}: Props) {

    return (
        <div
            className="mb-5 grid gap-5"
            style={{ gridTemplateColumns: "280px 1fr" }}
        >
            <p className="text-sm font-medium text-muted-foreground">
                Task
            </p>
            <div
                className="grid"
                style={{ gridTemplateColumns: `repeat(${months.length},1fr)` }}
            >
                {months.map(month => (
                    <div
                        key={month}
                        className="text-center text-xs font-medium text-muted-foreground"
                    >
                        {month}
                    </div>
                ))}
            </div>
        </div>

    );
}