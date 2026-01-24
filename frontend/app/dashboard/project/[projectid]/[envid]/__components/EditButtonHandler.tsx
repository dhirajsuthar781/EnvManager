"use client"
import { Button } from '@/components/ui/button'
import { useEnvStore } from '@/lib/zustand/envStore'

type Props = {
     envid: string
}

export default function EditButtonHandler({ }: Props) {
     const isEdit = useEnvStore((state) => state.isEdit)
     const toggleEdit = useEnvStore((state) => state.toggleEdit)
     async function onEditHandler() {
          toggleEdit();
     }
     async function onSaveHandler() {
          toggleEdit();
     }
     return (
          <>
               {isEdit ? <Button onClick={onSaveHandler} variant={'secondary'}>Save</Button> : <Button onClick={onEditHandler} variant={'secondary'}>Edit</Button>}
          </>
     )
}