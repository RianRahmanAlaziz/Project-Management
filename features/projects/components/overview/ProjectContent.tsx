
import type { Projects } from "@/features/projects/types/projects";
import ProjectHealth from './content/ProjectHealth';
import ProjectProgres from './content/ProjectProgres';
import ProjectTimeline from './timeline/ProjectTimeline';


interface ProjectsContentProps {
    project: Projects;
};

export default function ProjectsContent({
    project,
}: ProjectsContentProps) {

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
