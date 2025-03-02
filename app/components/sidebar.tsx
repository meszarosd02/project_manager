"use client";

import Image from "next/image";

import { useAuth } from "./auth-provider";

export default function Sidebar(){

    const authContext = useAuth();

    return (
        <>
            <div className="flex flex-col justify-normal h-screen bg-slate-400 p-1 inset-shadow-2xl">
                <div className="flex flex-row justify-start">
                    <Image src={"/icons/account_circle.svg"} alt="Account" height={24} width={24} className="mr-4"></Image>
                    <p>{authContext?.user && `${authContext?.user?.firstName} ${authContext?.user?.lastName}`}</p>
                </div>
                <div className="flex flex-row justify-start">
                    <p>Tasks</p>
                </div>
                <div className="flex flex-row justfiy-start">
                    <Image src={"/icons/logout.svg"} alt="Logout" height={24} width={24} className="mr-4"></Image>
                    <p>Logout</p>
                </div>
            </div>
        </>
    );
}