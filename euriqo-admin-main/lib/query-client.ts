'use client';

import { QueryClient, DefaultOptions } from '@tanstack/react-query';

// Default options for all queries
const defaultOptions: DefaultOptions = {
  queries: {
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  },
  mutations: {
    retry: 0,
  },
};

// Create a client
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions,
  });
}

// Browser client singleton
let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

