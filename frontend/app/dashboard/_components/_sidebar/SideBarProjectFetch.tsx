import { getProjects } from "@/lib/api/project_env"
import ProjectButton from "./ProjectButton"
import { Project_card_item } from "@/lib/types/types"
 
type Props = {}

export default async function SideBarProjectFetch({ }: Props) {
     const { formattedProjects } = await getProjects()
     return (
          <>
               {
                    formattedProjects?.map((item: Project_card_item, index: number) => (
                         <ProjectButton key={index} name={item.name} href={`/dashboard/project/${item._id}`} />
                    ))
               }
          </>
     )
}