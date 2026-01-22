import { Suspense } from 'react'
import ProjectButton from './_sidebar/ProjectButton';
import SideBarProjectFetch from './_sidebar/SideBarProjectFetch';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {}

export default function Sidebar({ }: Props) {
  return (
    <div className=' bg-gray-50 px-3 pt-5  flex flex-col space-y-1 border-r  h-full w-54'>
      <p className=' text-[12px] font-medium tracking-wide mb-3 text-black/50'>PROJECTS</p>
      <ProjectButton name={"View All"} href={"/dashboard"} clx='' />

      <p className=' text-[12px] font-medium tracking-wide mb-3 mt-6 text-black/50'>RECENTS</p>
      <Suspense fallback={<>
        <Skeleton className="w-full  h-4 bg-gray-200" />
        <Skeleton className="w-full  h-4 bg-gray-200" />
        <Skeleton className="w-full  h-4 bg-gray-200" />
      </>}>
        <SideBarProjectFetch />
      </Suspense>
    </div>
  )
}


