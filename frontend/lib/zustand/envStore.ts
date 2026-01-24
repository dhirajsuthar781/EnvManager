import { create } from 'zustand'


interface EnvManager {
     isEdit: boolean
     toggleEdit: () => void
     currentContent: string
     onContentChange: (content: string) => void
   
}


export const useEnvStore = create<EnvManager>()((set) => ({

     isEdit: false,
     currentContent: '',
     toggleEdit: () => set((state) => {
          return {
               isEdit: !state.isEdit
          }
     }),
     onContentChange: (content: string) => set({
          currentContent: content
     })
     //====================================

 
}))