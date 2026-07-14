import { Dispatch, SetStateAction } from "react";

export interface ProjectColor {
    label: string;
    bg: string;
    ring: string;
}

export interface ProjectForm {
    name: string;
    description: string;
    identifier: string;
    status: string;
    priority: string;
    startDate: string;
    dueDate: string;
}

export type SetProjectForm =
    Dispatch<SetStateAction<ProjectForm>>;