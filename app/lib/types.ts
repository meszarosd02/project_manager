type Project = {
    id: number,
    name: string,
    tasks: Task[] | undefined
}

type Task = {
    id: number,
    name: string,
    description: string,
    task_state: TASK_STATE,
    parentTaskId: number | undefined,
    projectId: number,
    createdAt: Date,
    updatedAt: Date
}

enum TASK_STATE {
    NOT_COMPLETED,
    IN_PROGRESS,
    DONE
}