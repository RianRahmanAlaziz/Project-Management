
interface MyTasksHeaderProops {
    filtered: number
}

export default function MyTasksHeader({ filtered }: MyTasksHeaderProops) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    My Tasks
                </h1>

                <p className="mt-1 text-m text-muted-foreground">
                    {filtered} tasks
                </p>
            </div>
        </div>
    )
}
