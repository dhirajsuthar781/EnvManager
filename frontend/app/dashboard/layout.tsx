import { getCurrentUser } from '@/lib/auth/getCurrentUser'
import HydrateUserData from './_components/HydrateUserData'
import Navbar from './_components/Navbar'
import Sidebar from './_components/Sidebar'
import GlobalDeleteDialog from './_components/dialogs/GlobalDeleteDialog'

type Props = {
     children: React.ReactNode
}

export default async function layout({ children }: Props) {
     const u = await getCurrentUser();

     return (
          <section className=' w-screen h-screen  overflow-hidden flex flex-col'>
               <HydrateUserData userId={u ? u.userId : ""} />
               <Navbar />
               <div className=' w-full h-full  flex flex-row '>
                    <Sidebar />
                    <div className='  w-[calc(100%-216px)] h-full'>
                         {children}
                    </div>
               </div>
               <GlobalDeleteDialog />
          </section>
     )
}