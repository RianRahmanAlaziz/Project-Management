export function AuthSeparator() {
    return (
        <div className="mb-5 flex items-center gap-2">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">
                or continue with email
            </span>
            <div className="h-px flex-1 bg-border" />
        </div>
    );
}