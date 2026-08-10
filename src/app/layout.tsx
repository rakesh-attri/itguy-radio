import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Salesforce QA Music",
  description: "90s Bollywood bangers for Salesforce QA engineers who test to the beat.",
  applicationName: "Salesforce QA Music",
  openGraph: {
    title: "Salesforce QA Music",
    description: "90s Bollywood bangers for Salesforce QA engineers who test to the beat.",
    siteName: "Salesforce QA Music",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salesforce QA Music",
    description: "90s Bollywood bangers for Salesforce QA engineers who test to the beat.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col font-sans`}>
        {children}
      </body>
    </html>
  );
}
