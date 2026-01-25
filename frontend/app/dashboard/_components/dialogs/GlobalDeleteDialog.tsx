"use client"

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useDeleteDialog } from "@/lib/zustand/useDeleteDialog"
import { toast } from "sonner"
import { deleteEnvById, deleteProjectById } from "@/lib/api/project_env"
import { refreshApi } from "@/lib/api/fetcher"

export default function GlobalDeleteDialog() {
  const { open, target, closeDialog, isLoading, toggleLoading } = useDeleteDialog()

  async function handleConfirm() {
    if (!target) return

    switch (target.type) {
      case "ENV":

        try {
          if (!target.projectId || !target.id || isLoading == true) return
          toggleLoading(true)
          let res = await deleteEnvById({ projectId: target.projectId, envId: target.id })
          if (res.success) {
            refreshApi('env-' + target.projectId)
            toast.success("Env file deleted successfully")
          } else {
            toast.error(res.message)
          }
        } catch (error: any) {
          toast.error(error.message || 'Something went wrong')
        } finally {
          toggleLoading(false)
        }

        break
      case "PROJECT":
        try {
          if (!target.projectId || isLoading == true) return
          toggleLoading(true)
          let res = await deleteProjectById({ projectId: target.projectId })
          if (res.success) {
            refreshApi('projects')
            toast.success("Project deleted successfully")
          } else {
            toast.error(res.message)
          }
        } catch (error: any) {

          toast.error(error.message || 'Something went wrong')
        } finally {
          toggleLoading(false)
        }
        break
    }

    closeDialog()
  }

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={closeDialog}>
            Cancel
          </Button>
          <Button isLoading={isLoading} disabled={isLoading} variant="destructive" onClick={handleConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
