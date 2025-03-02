"use client";

import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import { useAuth } from "./auth-provider";
import { getAuthCookie } from "../actions/user";
import { createTask } from "../actions/task";
import { useRouter } from "next/navigation";

export default function NewTask() {
    const [currentProject, setCurrentProject] = useState<Project | undefined>(undefined);

    const [taskName, setTaskName] = useState("");
    const [taskDesc, setTaskDesc] = useState("");

    const [newTask, setNewTask] = useState<Task | undefined>(undefined);

    const router = useRouter();

    const authContext = useAuth();
    //TODO: do session because it is an other site, no login has been done

    useEffect(() => {
        const login = async () => {
            const userId = await getAuthCookie();
            if(!userId) return;
            await authContext?.login(userId);
        }
        login();
    }, [])

    useEffect(() => {
        const getCurrentProject = () => {
            if (!authContext?.user?.projects) return;
            const current_project = authContext.user.projects[0];
            if(!current_project) return;
            setCurrentProject(current_project);
        }
        getCurrentProject();
    }, [authContext?.user]);

    useEffect(() => {
        if(!newTask) return;
        router.push("/dashboard");
    }, [newTask])

    const handleTaskCreation = async (e: any) => {
        e.preventDefault();
        if(!currentProject?.id) return;
        const new_task = await createTask(taskName, taskDesc, currentProject?.id);
        setNewTask(new_task);
    }

    return (
        <>
            <div className="flex flex-col w-screen items-center">
                <div>
                    <p className="text-3xl">Add new task</p>
                    <form onSubmit={handleTaskCreation}>
                        <div className="flex flex-col items-center">
                            <input placeholder="Task name" name="name" value={taskName} onChange={(e) => setTaskName(e.target.value)}></input>
                            <input placeholder="Task description" name="description" value={taskDesc} onChange={(e) => setTaskDesc(e.target.value)}></input>
                            <button type="submit">Create task</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}