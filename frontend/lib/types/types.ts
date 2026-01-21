export type Project_card_item = {
     _id: string,
     userId:string
     name: string,
     no_envs?: number
}
 
export type EnvFileType = {
     _id: string,
     title: string,
     projectId: string
     content: string
     createdAt: string
     updatedAt: string
}
export type Todo = {
     id: number;
     title: string;
     completed: boolean;
};
