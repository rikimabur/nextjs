"use client";
import "bootstrap-material-design/dist/css/bootstrap-material-design.min.css";
import { Toaster } from "react-hot-toast";
import TopNav from "@/components/nav/TopNav";
import { SessionProvider } from "next-auth/react";
import { CategoryProvider } from "@/context/category";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <CategoryProvider>
          <body>
            <TopNav />
            <Toaster />
            {children}
          </body>
        </CategoryProvider>
      </SessionProvider>
    </html>
  );
}
