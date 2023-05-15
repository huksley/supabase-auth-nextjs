import {
  useSessionContext,
  useSupabaseClient,
  useUser
} from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const LoginPage: NextPage = () => {
  const { isLoading, session, error } = useSessionContext();
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const [data, setData] = useState<Record<string,unknown>|null>(null);

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from('users').select('*').single();
      setData(data);
    }

    if (user) loadData();
  }, [user, supabaseClient]);

  return (
    <>
      <button
        onClick={async () => {
          await supabaseClient.auth.signOut();
          router.push('/');
        }}
      >
        Logout
      </button>
      <p>
        [<Link href="/profile">getServerSideProps</Link>] | [
        <Link href="/protected-page">server-side RLS</Link>] |{' '}
        <button
          onClick={() =>
            supabaseClient.auth.updateUser({ data: { test1: 'updated' } })
          }
        >
          Update user metadata
        </button>
        <button onClick={() => supabaseClient.auth.refreshSession()}>
          Refresh session
        </button>
      </p>
      {isLoading ? <h1>Loading...</h1> : <h1>Loaded!</h1>}
      <p>user:</p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <p>client-side data fetching with RLS</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default LoginPage;
