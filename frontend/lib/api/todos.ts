import { Todo } from '../types/types';
import { apiFetch } from './fetcher';

const BASE_URL = 'https://jsonplaceholder.typicode.com';
 
export function getTodos() {
  return apiFetch<Todo[]>(`${BASE_URL}/todos`, {
    revalidate: 60, // ISR
    tags: ['todos'],
  });
}


