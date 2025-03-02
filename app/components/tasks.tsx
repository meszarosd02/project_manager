"use client";

export default function Tasks({tasks} : {tasks: Task[]}){

    return (
        <>
            {tasks.map((task) => (
                <div key={task.id} className="border border-gray-400">
                    <p>ID: {task.id}</p>
                    <p>Name: {task.name}</p>
                    <p>Desc: {task.description}</p>
                    <p>State: {task.task_state}</p>
                    <p>Project: {task.projectId}</p>
                    <p>Created: {task.createdAt.toISOString()}</p>
                </div>
            ))}    
        </>
    );
}