
import { Suspense } from 'react'
import PageWrapper from './_components/PageWrapper'
import FetchProjects from './_components/FetchProjects'
import ProjectCardLoading from './_components/ProjectCardLoading'


type Props = {}

export default async function page({ }: Props) {


  return (
    <PageWrapper heading={"All projects"} >
      <Suspense fallback={<ProjectCardLoading/>}>
        <FetchProjects />
      </Suspense>

    </PageWrapper>
  )
}

