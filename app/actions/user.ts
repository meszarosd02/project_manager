"use server";

import {prisma} from "../lib/prisma";

export async function getUser(userId: number){
    return await prisma.user.findFirst({
        where: {
            id: userId
        }
    }) as unknown as User;
}

export async function createUser(){
    return await prisma.user.create({
        data: {
            username: "agyilagzokni",
            firstName: "Dominik",
            lastName: "Mészáros",
            projects: {create: {
                name: "teszt123"
            }}
        }
    })
}