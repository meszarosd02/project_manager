"use client";

import { useEffect, useState } from "react";
import { createProject, getProjects } from "../actions/project";
import { createTask } from "../actions/task";

export default function ProjectDisplay(){
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const handleProjectCreation = async (projectName: string) => {
            const newProject = await createProject(projectName);
        }

        const handleTaskCreation = async () => {
            const newTask = await createTask();
        }

        const fetchProjects = async () => {
            const fetched_projects = await getProjects(true);
            console.log(fetched_projects[0].tasks);
            setProjects(fetched_projects);
        }
        //handleProjectCreation("teszt123");
        //handleTaskCreation();
        fetchProjects();
    }, [])

    return (
        <div className="">
            {projects.map((project) => (
                <span>{project.name}</span>
            ))}
        </div>
    );
}