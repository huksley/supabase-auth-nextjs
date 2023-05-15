import React, { Component, ComponentType, Fragment } from 'react';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { AuthUser } from '@supabase/supabase-js';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

export type WithPageAuthRequired = <
  P extends {
    /**
     * Supabase user (i.e. system user)
     **/
    user: AuthUser;
  }
>(
  Component: ComponentType<P>
) => React.FC<Omit<P, 'user'>>;

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, session, error } = useSessionContext();
  const supabaseClient = useSupabaseClient();

  // Authorize if not logged in
  if (!session) {
    console.info('isLoading', isLoading, 'session', session, 'error', error);
    return isLoading ? (
      <></>
    ) : (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 4em)',
          boxSizing: 'content-box'
        }}
      >
        <Auth
          redirectTo="http://localhost:3000"
          supabaseClient={supabaseClient}
          providers={['google']}
          magicLink
          appearance={{ theme: ThemeSupa }}
          // scopes={{github: 'repo'}} // TODO: enable scopes in Auth component.
          socialLayout="horizontal"
        />
      </div>
    );
  }

  return <React.Fragment>{children}</React.Fragment>;
};
