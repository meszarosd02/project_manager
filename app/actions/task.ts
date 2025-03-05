"use server";

import { Priority, TaskState } from "@prisma/client";
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

export async function getRootTasks(projectId: number){
    return await prisma.task.findMany({
        where: {
            projectId: projectId,
            parentTaskId: null
        }
    }) as unknown as Task[]
}

export async function getProjectTaskCount(projectId: number){
    return await prisma.task.count({
        where: {
            projectId: projectId
        }
    })
}

export async function getProjectTaskCountByState(projectId: number, taskState: TaskState){
    return await prisma.task.count({
        where: {
            projectId: projectId,
            task_state: taskState
        }
    })
}