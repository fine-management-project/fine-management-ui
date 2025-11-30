import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CSSProperties } from "react";
import { SessionContextProvider } from "@/lib/session/SessionContext";
import ReactQueryProvider from "@/lib/api/ReactQueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fine Management App",
  description: "Track and manage your fines!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionContextProvider>
          <ReactQueryProvider>
            <SidebarProvider
              style={
                {
                  "--sidebar-width": "20rem",
                  "--sidebar-width-mobile": "20rem",
                } as CSSProperties
              }
              className="block"
              defaultOpen={false}
            >
              {children}
            </SidebarProvider>
          </ReactQueryProvider>
        </SessionContextProvider>
      </body>
    </html>
  );
}
