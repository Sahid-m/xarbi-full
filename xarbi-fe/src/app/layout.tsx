import NavbarWrapper from "@/components/navbar-wrapper"; // 👈 NEW
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Xarbi",
  description: "An Saas platform to help your link paid",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[hsl(var(--background))] text-[hsl(var(--foreground))]`}
        >
          <NavbarWrapper />
          <main className="pt-20 md:pt-24 px-4">{children}</main>{/* 👈 Conditionally renders Navbar */}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
