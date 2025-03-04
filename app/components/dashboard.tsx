"use client";

import { useEffect, useState } from "react";

import { useAuth } from "./auth-provider";
import Tasks from "./tasks";
import { useRouter } from "next/navigation";
import { useProject } from "./project-provider";
import ProjectProgress from "./project-progress";
import { getAuthCookie } from "../actions/user";

export default function Dashboard(){
    const [isLoading, setIsLoading] = useState<Boolean>(true);

    const router = useRouter();

    const authContext = useAuth();
    const projectContext = useProject();

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            const userId = await getAuthCookie();
            if(!userId) {
                router.push("/");
            }else{
                authContext?.login(userId);
            }
        }
        checkUserLoggedIn();
    }, [])

    useEffect(() => {
        const getCurrentProject = async () => {
            console.log(authContext);
            if(!authContext?.user?.projects) return;
            projectContext?.setProjectContext(authContext?.user?.projects[0].id);
            setIsLoading(false);
        }
        getCurrentProject();    
    }, [authContext?.user])

    useEffect(() => {
        if(!projectContext) return;
        console.log(projectContext.project);
    }, [projectContext])

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
                                <p className="text-2xl">{projectContext?.project && projectContext.project.name}</p>
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
                            <ProjectProgress></ProjectProgress>
                        </div>
                        <div className="bg-slate-600 col-span-3 row-span-2">
                            asd3
                        </div>
                        <div className="bg-slate-600 col-span-12 row-span-4">
                            {projectContext?.project?.tasks && <Tasks tasks={projectContext?.project?.tasks}></Tasks>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}