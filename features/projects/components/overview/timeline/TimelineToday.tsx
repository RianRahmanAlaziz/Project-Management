interface Props {
    percent: number;
}

export default function TimelineToday({
    percent,
}: Props) {
    return (
        <div
            className="absolute inset-y-0 z-30"
            style={{ left: `${percent}%` }}
        >
            <div className="absolute -top-7 -translate-x-1/2 rounded-md bg-red-500 px-2 py-1 text-[10px] text-white shadow">
                Today
            </div>
            <div className="h-full w-px bg-red-500" />
        </div>

    );

}