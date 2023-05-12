import "~/styles/globals.css";
import { getServerSession } from "next-auth";

import { fontSans } from "~/styles/fonts";
import { ClientProviders } from "./client-providers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html>
      <body
        className={`${fontSans.variable} min-h-screen bg-white font-sans antialiased
          dark:bg-slate-950`}
      >
        <ClientProviders session={session}>{children}</ClientProviders>
      </body>
    </html>
  );
}
