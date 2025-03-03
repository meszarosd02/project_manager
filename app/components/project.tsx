"use client";

import { useEffect, useState } from "react";
import { createProject, getProjects, isThereProject } from "../actions/project";
import { createTask } from "../actions/task";
import { useRouter } from "next/navigation";
import { setAuthCookie } from "../actions/user";
import { Project } from "../lib/types";
import { useAuth } from "./auth-provider";

export default function ProjectDisplay(){
    const [projects, setProjects] = useState<Project[]>([]);

    const router = useRouter();

    const authContext = useAuth();

    useEffect(() => {
        const handleTaskCreation = async () => {
            
        }

        /*const fetchProjects = async () => {
            const fetched_projects = await getProjects(true);
            setProjects(fetched_projects);
        }
        fetchProjects();*/
    }, [])

    useEffect(() => {
        const checkIfProjectExists = async () => {
            if(!authContext?.user?.id) return;
            const project = await isThereProject(authContext?.user?.id);
            if(!project){
                router.push("/new");
            }
        }
        checkIfProjectExists();
    }, [authContext?.user?.id])

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