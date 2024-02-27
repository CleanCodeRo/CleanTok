import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../ui/styles/globals.scss";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";

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
            <body className={`${inter.className} antialiased`}>
                <div>
                    <Navbar />
                    <div className="flex gap-6 md:gap-20">
                        <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
                            <Sidebar />
                        </div>
                        <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">{children}</div>
                    </div>
                </div>
            </body>
        </html>
    );
};

export default RootLayout;
