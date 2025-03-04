"use client";

import { useState, useEffect } from "react";
import { useProject } from "./project-provider";

export default function TaskStats(){
    const [projectId, setProjectId] = useState<number>(-1);
    const projectContext = useProject();

    useEffect(() => {
        if(!projectContext?.project?.id) return;
        setProjectId(projectContext.project.id);
    }, [projectContext])
    return (
        <>
            <div className="p-2">
            
            </div>
        </>
    );
}