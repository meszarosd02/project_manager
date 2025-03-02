"use server";

import { AuthProvider } from "../components/auth-provider";
import Dashboard from "../components/dashboard";
import Sidebar from "../components/sidebar"

export default async function Home() {

  return (
    <>
        <AuthProvider>
            <div className="grid grid-cols-8">
                <div className="col-span-1">
                    <Sidebar></Sidebar>
                </div>
                <div className="col-span-7">
                    <Dashboard></Dashboard>
                </div>
            </div>
        </AuthProvider>
    </>
  );
}
