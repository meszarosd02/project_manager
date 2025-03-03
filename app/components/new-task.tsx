"use client";

import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import { useAuth } from "./auth-provider";
import { getAuthCookie } from "../actions/user";
import { createSubTask, createTask, getTask } from "../actions/task";
import { useRouter } from "next/navigation";
import { Priority } from "@prisma/client";
import { Project, Task } from "../lib/types";

export default function NewTask() {
    const [currentProject, setCurrentProject] = useState<Project | undefined>(undefined);

    const [taskName, setTaskName] = useState("");
    const [taskDesc, setTaskDesc] = useState("");

    const [newTask, setNewTask] = useState<Task | undefined>(undefined);

    const router = useRouter();

    const authContext = useAuth();

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
        /*const new_task = await createTask(taskName, taskDesc, currentProject?.id, Priority.MEDIUM);
        setNewTask(new_task);*/
        //const new_task = await createSubTask(6, "research github auth 2", "teszt", Priority.LOW);
        const task = await getTask(4);
        console.log(task);
    }

    return (
        <>
            <div className="flex flex-col w-screen items-center">
                <div>
                    <p className="text-3xl">Add new task</p>
                    <form onSubmit={handleTaskCreation}>
                        <div className="flex flex-col items-center">
                            <label htmlFor="name">Task name</label>
                            <input placeholder="Task name" name="name" value={taskName} onChange={(e) => setTaskName(e.target.value)}
                            className="p-2 bg-slate-200 text-slate-800 my-2 rounded-lg"></input>
                            <label htmlFor="description">Task description</label>
                            <input placeholder="Task description" name="description" value={taskDesc} onChange={(e) => setTaskDesc(e.target.value)}
                            className="p-2 bg-slate-200 text-slate-800 my-2 rounded-lg"></input>
                            <label htmlFor="priority">Task priority</label>
                            <select name="priority" className="p-2 bg-slate-200 text-slate-800 my-2 rounded-lg w-full">
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                            <button type="submit" className="bg-green-300 text-slate-800 rounded-lg w-full p-2 my-2">Create task</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}