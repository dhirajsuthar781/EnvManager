"use client"
import { ArrowDownToLine } from 'lucide-react'
import { toast } from 'sonner'
import React, { MouseEvent } from 'react'

type Props = {
     size?: number
     strokeWidth?: number
     content: string  
     filename?: string  
}

export default function DownloadEnv({ size, strokeWidth, content, filename }: Props) {

     async function downloadHandler(e: MouseEvent) {
          e.stopPropagation();
          e.preventDefault();

          if (!content) {
               toast.error("No content to download");
               return;
          }

          try {
              
               const blob = new Blob([content], { type: 'text/plain' });

              
               const url = window.URL.createObjectURL(blob);

               
               const link = document.createElement('a');
               link.href = url;
 
               link.download = filename ? `${filename}.env` : '.env';

              
               document.body.appendChild(link);
               link.click();
               document.body.removeChild(link);

            
               window.URL.revokeObjectURL(url);

               toast.success('File Downloaded!');
          } catch (error) {
               console.error("Download failed:", error);
               toast.error("Failed to download file");
          }
     }

     return (
          <button
               onClick={downloadHandler}
               className='hover:text-blue-500 cursor-pointer relative z-10'
          >    
               <ArrowDownToLine size={size || 20} strokeWidth={strokeWidth || 1.8} />
          </button>
     )
}