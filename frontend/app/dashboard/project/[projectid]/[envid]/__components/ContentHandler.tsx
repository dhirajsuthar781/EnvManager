"use client"
import { Textarea } from '@/components/ui/textarea'
import { patchEnvById } from '@/lib/api/project_env';
import { useEnvStore } from '@/lib/zustand/envStore';
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

type Props = {
     envid: string,
     content: string,
     projectId: string
}

export default function ContentHandler({ envid, content, projectId }: Props) {

     const onContentChange = useEnvStore((state) => state.onContentChange)
     const isEdit = useEnvStore((state) => state.isEdit)
     const [value, setValue] = useState<string>(content || '');
     const [isSaving, setIsSaving] = useState<Boolean>(false);

     const saveToDb = useCallback(async (newValue: string) => {
          if (newValue === content) return;

          setIsSaving(true);
          try {
               onContentChange(newValue);
               let res = await patchEnvById({ envId: envid, content: newValue, projectId: projectId });
               if (res.success) {

                    toast.success("Changes saved");
               }
               else {
                    throw new Error(res.message)
               }
          } catch (error) {
               toast.error("Failed to autosave");
          } finally {
               setIsSaving(false);
          }
     }, [envid, content]);

     useEffect(() => {
          if (value === content) return;

          const delayDebounceFn = setTimeout(() => {
               saveToDb(value);
          }, 800);

          return () => clearTimeout(delayDebounceFn);
     }, [value, saveToDb, content]);

     return (
          <div className="relative  ">
               {isSaving && (
                    <div className="absolute -top-6.25  left-0 text-sm  italic  opacity-70">
                         Saving...
                    </div>
               )}

               {isEdit ? (
                    <Textarea
                         onChange={(e) => setValue(e.target.value)}
                         value={value}
                         className=" mt-8 "
                         placeholder="PORT=3000..."
                    />
               ) : (
                    <pre className="border px-3 py-2 mt-8 font-dm_mono text-lg border-black/40 min-h-32 border-dashed whitespace-pre-wrap">
                         {value || <span className="text-gray-400 italic">No content found</span>}
                    </pre>
               )}
          </div>
     )
}