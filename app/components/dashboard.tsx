"use client";

import { useEffect, useState } from "react";

import { defaultProject } from "../lib/defaults";
import { useAuth } from "./auth-provider";

export default function Dashboard(){
    const [currentProject, setCurrentProject] = useState<Project>(defaultProject);
    const [isLoading, setIsLoading] = useState<Boolean>(true);

    const authContext = useAuth();
    useEffect(() => {
        const getCurrentProject = async () => {
            if(!authContext?.user?.projects) return;
            const current_project = authContext?.user?.projects[0]
            if(!current_project) return;
            setCurrentProject(current_project);
            setIsLoading(false);
        }
        getCurrentProject();    
    }, [authContext?.user])
    if(isLoading) return(
        <p className="text-3xl">Loading...</p>
    );
    return (
        <>
            <div className="grid grid-cols-12 grid-rows-12 h-screen">
                <div className="row-span-1 col-span-12 bg-slate-700 p-4 shadow-lg">
                    <p className="text-2xl">{currentProject.name}</p>
                </div>
                <div className="bg-slate-500 row-span-11 col-span-12">
                    <div className="grid grid-cols-12 grid-rows-12 gap-2 p-2 h-full">
                        <div className="bg-slate-600 col-span-3 row-span-2">
                            asd
                        </div>
                        <div className="bg-slate-600 col-span-3 row-span-2">
                            asd3
                        </div>
                        <div className="bg-slate-600 col-span-12 row-span-4">
                            <Tasks></Tasks>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}