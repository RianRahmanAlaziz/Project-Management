
import {
    ProjectHealth,
    ProjectProgres,
    ProjectTimeline,
}
    from "@/features/projects/components";
import type { DetailProject } from "@/features/projects/types/projects";


interface ProjectContentProps {
    project: DetailProject;
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
