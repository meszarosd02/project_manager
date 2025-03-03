"use server";

import { Priority } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { Task } from "../lib/types";

export async function createTask(name: string, description: string, projectId: number, priority: Priority){
    return await prisma.task.create({
        data: {
            name: name,
            description: description,
            projectId: projectId,
            priority: priority
        }
    }) as unknown as Task
}