import { LoginRes } from "../types/types";
import { apiFetch } from "./fetcher";

export function getMe() {
     try {
          return apiFetch<any>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`, {
               token: true,
          });
     } catch (err: any) {

          throw err; // real error
     }

}

export function getEnv({ id }: { id: string }) {
     return apiFetch<any>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${id}/env-files`, {
          token: true,
          tags: [`env-${id}`]
     });
}

export function createEnvFile({ id }: { id: string }) {
     return apiFetch<any>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${id}/env-files`, {
          token: true,
          method: 'POST',
          tags: [`env-${id}`]
     });
}


export function getProjects() {
     return apiFetch<any>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project`, {
          token: true,
          tags: ["projects"]
     });
}
export function createProject({ name }: { name: string }) {
     return apiFetch<any>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project`, {
          body: { name }, method: 'POST', token: true,
     });
}
 