"use client";

import { createContext, useContext, useState } from "react";

const ProjectContext = createContext(undefined);

export const ProjectProvider = ({children}: {children: React.ReactNode}) => {

    const [project, setProject] = useState<Project | undefined>(undefined);

    return (
        <ProjectContext.Provider value={undefined}>
            {children}
        </ProjectContext.Provider>
    );
}

export const useProject = () => useContext(ProjectContext);