import "~/styles/globals.css";
import { fontSans} from '~/styles/fonts'
import { ClientProviders } from "./client-providers";
import { cn } from "@acme/ui/src/utils";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body
        className={cn(
            "min-h-screen bg-white dark:bg-gray-950 font-sans antialiased",
            fontSans.variable
          )}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
