"use server";

import { TaskState } from "@prisma/client";
import { prisma } from "../lib/prisma";

export async function createTask(name: string, description: string, projectId: number){
    return await prisma.task.create({
        data: {
            name: name,
            description: description,
            projectId: projectId,
        }
    }) as unknown as Task
}