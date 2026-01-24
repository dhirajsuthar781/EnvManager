import {   getProjectsRecent } from "@/lib/api/project_env"
import ProjectButton from "./ProjectButton"
import { Project_card_item } from "@/lib/types/types"
 
type Props = {}
export const revalidate = 30
export default async function SideBarProjectFetch({ }: Props) {
     const { projects } = await getProjectsRecent()
     return (
          <>
               {
                    projects?.map((item: Project_card_item, index: number) => (
                         <ProjectButton key={index} name={item.name} href={`/dashboard/project/${item._id}`} />
                    ))
               }
          </>
     )
}