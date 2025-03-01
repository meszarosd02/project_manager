"use server";

import { prisma } from "../lib/prisma";

export async function getProjects(withTasks: boolean = false){
    return await prisma.project.findMany({
        include: {
            tasks: withTasks
        }
    }) as unknown as Project[]
}

export async function createProject(projectName: string){
    return await prisma.project.create({
        data: {
            name: projectName,
        }
    }) as Project
}