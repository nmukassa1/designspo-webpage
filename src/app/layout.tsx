import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "./Providers/QueryClientProvider";
import { Analytics } from "@vercel/analytics/next";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Organize & Save Design Ideas | Designspo",
  description:
    "Save and organize web design inspiration effortlessly with Designspo’s Chrome extension and visual dashboard. Perfect for UI/UX designers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
        >
          <Header />
          {children}
          <Analytics />
        </body>
      </QueryProvider>
    </html>
  );
}
