"use client"
import { Textarea } from '@/components/ui/textarea'
import { useEnvStore } from '@/lib/zustand/envStore';
import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

type Props = {
     envid: string,
     content: string
}

export default function ContentHandler({ envid, content }: Props) {
     const isEdit = useEnvStore((state) => state.isEdit)
     const [value, setValue] = useState<string>(content || '');
     const [isSaving, setIsSaving] = useState<Boolean>(false);

     // 1. The actual Save Function (API Call)
     const saveToDb = useCallback(async (newValue: string) => {
          if (newValue === content) return; // Don't save if it's the same as original

          setIsSaving(true);
          try {
               // Replace this with your actual API call or Zustand action
               // await axios.patch(`/api/env/${envid}`, { content: newValue });
               console.log("Autosaving to DB:", newValue);

               toast.success("Changes saved", { duration: 1000 });
          } catch (error) {
               toast.error("Failed to autosave");
          } finally {
               setIsSaving(false);
          }
     }, [envid, content]);

     // 2. The Debounce Effect
     useEffect(() => {
          // If the user hasn't changed anything from the initial load, don't trigger save
          if (value === content) return;

          const delayDebounceFn = setTimeout(() => {
               saveToDb(value);
          }, 800);  

          return () => clearTimeout(delayDebounceFn);
     }, [value, saveToDb, content]);

     return (
          <div className="relative  ">
               {/* Visual indicator for UX */}
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