"use client";

import { useEffect } from "react";
import { useAuth } from "./auth-provider";
import Dashboard from "./dashboard";
import Sidebar from "./sidebar";

export default function Home() {

    const authContext = useAuth();

    useEffect(() => {
        const userLogin = async () => {
            //await authContext?.login(1);
        }
        userLogin();
    }, [])

  return (
    <>
            <div className="grid grid-cols-8">
                <div className="col-span-1">
                    <Sidebar></Sidebar>
                </div>
                <div className="col-span-7">
                    <Dashboard></Dashboard>
                </div>
            </div>
    </>
  );
}