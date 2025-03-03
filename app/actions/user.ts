"use server";

import { cookies } from "next/headers";
import { prisma } from "../lib/prisma";
import { User } from "../lib/types";

export async function getUser(userId: number){
    return await prisma.user.findFirst({
        include: {
            projects: {
                include: {
                    tasks: true
                }
            }
        },
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

export async function setAuthCookie(userId: number){
    (await cookies()).set("userId", `${userId}`, {
        maxAge: 60 * 60 * 24
    });
}

export async function getAuthCookie(){
    const userId = (await cookies()).get("userId");
    if (!userId) return undefined;
    return Number(userId.value);
}