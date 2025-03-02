"use server";

import { cookies } from "next/headers";
import ProjectDisplay from "./components/project";

export default async function Home() {
  return (
    <>
      <div>
        <ProjectDisplay></ProjectDisplay>
      </div>
    </>
  );
}
