"use server";

import { TaskState } from "@prisma/client";
import { prisma } from "../lib/prisma";

export async function createTask(){
    return await prisma.task.create({
        data: {
            name: "teszt",
            description: "teszt_desc",
            projectId: 1,
        }
    })
}