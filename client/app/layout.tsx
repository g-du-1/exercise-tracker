import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { CustomQueryClient } from "./components/CustomQueryClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Exercise Tracker",
  description: "BWF Exercise Tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppRouterCacheProvider>
      <CustomQueryClient>
        <ThemeProvider theme={theme}>
          <html lang="en">
            <body className={inter.className}>{children}</body>
          </html>
        </ThemeProvider>
      </CustomQueryClient>
    </AppRouterCacheProvider>
  );
}
