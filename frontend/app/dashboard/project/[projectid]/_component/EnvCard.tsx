import {
     ContextMenu,
     ContextMenuContent,
     ContextMenuItem,
     ContextMenuTrigger,
} from "@/components/ui/context-menu"
import DownloadEnv from './DownloadEnv'
import CopyEnv from './CopyEnv'
import { EnvFileType } from '@/lib/types/types'
import Link from 'next/link'
import { PencilIcon, ShareIcon, TrashIcon } from "lucide-react"
import DeleteHandler from "../[envid]/__components/DeleteHandler"
import EditAndShareMenuButton from "./EditAndShareMenuButton"


type Props = {
     data: EnvFileType
     projectid: string
}

export default function EnvCard({ data, projectid }: Props) {
     return (
          <ContextMenu  >
               <ContextMenuTrigger>

                    <div className="rounded-lg   group overflow-hidden hover:border-black/40    border">

                         <Link
                              href={"/dashboard/project/" + projectid + "/" + data._id}
                              className=" bg-gray-100  p-2 cursor-pointer    px-3 flex flex-row justify-between "
                         >
                              <span className={"  font-medium text-black/80"}>{data.title || "Untitled"}</span>
                              <div className=" flex flex-row justify-center gap-3">
                                   <DownloadEnv content={data.content} filename={data.title} />
                                   <CopyEnv content={data.content} />
                              </div>
                         </Link>
                         <div className="p-2  px-3 ">
                              <pre className='whitespace-pre-wrap text-black/75'>
                                   {data.content || <span className=' italic'>No content</span>}
                              </pre>
                         </div>
                    </div>
               </ContextMenuTrigger>
               <ContextMenuContent>
                    <DeleteHandler envid={data._id} projectId={projectid} type="CONTEXT_ITEM" />
                    <ContextMenuItem>
                    </ContextMenuItem>
                    <EditAndShareMenuButton type="EDIT" envId={data._id} projectId={projectid} />
                    <EditAndShareMenuButton type="SHARE" envId={data._id} projectId={projectid} />
               </ContextMenuContent>
          </ContextMenu>
     )
}