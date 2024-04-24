import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "../ui/styles/globals.scss";
import Navbar from "../_components/Navbar/Navbar";
import Sidebar from "../_components/Sidebar/Sidebar";
import { googleClientId } from "../_utils/env";
import Modal from "../_components/Modal/Modal";

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
                <GoogleOAuthProvider clientId={googleClientId}>
                    <Navbar />
                    <div className="h-full block xl:flex gap-0 md:gap-20 xl:gap-6 duration-100">
                        <Sidebar />
                        <div className="flex flex-col gap-10 videos flex-1 p-3 ml-0 xl:ml-[400px]">{children}</div>
                    </div>
                    <Modal />
                </GoogleOAuthProvider>
            </body>
        </html>
    );
};

export default RootLayout;
