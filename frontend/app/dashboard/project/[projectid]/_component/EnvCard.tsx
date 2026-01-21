
import DownloadEnv from './DownloadEnv'
import CopyEnv from './CopyEnv'
import { EnvFileType } from '@/lib/types/types'
import Link from 'next/link'

type Props = {
     data: EnvFileType
     projectid: string
}

export default function EnvCard({ data, projectid }: Props) {
     return (
          <div className="rounded-lg   group overflow-hidden hover:border-black/40    border">
               <Link
                    href={"/dashboard/project/" + projectid + "/" + data._id}
                    className=" bg-gray-100  p-2 cursor-pointer    px-3 flex flex-row justify-between "
               >
                    <span className={"  font-medium text-black/80"}>{data.title || "Untitled"}</span>
                    <div className=" flex flex-row justify-center gap-3">
                         <DownloadEnv content={data.content} filename={data.title} />
                         <CopyEnv />
                    </div>
               </Link>
               <div className="p-2  px-3 ">
                    <p>
                         {data.content || <span className=' italic'>No content</span>}
                    </p>
               </div>
          </div>
     )
}