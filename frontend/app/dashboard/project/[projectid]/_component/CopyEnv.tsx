import { Copy } from 'lucide-react'
 
type Props = {
     size?: number
     strokeWidth?: number
}
export default function CopyEnv({ size, strokeWidth }: Props) {
     return (
          <button className=' hover:text-blue-500 cursor-pointer'>
               <Copy size={size || 21} strokeWidth={strokeWidth || 1.8} />
          </button>
     )
}