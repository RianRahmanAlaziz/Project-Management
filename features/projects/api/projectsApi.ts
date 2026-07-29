import { apiClient } from "@/lib/api/apiClient";
import type {
    ProjectsListResponse,
} from "../types/projects";

export async function getProjects(
    workspaceSlug: string,
): Promise<ProjectsListResponse> {
    const response = await apiClient.get<ProjectsListResponse>(
        `/workspaces/${workspaceSlug}/projects`,
    );
    return response.data;
}
