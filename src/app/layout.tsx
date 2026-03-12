import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Use Geist as base for "Professional Typography"
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ahmed Aymane Harty | Full-Stack Developer & AI Enthusiast",
  description: "Portfolio of a Full-Stack Developer specializing in Application Development and AI. Built with Next.js 14, React, and MongoDB.",
  keywords: ["Full-Stack Developer", "AI", "Next.js", "React", "Portfolio", "Web Development"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
