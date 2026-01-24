import { ApiResponse, BaseResponse, EnvFileType, ProjectType } from "../types/types";
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
export function getEnvById({ projectId, envId }: { envId: string, projectId: string }) {
     return apiFetch<ApiResponse<EnvFileType, "envFile">>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${projectId}/env-files/${envId}`, {
          method: "GET",
          token: true,
          tags: [`env-${projectId}-${envId}`]
     });
}
export function patchEnvById({ projectId, envId, content }: { envId: string, projectId: string, content: string }) {
     return apiFetch<ApiResponse<EnvFileType, "envFile">>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${projectId}/env-files/${envId}`, {
          method: "PATCH",
          token: true,
          body:{ content },
     });
}
export function deleteEnvById({ projectId, envId }: { envId: string, projectId: string }) {
     return apiFetch<ApiResponse<EnvFileType, "envFile">>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${projectId}/env-files/${envId}`, {
          method: "DELETE",
          token: true,
     });
}


export function getEnv({ id }: { id: string }) {
     return apiFetch<ApiResponse<EnvFileType[], "envFiles">>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${id}/env-files`, {
          token: true,
          tags: [`env-${id}`]
     });
}

export function createEnvFileApi({ projectId, title, content }: { projectId: string, title: string, content: string }) {
     return apiFetch<ApiResponse<EnvFileType, "envFile">>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/${projectId}/env-files`, {
          token: true,
          method: 'POST',
          body: { title, content },
          tags: [`env-${projectId}`]
     });
}


export function getProjects() {
     return apiFetch<ApiResponse<ProjectType[], "formattedProjects">>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project`, {
          token: true,
          tags: ["projects"]
     });
}
export function createProjectApi({ name }: { name: string }) {
     return apiFetch<ApiResponse<ProjectType, "project">>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project`, {
          body: { name }, method: 'POST', token: true,
     });
}
export async function storeToken(token: string) {
     return fetch('/api/auth/store-token', {
          method: 'POST',
          headers: {
               'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
     });
}

export async function logout() {
     return fetch('/api/auth/logout', {
          method: 'POST',
     });
}
