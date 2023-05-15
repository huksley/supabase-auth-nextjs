import React, { Component, ComponentType, Fragment } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { AuthUser } from "@supabase/supabase-js";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";

export type WithPageAuthRequired = <
  P extends {
    /**
     * Supabase user (i.e. system user)
     **/
    user: AuthUser;
  }
>(
  Component: ComponentType<P>
) => React.FC<Omit<P, "user">>;

/** Check user auth */
export const withPageAuthRequired: WithPageAuthRequired = (Component) => {
  return function withPageAuthRequired(props): JSX.Element {
    const { isLoading, session, error } = useSessionContext();
    const supabaseClient = useSupabaseClient();

    // Authorize if not logged in
    if (!session ) {
      console.info("isLoading", isLoading, "session", session, "error", error);
      return isLoading ? <></>: <Auth
      redirectTo="http://localhost:3000"
      supabaseClient={supabaseClient}
      providers={['google']}
      magicLink
      appearance={{ theme: undefined }}
      // scopes={{github: 'repo'}} // TODO: enable scopes in Auth component.
      socialLayout="horizontal"
    /> 
    }

    return <Component {...(props as any)} />;
  };
};

export const AuthGuard = withPageAuthRequired(
  ({ children }) => {
    return <Fragment>{children}</Fragment>;
  }
);
