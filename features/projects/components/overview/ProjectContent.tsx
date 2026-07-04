
import {
    ProjectHealth,
    ProjectProgres,
    ProjectTimeline,
}
    from "@/features/projects/components";
import type { Projects } from "@/features/projects/types/projects";


interface ProjectContentProps {
    project: Projects;
};

export default function ProjectContent({
    project,
}: ProjectContentProps) {

    return (
        <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ProjectProgres
                    project={project} />

                <ProjectTimeline
                    project={project} />

                <ProjectHealth
                    project={project}
                />
            </div>
        </div>
    )
}
