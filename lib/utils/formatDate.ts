export function formatDate(
    date: string | null,
): string {
    if (!date) {
        return "-";
    }

    return new Date(date).toLocaleDateString(
        "en-GB",
        {
            day: "2-digit",
            month: "long",
            year: "numeric",
        },
    ).replace(/ /g, "-");
}