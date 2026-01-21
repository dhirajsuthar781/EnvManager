import { Todo } from '../types/types';
import { apiFetch } from './fetcher';

const BASE_URL = 'https://jsonplaceholder.typicode.com';
 
export function getTodos() {
  return apiFetch<Todo[]>(`${BASE_URL}/todos`, {
    revalidate: 60, // ISR
    tags: ['todos'],
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


