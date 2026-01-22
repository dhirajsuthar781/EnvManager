"use client"
import { Textarea } from '@/components/ui/textarea'
import { EnvData } from '../page'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

type Props = {
     envData: EnvData
     setEnvData: (envData: EnvData) => void
}

export default function EnvCreationDataHandler({ envData, setEnvData }: Props) {
 
     return (
          <div className="  mt-8 space-y-5">
               <div className="grid gap-3 w-1/2">
                    <Label htmlFor="name-1">Name</Label>
                    <Input onChange={(e) => { setEnvData({ ...envData, name: e.target.value }); }} value={envData.name} id="name-1" name="name" />
               </div>
               <div className="grid gap-3">
                    <Label htmlFor="name-1">Content</Label>
                    <Textarea
                         onChange={(e) => { setEnvData({ ...envData, content: e.target.value }); }}
                         value={envData.content}
                         className="  "
                         placeholder="PORT=3000..."
                    />
               </div>
          </div>
     );
}