import { Suspense } from "react";
import PageWrapper from "../../_components/PageWrapper";
import LoadingEnvFiles from "./_component/LoadingEnvFiles";
import FetchEnvFiles from "./_component/FetchEnvFiles";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
     params: Promise<{ projectid: string }>
}

export default async function page({ params }: Props) {
     const { projectid } = await params;

     return (
          <PageWrapper >
               <header className=" flex-row flex justify-between">
                    <span className=" text-xl text-black/80 font-medium">Project - {projectid}</span>
                    <div className="  flex items-center gap-3">
                         <Link href={`/dashboard/project/${projectid}/create-env`}>
                              <Button variant={'default'}>Create Env File</Button>
                         </Link>
                    </div>
               </header>

               <Suspense fallback={<LoadingEnvFiles />}>
                    <FetchEnvFiles projectid={projectid} />
               </Suspense>
          </PageWrapper>
     )
}

