"use server";

import NewTask from "@/app/components/new-task";

export default async function Home(){
    return (
        <>
            <NewTask></NewTask>
        </>
    );
}