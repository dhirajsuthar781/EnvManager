import React from 'react'
import Navbar from './_components/Navbar'
import Sidebar from './_components/Sidebar'

type Props = {
     children: React.ReactNode
}

export default function layout({ children }: Props) {
     return (
          <section className=' w-screen h-screen  overflow-hidden flex flex-col'>
               <Navbar />
               <div className=' w-full h-full  flex flex-row '>
                    <Sidebar />
                    <div className='  w-[calc(100%-216px)] h-full'>
                    {children}
                    </div>
               </div>
          </section>
     )
}