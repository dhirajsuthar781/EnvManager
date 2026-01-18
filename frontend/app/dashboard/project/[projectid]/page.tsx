import { ArrowDownToLine, Copy } from "lucide-react";
import PageWrapper from "../../_components/PageWrapper";
import DownloadEnv from "./_component/DownloadEnv";
import CopyEnv from "./_component/CopyEnv";
import EnvCard from "./_component/EnvCard";

type Props = {
     params: Promise<{ projectid: string }>
}

export default async function page({ params }: Props) {
     const { projectid } = await params;

     return (
          <PageWrapper heading={"Project - " + projectid} >
               <div className="  font-medium top-2 right-5 text-sm">
                    3  <span className=" opacity-40  font-normal">Env Files</span>
               </div>
               <div className=" mt-5 grid grid-cols-2 gap-5">
                    {
                         [1, 2, 3 ].map((item, index) => (
                              <EnvCard key={index} />
                         ))
                    }
               </div>
          </PageWrapper>
     )
}