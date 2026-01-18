import Link from "next/link"
import { PanelsTopLeft } from 'lucide-react'
import { Project_card_item } from "@/lib/types/types"

type Props = {
     data: Project_card_item
}

export default function ProjectCard({ data }: Props) {
     return (
          <Link className=" border flex relative flex-col rounded-lg  p-3  group hover:border-black/40 bg-gray-50/40" href={'/dashboard/project/' + data._id}>
               <div className=" bg-white w-fit border rounded-md p-2 aspect-square">
                    <PanelsTopLeft strokeWidth={1.5} size={20} />
               </div>
               <div className=" absolute font-medium top-2 right-5 text-sm">
                    {data.no_envs}  <span className=" opacity-40  font-normal">Env Files</span>
               </div>
               <div className=" pt-2">
                    <h5 className=" group-hover:underline underline-offset-2  text-black/80 text-lg">{data.name}</h5>
               </div>
          </Link>
     )
}