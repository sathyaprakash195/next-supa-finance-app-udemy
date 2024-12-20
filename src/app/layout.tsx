import type { Metadata } from "next";

import "./globals.css";
import AntDesignTheme from "@/theme";
import LayoutProvider from "@/layout-provider";

export const metadata: Metadata = {
  title: "Next-Supa Finance App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntDesignTheme>
          <LayoutProvider>
            {children}
          </LayoutProvider>
        </AntDesignTheme>
      </body>
    </html>
  );
}