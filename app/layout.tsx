import type { Metadata } from "next";
import { Inter_Tight, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavGate from "@/components/NavGate";
import PageTransition from "@/components/PageTransition";
import RevealManager from "@/components/RevealManager";

const interTight = Inter_Tight({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "MRH by OK Play — Clean air, proven",
  description: "German filtration. Indian deployments. Measurable AQI drop.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NavGate />
        <div className="flex-1">{children}</div>
        <RevealManager />
        <PageTransition />
      </body>
    </html>
  );
}
