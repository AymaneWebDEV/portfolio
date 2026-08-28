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
  title: "Ahmed Aymane Harty | Software Engineer & AI Specialist",
  description: "Portfolio of Ahmed Aymane Harty — Software Engineer specializing in Artificial Intelligence, Deep Learning, Computer Vision, and Full-Stack Cloud Architecture.",
  keywords: ["Ahmed Aymane Harty", "Artificial Intelligence", "Deep Learning", "PyTorch", "Computer Vision", "Software Engineer", "Full-Stack", "React", "Next.js", "Portfolio"],
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
