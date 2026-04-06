import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Poster - Wallpaper Manager",
  description: "Organize, optimize, and set your favorite wallpapers with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`}>
      <Analytics /> 
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
