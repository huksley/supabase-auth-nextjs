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
import { Html } from 'next/document';
import Head from 'next/head';

function MyApp({
  Component,
  pageProps
}: AppProps<{ initialSession: Session }>) {
  const router = useRouter();
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>()
  );

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <AuthGuard>
          <Component {...pageProps} />
        </AuthGuard>
      </SessionContextProvider>
    </>
  );
}

export default MyApp;
