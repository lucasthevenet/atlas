"use client";

import { SessionProvider } from "next-auth/react";

type ClientProvidersProps = {
  children: React.ReactNode;
};

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <>
      <SessionProvider>{children}</SessionProvider>
    </>
  );
}
