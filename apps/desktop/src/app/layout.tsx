import "~/styles/globals.css";
import { cn } from "@acme/ui/utils";

import { fontSans } from "~/styles/fonts";
import { ClientProviders } from "./client-providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body
        className={cn(
          "min-h-screen bg-white font-sans antialiased dark:bg-slate-950",
          fontSans.variable,
        )}
      >
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
