"use client";

import { createContext, useContext, useState } from "react";
import { Project } from "../lib/types";
import { defaultProject } from "../lib/defaults";
import { getProjectById } from "../actions/project";
import { useAuth } from "./auth-provider";

interface ProjectContextType {
    project: Project
    setProjectContext: (projectId: number) => void
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({children}: {children: React.ReactNode}) => {
    const [project, setProject] = useState<Project>(defaultProject);

    const setProjectContext = async (projectId: number) => {
        const fetched_project = await getProjectById(projectId);
        setProject(fetched_project);
    }

    return (
        <ProjectContext.Provider value={{project, setProjectContext}}>
            {children}
        </ProjectContext.Provider>
    );
}

export const useProject = () => useContext(ProjectContext);