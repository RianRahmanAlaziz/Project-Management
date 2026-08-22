export function formatDate(
    date: string | null,
): string {
    if (!date) {
        return "-";
    }

    const formatter = new Intl.DateTimeFormat(
        "en-GB",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        },
    );

    const parts = formatter.formatToParts(
        new Date(date),
    );

    const day = parts.find(
        (part) => part.type === "day",
    )?.value ?? "";

    const month = parts.find(
        (part) => part.type === "month",
    )?.value ?? "";

    const year = parts.find(
        (part) => part.type === "year",
    )?.value ?? "";

    return `${day} ${month} ${year}`;
}