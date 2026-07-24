import type { AppProps } from 'next/app';
import '../src/styles.tailwind.css';
import '../src/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../src/lib/auth';
import { AppShell } from '../src/components/Layout';

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppShell>
          <Component {...pageProps} />
        </AppShell>
      </AuthProvider>
    </QueryClientProvider>
  );
}
