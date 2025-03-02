"use client";

import { useEffect, useState } from "react";
import { getProjects } from "../actions/project";

import { defaultProject } from "../lib/defaults";

export default function Dashboard(){
    const [currentProject, setCurrentProject] = useState<Project>(defaultProject);
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    useEffect(() => {
        const getCurrentProject = async () => {
            const current_project = (await getProjects())[0];
            if(!current_project) return;
            setCurrentProject(current_project);
            setIsLoading(false);
        }

        getCurrentProject();    
    }, [])
    return (
        <>
            {!isLoading && <div className="grid grid-cols-12 grid-rows-12">
                <div className="row-span-1 col-span-12 bg-slate-700 p-4 shadow-lg">
                    <p className="text-2xl">{currentProject.name}</p>
                </div>
            </div>}
        </>
    );
}