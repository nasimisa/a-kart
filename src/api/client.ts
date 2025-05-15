import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

export const BASE_URL = 'http://localhost:4000';

export const api = axios.create({
  baseURL: BASE_URL,
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});
