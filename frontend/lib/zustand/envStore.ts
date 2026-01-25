import { create } from 'zustand'


interface EnvManager {
     isEdit: boolean
     toggleEdit: () => void
     currentContent: string
     onContentChange: (content: string) => void
     userData: {
          userId: string,
          username: string
     }

     setUserData: (data: { userId: string, username: string }) => void
}


export const useEnvStore = create<EnvManager>()((set) => ({

     isEdit: false,
     currentContent: '',
     userData: {
          userId: '',
          username: ''
     },

     setUserData: (data: { userId: string, username: string }) => set({
          userData: data
     }),
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