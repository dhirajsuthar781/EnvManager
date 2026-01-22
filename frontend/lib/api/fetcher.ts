'use server';

import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';

type FetchOptions = {
  cache?: RequestCache;
  revalidate?: number;
  tags?: string[];
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  token?: boolean;
};

export async function refreshApi(tag: string) {
  revalidateTag(tag, 'default');
}

export async function apiFetch<T>(
  url: string,
  options: FetchOptions = {},
  defaultOptions?: RequestInit
): Promise<T> {
  const cookieStore = await cookies();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (options.token) {
    const token = cookieStore.get('env_token')?.value;

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const requestInit: RequestInit = {
    method: options.method ?? 'GET',
    headers,
    cache: options.revalidate
      ? 'force-cache'
      : options.cache ?? 'no-store',
    next: {
      revalidate: options.revalidate,
      tags: options.tags,
    },
    ...defaultOptions,
  };

  if (options.method && options.method !== 'GET' && options.body !== undefined) {
    requestInit.body = JSON.stringify(options.body);
  }

  const res = await fetch(url, requestInit);

  // 🔑 Always handle non-OK explicitly
  if (!res.ok) {
    let errorMessage = `API Error: ${res.status}`;

    try {
      const errorBody = await res.json();
      errorMessage = errorBody?.message ?? errorMessage;
    } catch {
      // ignore JSON parse failure
    }

    throw new Error(errorMessage);
  }

  // Some APIs return 204 No Content
  if (res.status === 204) {
    return null as T;
  }

  return res.json() as Promise<T>;
}
