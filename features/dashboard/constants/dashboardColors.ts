export const statusColors: Record<
    string,
    "indigo" | "yellow" | "green" | "gray" | "red"
> = {
    "In Progress": "indigo",
    Review: "yellow",
    Done: "green",
    Todo: "gray",
    Backlog: "gray",
};

export const priorityDotColors: Record<string, string> = {
    High: "bg-destructive",
    Medium: "bg-warning",
    Low: "bg-muted-foreground",
};