"use server";

import { TaskState } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { Project } from '../lib/types';

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
    }) as unknown as Project
}

export async function isThereProject(userId: number){
    return (await prisma.project.count({
        where: {
            userId: userId
        }
    })) > 0
}

export async function getMostRecentProjectOfUser(userId: number){
    return await prisma.project.findFirst({
        where: {
            userId: userId
        },
        orderBy: {
            updatedAt: 'desc'
        }
    }) as unknown as Project
}

export async function getProjectById(projectId: number){
    return await prisma.project.findUnique({
        where: {
            id: projectId
        },
        include: {
            tasks: true
        }
    }) as unknown as Project
}