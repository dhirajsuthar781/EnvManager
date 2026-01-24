"use client"
import { ContextMenuItem } from '@/components/ui/context-menu'
import { PencilIcon, ShareIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
type Props = {
     type: "EDIT" | "SHARE",
     envId: string,
     projectId: string
}

export default function EditAndShareMenuButton({ type, envId , projectId }: Props) {

     const router = useRouter()
     
     return (
          type == "EDIT" ?
               <ContextMenuItem
                    onSelect={() => {
                         router.push(`/dashboard/project/${projectId}/${envId}`)
                    }}   >
                    <PencilIcon />
                    Edit
               </ContextMenuItem>
               :
               <ContextMenuItem>
                    <ShareIcon />
                    Share
               </ContextMenuItem>
     )
}