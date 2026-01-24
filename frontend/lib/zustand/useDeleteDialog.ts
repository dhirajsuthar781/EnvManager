import { create } from "zustand"

type DeleteTarget = {
  id: string
  type: "ENV" | "PROJECT"
  projectId: string
}


type DeleteDialogStore = {
  open: boolean
  isLoading: boolean
  target: DeleteTarget | null
  openDialog: (target: DeleteTarget) => void
  toggleLoading: (isLoading: boolean) => void
  closeDialog: () => void
}

export const useDeleteDialog = create<DeleteDialogStore>((set) => ({
  open: false,
  target: null,
  isLoading: false,
  toggleLoading: (isLoading) => set({ isLoading }),
  
  openDialog: (target) =>
    set({
      open: true,
      target,
    }),

  closeDialog: () =>
    set({
      open: false,
      target: null,
      isLoading: false
    }),
}))
