"use client";

import { useEffect, useState } from "react";
import { createProject, getProjects, isThereProject } from "../actions/project";
import { createTask } from "../actions/task";
import { useRouter } from "next/navigation";
import { setAuthCookie } from "../actions/user";
import { Project } from "../lib/types";

export default function ProjectDisplay(){
    const [projects, setProjects] = useState<Project[]>([]);

    const router = useRouter();

    useEffect(() => {
        /*const handleProjectCreation = async (projectName: string) => {
            const newProject = await createProject(projectName);
        }*/

        const handleTaskCreation = async () => {
            
        }

        const checkIfProjectExists = async () => {
            const project = await isThereProject();
            if(!project){
                router.push("/new");
            }
        }

        const fetchProjects = async () => {
            const fetched_projects = await getProjects(true);
            setProjects(fetched_projects);
        }
        //handleProjectCreation("teszt123");
        //handleTaskCreation();
        fetchProjects();
        checkIfProjectExists();
    }, [])

    const handleLogin = async () => {
        setAuthCookie(1);
    }

    const ProjectList = () => {
        return (
            <>
            {projects.map((project) => (
                <p>{project.name}</p>
            ))}
            </>
        );
    }

    return (
        <div className="">
            <p className="text-9xl">HOME</p>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}