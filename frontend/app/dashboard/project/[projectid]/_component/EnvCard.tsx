 
import DownloadEnv from './DownloadEnv'
import CopyEnv from './CopyEnv'

type Props = {}

export default function EnvCard({ }: Props) {
     return (
          <div className="rounded-lg   group overflow-hidden    border">
               <header className=" bg-gray-100 p-2  px-3 flex flex-row justify-between">
                    <span className="  font-medium text-black/80">Frontend Env</span>
                    <div className=" flex flex-row justify-center gap-3">
                         <DownloadEnv />
                         <CopyEnv />
                    </div>
               </header>
               <div className="p-2  px-3 ">
                    <p>
                         Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum dicta incidunt tempore doloribus voluptatem fugiat dolore quisquam molestias officia beatae!
                    </p>
               </div>
          </div>
     )
}