"use client";

import { useEffect, useState } from "react";

import { defaultProject } from "../lib/defaults";
import { useAuth } from "./auth-provider";
import Tasks from "./tasks";
import { useRouter } from "next/navigation";
import { Project } from "../lib/types";
import { useProject } from "./project-provider";

export default function Dashboard(){
    const [currentProject, setCurrentProject] = useState<Project>(defaultProject);
    const [isLoading, setIsLoading] = useState<Boolean>(true);

    const router = useRouter();

    const authContext = useAuth();
    const projectContext = useProject();

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

    useEffect(() => {
        console.log(currentProject);
    }, [currentProject])

    if(isLoading) return(
        <p className="text-3xl">Loading...</p>
    );
    return (
        <>
            <div className="grid grid-cols-12 grid-rows-12 h-screen">
                <div className="row-span-1 col-span-12 bg-slate-700 shadow-lg">
                    <div className="grid grid-cols-2 grid-rows-1 p-2">
                        <div className="col-span-1">
                            <div className="flex justify-start">
                                <p className="text-2xl">{currentProject.name}</p>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="flex justify-end">
                                <button className="p-2 rounded-lg bg-slate-300 text-gray-500" onClick={() => {router.push("/tasks/new")}}>New Task</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-slate-500 row-span-11 col-span-12">
                    <div className="grid grid-cols-12 grid-rows-12 gap-2 p-2 h-full">
                        <div className="bg-slate-600 col-span-3 row-span-2">
                            
                        </div>
                        <div className="bg-slate-600 col-span-3 row-span-2">
                            asd3
                        </div>
                        <div className="bg-slate-600 col-span-12 row-span-4">
                            {currentProject.tasks && <Tasks tasks={currentProject.tasks}></Tasks>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}