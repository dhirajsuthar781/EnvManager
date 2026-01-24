"use client"
import DownloadEnv from '../../_component/DownloadEnv'
import { useEnvStore } from '@/lib/zustand/envStore'
import CopyEnv from '../../_component/CopyEnv';
import { useEffect } from 'react';

type Props = { filename: string, content: string }

export default function ButtonHandler({ filename, content }: Props) {

     const onContentChange = useEnvStore((state) => state.onContentChange)
     const Currentcontent = useEnvStore((state) => state.currentContent);

     useEffect(() => {
          onContentChange(content)
     }, [])
     return (
          <>
               <DownloadEnv content={Currentcontent} filename={filename} size={24} />
               <CopyEnv content={Currentcontent} size={23} />
          </>
     )
}