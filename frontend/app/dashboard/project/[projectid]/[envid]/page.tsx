import PageWrapper from "@/app/dashboard/_components/PageWrapper";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ContentHandler from "./__components/ContentHandler";
import EditButtonHandler from "./__components/EditButtonHandler";
import DeleteHandler from "./__components/DeleteHandler";
import { getEnvById } from "@/lib/api/project_env";
import DownloadEnv from "../_component/DownloadEnv";
import ButtonHandler from "./__components/ButtonHandler";

type Props = {
     params: Promise<{ envid: string, projectid: string }>
}

/*------------------------------------
Pending is 
saving animation or loading 
onSave button
--------------------------------------*/

export default async function page({ params }: Props) {
     const { envid, projectid } = await params;
     const { success, message, envFile } = await getEnvById({ envId: envid, projectId: projectid });

     return (
          <PageWrapper >
               <header className=" flex-row flex justify-between">
                    <span className=" text-xl text-black/80 font-medium">{envFile.title}</span>
                    <div className="  flex items-center gap-4">

                         {/* All button should be a client , seprate component */}
                         <ButtonHandler filename={envFile.title} content={envFile.content} />
                         <Separator orientation="vertical" />
                         <EditButtonHandler envid={envid} />
                         <DeleteHandler projectId={projectid} envid={envid} type="BUTTON" />

                    </div>
               </header>

               <ContentHandler envid={envid} content={envFile.content} projectId={projectid} />
          </PageWrapper>
     )
}