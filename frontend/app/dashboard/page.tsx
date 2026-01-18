
import { Project_card_item } from '@/lib/types/types'
import PageWrapper from './_components/PageWrapper'

import ProjectCard from './_components/ProjectCard'

type Props = {}

export default function page({ }: Props) {
  return (
    <PageWrapper heading={"All projects"} >

      <div className="  font-medium top-2 right-5 text-sm">
        3  <span className=" opacity-40  font-normal">Projects</span>
      </div>
      <div className='mt-5 grid grid-cols-2 gap-5'>
        {
          p_data.map((item: Project_card_item, index) =>
            <ProjectCard key={index} data={item} />
          )
        }
      </div>
    </PageWrapper>
  )
}

const p_data: Project_card_item[] = [
  {
    _id: "abc951125",
    name: "Project One",
    no_envs: 3
  },
  {
    _id: "abc12885",
    name: "Project Two",
    no_envs: 3
  },
  {
    _id: "abc17854225",
    name: "Project Three",
    no_envs: 3
  },

]