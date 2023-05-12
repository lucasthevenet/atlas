"use client";

import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

type ClientProvidersProps = {
  children: React.ReactNode;
  session: Session | null;
};

export function ClientProviders({ children, session }: ClientProvidersProps) {
  return (
    <>
      <SessionProvider session={session}>{children}</SessionProvider>
    </>
  );
}
