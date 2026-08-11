
import {
    ProjectHealth,
    ProjectProgres,
    ProjectTimeline,
}
    from "@/features/projects/components";
import type { DetailProject } from "@/features/projects/types/projects";
import { Tasks } from "@/features/tasks/types/tasks";


interface ProjectContentProps {
    project: DetailProject;
    tasks: Tasks[];
};

export default function ProjectContent({
    project,
    tasks,
}: ProjectContentProps) {

    return (
        <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ProjectProgres
                    project={project}
                    tasks={tasks} />

                <ProjectTimeline project={project} />

                <ProjectHealth
                    project={project}
                    tasks={tasks}
                />
            </div>
        </div>
    )
}
