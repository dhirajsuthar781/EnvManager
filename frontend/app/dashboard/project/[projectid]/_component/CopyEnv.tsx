"use client"
import { useCopyToClipboard } from '@/lib/hook/useCopyToClipboard'
import { Check, Copy } from 'lucide-react'
import { MouseEvent } from 'react'
import { toast } from 'sonner'
type Props = {
     size?: number
     strokeWidth?: number,
     content: string
}

export default function CopyEnv({ size, strokeWidth, content }: Props) {
     const { isCopied, copy } = useCopyToClipboard()
     async function copyHandler(e: MouseEvent) {
          
          e.stopPropagation();
          e.preventDefault();
          const success = await copy(content)
          if (success) {
               toast.success('Env variables copied to clipboard')
          } else {
               toast.error('Failed to copy')
          }

     }

     return (
          <button
               onClick={copyHandler}
               className="hover:text-blue-500 transition-colors"
               title="Copy to clipboard"
          >
               {isCopied ? (
                    <Check size={20} className="text-green-500" />
               ) : (
                    <Copy size={20} />
               )}
          </button>
     )
}