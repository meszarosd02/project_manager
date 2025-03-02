type User = {
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    projects: Project[] | undefined,
    createdAt: Date
}

type Project = {
    id: number,
    name: string,
    tasks: Task[] | undefined,
    userId: number
}

type Task = {
    id: number,
    name: string,
    description: string,
    task_state: TASK_STATE,
    parentTaskId: number | undefined,
    parentTask: Task | undefined,
    projectId: number,
    project: Project,
    createdAt: Date,
    updatedAt: Date
}

enum TASK_STATE {
    NOT_COMPLETED,
    IN_PROGRESS,
    DONE
}