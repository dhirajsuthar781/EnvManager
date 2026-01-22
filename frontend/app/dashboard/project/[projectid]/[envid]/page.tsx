import PageWrapper from "@/app/dashboard/_components/PageWrapper";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import ContentHandler from "./__components/ContentHandler";
import EditButtonHandler from "./__components/EditButtonHandler";
import DeleteHandler from "./__components/DeleteHandler";

type Props = {
     params: Promise<{ envid: string }>
}

/*------------------------------------
Feature-
1. env file name, 
2. downalod and copy button
3. text area + div to show content of env file
4. a edit button to convert div to text area 
5. convert edit button to save button or a timeout of saving feature
6. delete env file button
7. rename env file

buttons -> download, copy, edit , envfileName edit , delete



--------------------------------------*/
export default async function page({ params }: Props) {
     const { envid } = await params;
     let content: string = "Lorem ipsum dolor, sit amet  "
     return (
          <PageWrapper >
               <header className=" flex-row flex justify-between">
                    <span className=" text-xl text-black/80 font-medium">Frontend Env</span>
                    <div className="  flex items-center gap-3">

                         {/* All button should be a client , seprate component */}
                         <Button variant={'outline'}>Download</Button>
                         <Button variant={'outline'}>Copy</Button>
                         <Separator orientation="vertical" />
                         <EditButtonHandler envid={envid}/>
                         <DeleteHandler envid={envid}/>

                    </div>
               </header>

               <ContentHandler envid={envid} content={content} />
          </PageWrapper>
     )
}