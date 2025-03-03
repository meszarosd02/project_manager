"use client";

import { useEffect, useState } from "react";
import { defaultProject } from "../lib/defaults";
import { Project } from "../lib/types";
import { getProjects } from "../actions/project";
import { useProject } from "./project-provider";



export default function ProjectProgress(){
    const [project, setProject] = useState<Project>(defaultProject);

    const projectContext = useProject();

    useEffect(() => {
        const fetchProject = async () => {
            const fetched_project = await getProjects()
        };

        fetchProject();
    }, []);

    return (
        <>

        </>
    );
}