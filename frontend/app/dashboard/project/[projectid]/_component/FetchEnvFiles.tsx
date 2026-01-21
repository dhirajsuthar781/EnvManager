
import { getEnv } from '@/lib/api/project_env'
import EnvCard from './EnvCard'
import { EnvFileType } from '@/lib/types/types'

type Props = {
     projectid: string
}

export default async function FetchEnvFiles({ projectid }: Props) {

     const { envFiles } = await getEnv({ id: projectid })

     return (
          <>
               <div className="  font-medium top-2 right-5 text-sm">
                    {envFiles?.length}  <span className=" opacity-40  font-normal">Env Files</span>
               </div>
               <div className=" mt-5 grid grid-cols-2 gap-5">
                    {
                         envFiles?.map((item: EnvFileType, index: number) => (
                              <EnvCard key={index} data={item} projectid={projectid} />
                         ))
                    }
               </div>
          </>
     )
}
