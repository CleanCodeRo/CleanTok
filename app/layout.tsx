import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./main.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CleanTok",
  description: "Created by @CleanCode.ro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
