import { getProjects } from '@/lib/api/project_env'
import ProjectCard from './ProjectCard'
import { Project_card_item } from '@/lib/types/types'
 
type Props = {}

export default async function FetchProjects({ }: Props) {
       const { formattedProjects } = await getProjects()
     return (
          <>
               <div className="  font-medium top-2 right-5 text-sm">
                    {formattedProjects.length}  <span className=" opacity-40  font-normal">Projects</span>
               </div>
               <div className='mt-5 grid grid-cols-2 gap-5'>
                    {
                         formattedProjects.map((item: Project_card_item, index: number) =>
                              <ProjectCard key={index} data={item} />
                         )
                    }
               </div>
          </>
     )
}