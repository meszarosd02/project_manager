"use client";

import { TaskState } from "@prisma/client";
import { Task } from "../lib/types";

function parseState(state: TaskState){
    if (state == "NOT_STARTED") return "Not Started";
    else if (state == "IN_PROGRESS") return "In Progress";
    if (state == "DONE") return "Done";
}

export default function Tasks({tasks} : {tasks: Task[]}){

    return (
        <>
            {tasks.map((task) => (
                <div key={task.id} className="flex flex-row border border-gray-400 w-2/5">
                    <div className="border border-gray-700 w-1/2">
                        <p className="text-lg">Task: {task.name}</p>
                        <p className="text-sm">Desc: {task.description}</p>
                    </div>
                    <div className="flex justify-start items-end border border-gray-700 w-1/2 flex-col">
                        <p className="text-lg">Priority: {task.priority}</p>
                        <p className="text-sm">State: {parseState(task.task_state)}</p>
                    </div>
                </div>
            ))}    
        </>
    );
}