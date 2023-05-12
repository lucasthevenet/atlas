import "~/styles/globals.css";
import { getServerSession } from "next-auth";

import { ClientProviders } from "./client-providers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html>
      <body>
        <ClientProviders session={session}>{children}</ClientProviders>
      </body>
    </html>
  );
}
