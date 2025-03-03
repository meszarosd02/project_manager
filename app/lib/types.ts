import { Priority, TaskState } from "@prisma/client";

export type User = {
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    projects: Project[] | undefined,
    createdAt: Date
}

export type Project = {
    id: number,
    name: string,
    tasks: Task[] | undefined,
    userId: number
}

export type Task = {
    id: number,
    name: string,
    description: string,
    task_state: TaskState,
    priority: Priority,
    parentTaskId: number | undefined,
    parentTask: Task | undefined,
    projectId: number,
    project: Project,
    createdAt: Date,
    updatedAt: Date
}