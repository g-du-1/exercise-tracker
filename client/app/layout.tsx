import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import QueryProvider from "./providers/query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BWF Tracker",
  description: "BWF Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppRouterCacheProvider>
      <QueryProvider>
        <ThemeProvider theme={theme}>
          <html lang="en">
            <body className={inter.className}>{children}</body>
          </html>
        </ThemeProvider>
      </QueryProvider>
    </AppRouterCacheProvider>
  );
}
