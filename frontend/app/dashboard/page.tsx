
import { Suspense } from 'react'
import PageWrapper from './_components/PageWrapper'
import FetchProjects from './_components/FetchProjects'
import ProjectCardLoading from './_components/ProjectCardLoading'
import CreateProjectButton from './_components/_controller/CreateProjectButton'


type Props = {}

export default async function page({ }: Props) {


  return (
    <PageWrapper   >

      <header className=" flex-row flex justify-between">
        <span className=" text-xl text-black/80 font-medium">All Projects</span>
        <div className="  flex items-center gap-3">
          <CreateProjectButton />
        </div>
      </header>
      <Suspense fallback={<ProjectCardLoading />}>
        <FetchProjects />
      </Suspense>

    </PageWrapper>
  )
}

