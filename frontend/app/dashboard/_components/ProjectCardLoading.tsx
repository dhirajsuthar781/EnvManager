import { Skeleton } from "@/components/ui/skeleton"

 
type Props = {}

export default function ProjectCardLoading({ }: Props) {
     return (
          <>
               <div className="  font-medium top-2 right-5 text-sm">
                    0  <span className=" opacity-40  font-normal">Projects</span>
               </div>
               <div className='mt-5 grid grid-cols-2 gap-5'>
                    {
                         Array.from({ length: 4 }).map((_, i) => (
                             <Skeleton key={i} className="w-full h-24" />
                         ))
                    }
               </div>
          </>
     )
}