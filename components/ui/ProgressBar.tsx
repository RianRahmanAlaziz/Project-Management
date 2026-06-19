interface ProgressBarProps {
    value: number;
    color?: "indigo" | "green" | "yellow" | "red";
}

export function ProgressBar({ value, color = "indigo" }: ProgressBarProps) {
    const colors = {
        indigo: "bg-primary",
        green: "bg-success",
        yellow: "bg-warning",
        red: "bg-destructive",
    };

    return (
        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div
                className={`h-full rounded-full transition-all ${colors[color]}`}
                style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
            />
        </div>
    );
}