"use client"
import { Button } from "@/components/ui/button"
import {
     Dialog,
     DialogClose,
     DialogContent,
     DialogDescription,
     DialogFooter,
     DialogHeader,
     DialogTitle,
     DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { refreshApi } from "@/lib/api/fetcher"
import { createProjectApi } from "@/lib/api/project_env"
import { useState } from "react"
import { toast } from "sonner"

type Props = {}

export default function CreateProjectButton({ }: Props) {
     const [name, setName] = useState<string>('');
     const [loading, setLoading] = useState<boolean>(false);

     async function createProject() {
          if (loading) return;
          if (name == '') return;
          setLoading(true);

          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

          try {
               let res = await createProjectApi({ name: name });


               if (!res?.success) {
                    throw new Error(res?.message || ' Something went wrong');
               } else {
                    refreshApi('projects');
               }
               
               toast.success(res.message ?? ' Project created successfully');
 

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
          <Dialog>

               <DialogTrigger asChild >
                    <Button variant={'default'}>Create Project</Button>
               </DialogTrigger>
               <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                         <DialogTitle>Create New Project</DialogTitle>
                         <DialogDescription>
                              Enter project details to create a new project.
                         </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                         <div className="grid gap-3">
                              <Label htmlFor="name-1">Name</Label>
                              <Input onChange={(e) => setName(e.target.value)} value={name} id="name-1" name="name" />
                         </div>

                    </div>
                    <DialogFooter>
                         <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                         </DialogClose>
                         <Button isLoading={loading} onClick={createProject}>Save changes</Button>
                    </DialogFooter>
               </DialogContent>

          </Dialog>

     )
}