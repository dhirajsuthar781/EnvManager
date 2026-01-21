import { Suspense } from "react";
import PageWrapper from "../../_components/PageWrapper";
import EnvCard from "./_component/EnvCard";
import { EnvFileType } from "@/lib/types/types";
import LoadingEnvFiles from "./_component/LoadingEnvFiles";
import FetchEnvFiles from "./_component/FetchEnvFiles";

type Props = {
     params: Promise<{ projectid: string }>
}

export default async function page({ params }: Props) {
     const { projectid } = await params;


     return (
          <PageWrapper heading={"Project - " + projectid} >
               <Suspense fallback={<LoadingEnvFiles />}>
                    <FetchEnvFiles projectid={projectid} />
               </Suspense>
          </PageWrapper>
     )
}

