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

export async function getTask(taskId: number): Promise<Task>{
    const task = await prisma.task.findUniqueOrThrow({
        where: {
            id: taskId
        },
        include: {
            subTasks: true
        }
    }) as unknown as Task;

    task.subTasks = await Promise.all(
        (task.subTasks ?? []).map((subTask) => getTask(subTask.id))
    );
    return task;
}

export async function createSubTask(parentTaskId: number, name: string, description: string, priority: Priority){
    const parentTask = await getTask(parentTaskId);
    return await prisma.task.create({
        data: {
            name: name,
            description: description,
            projectId: parentTask.projectId,
            priority: priority,
            parentTaskId: parentTaskId
        }
    })
}