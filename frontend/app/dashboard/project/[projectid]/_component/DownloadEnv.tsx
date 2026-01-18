import { ArrowDownToLine } from 'lucide-react'
 

type Props = {
     size?: number
     strokeWidth?: number
}

export default function DownloadEnv({ size, strokeWidth }: Props) {
     return (
          <button className=' hover:text-blue-500 cursor-pointer'>
               <ArrowDownToLine size={size || 22} strokeWidth={strokeWidth || 1.8} />
          </button>
     )
}