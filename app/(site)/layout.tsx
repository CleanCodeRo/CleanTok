import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../ui/styles/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "CleanTok",
    description: "Created by @CleanCode.ro",
};

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased`}>{children}</body>
        </html>
    );
};

export default RootLayout;
