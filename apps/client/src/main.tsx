import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UNAUTHORIZED_ERROR_KEY } from './shared/constants.ts';
import { logout } from './shared/utils.ts';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      const msg = (error as Error).message;
      if (msg === UNAUTHORIZED_ERROR_KEY) {
        queryClient.clear();
        logout();
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      const msg = (error as Error).message;
      if (msg === UNAUTHORIZED_ERROR_KEY) {
        queryClient.clear();
        logout();
      }
    },
  }),
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 3 * 60 * 60 * 1000,
    },
    mutations: { retry: false },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
