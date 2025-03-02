"use server";

import { prisma } from "../lib/prisma";

export async function getProjects(withTasks: boolean = false){
    return await prisma.project.findMany({
        include: {
            tasks: withTasks
        }
    }) as unknown as Project[]
}

export async function createProject(projectName: string, userId: number){
    return await prisma.project.create({
        data: {
            name: projectName,
            userId: userId
        }
    }) as Project
}

export async function isThereProject(){
    return (await prisma.project.findMany()).length > 0
}