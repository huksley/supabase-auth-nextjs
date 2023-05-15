import { useRouter } from 'next/router';
import {
  createBrowserSupabaseClient,
  Session
} from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { Database } from '../db_types';
import '../styles/globals.css';
import { AuthGuard } from './AuthGuard';

function MyApp({
  Component,
  pageProps
}: AppProps<{ initialSession: Session }>) {
  const router = useRouter();
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>()
  );

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    ><AuthGuard>
    <Component {...pageProps} />

    </AuthGuard>
    </SessionContextProvider>
  );
}

export default MyApp;
