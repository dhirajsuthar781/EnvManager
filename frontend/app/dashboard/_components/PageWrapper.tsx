import React from 'react'

type Props = {
     heading?: string
     children: React.ReactNode
     clx?: string
}

export default function PageWrapper({
     children, heading, clx
}: Props) {
     return (
          <div className='  overflow-auto  w-full h-full'>
               <h1 className={` text-gray-500 uppercase tracking-wide p-2 px-4 text-md font-medium`}>
                    {heading}
               </h1>
               <div className='  px-4   mb-16'>
               {children}
               </div>
          </div>
     )
}