"use client"
import PageWrapper from "@/app/dashboard/_components/PageWrapper"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import EnvCreationDataHandler from "./_component/EnvCreationDataHandler"
import { useRouter } from "next/navigation"

import { use } from 'react';
import { toast } from "sonner"
import { createEnvFileApi } from "@/lib/api/project_env"
import { refreshApi } from "@/lib/api/fetcher"
type Props = { params: Promise<{ projectid: string }> }
export type EnvData = {
  name: string,
  content: string
}
export default function page({ params }: Props) {
  const { projectid } = use(params);
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useRouter()
  const [envData, setEnvData] = useState<EnvData>({
    name: '',
    content: ""
  })

  async function onSaveHandler() {
    if (loading) return;
    // validation checking
    if (!envData.name || !envData.content) {
      toast.error('All fields are required');
      return;
    }
 
    if (!projectid) toast.error('Project id not found');
    setLoading(true);
    

    // main work

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

    try {
      let res = await createEnvFileApi({ projectId: projectid, title: envData.name, content: envData.content });
      if (!res?.success) {
        throw new Error(res?.message || ' Something went wrong');
      } else {
        refreshApi('env-' + projectid);
      }

      toast.success(res.message ?? ' Env file created successfully');
      navigation.back()

    } catch (err: any) {
      if (err.name === 'AbortError') {
        toast.error('Request timed out. Please try again.');

      } else if (!navigator.onLine) {
        toast.error('No internet connection');

      } else {
        toast.error(err.message || 'Something went wrong');

      }
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }


  }

  return (
    <PageWrapper >
      <header className=" flex-row flex justify-between">
        <span className=" text-xl text-black/80 font-medium">Create Env File</span>
        <div className="  flex items-center gap-3">
          <Button variant={'ghost'} onClick={() => {
            setEnvData({ name: '', content: '' });
            navigation.back()
          }}>Cancle</Button>
          <Button isLoading={loading} disabled={loading} onClick={onSaveHandler} variant={'default'}>Save</Button>

        </div>
      </header>

      <EnvCreationDataHandler envData={envData} setEnvData={setEnvData} />
    </PageWrapper >
  )
}