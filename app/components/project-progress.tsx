"use client";

import { useEffect, useState } from "react";
import { useProject } from "./project-provider";
import { getProjectTaskCount, getProjectTaskCountByState } from "../actions/task";
import { TaskState } from "@prisma/client";
import CircularProgressBar from "./circular-progressbar";



export default function ProjectProgress(){
    const [allTaskCount, setAllTaskCount] = useState<number>(0);
    const [doneTaskCount, setDoneTaskCount] = useState<number>(0);

    const projectContext = useProject();

    useEffect(() => {
        const getTaskCount = async () => {
            if(!projectContext?.project) return;
            const tasks = await getProjectTaskCount(projectContext?.project.id)
            setAllTaskCount(tasks)
            const doneTasks = await getProjectTaskCountByState(projectContext.project.id, TaskState.DONE);
            setDoneTaskCount(doneTasks);
        }
        getTaskCount();
    }, [projectContext]);

    return (
        <>
            <div className="flex flex-row justify-center align-middle">
                <div className="">
                    <p>{doneTaskCount || ""} / {allTaskCount || ""}</p>
                    <progress value={doneTaskCount} max={allTaskCount}></progress>
                </div>
            </div>
        </>
    );
}