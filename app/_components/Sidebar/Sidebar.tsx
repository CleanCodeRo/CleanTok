"use client";

import React, { Suspense, useState } from "react";
import Link from "next/link";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import Discover from "../Discover/Discover";
import SuggestedAccounts from "../SuggestedAccounts/SuggestedAccounts";
import Footer from "../Footer/Footer";

const Sidebar = () => {
    const [showSidebar, setShowSidebar] = useState(true);
    const [userProfile, setUserProfile] = useState(false);

    const handleSidebarDisplay = () => {
        setShowSidebar((prev) => !prev);
    };

    const normalLinkClasses =
        "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#004AAD] rounded";

    return (
        <div>
            <div
                className="block cursor-pointer xl:hidden m-2 ml-4 mt-3 text-xl hover:text-[#004AAD]"
                onClick={handleSidebarDisplay}
            >
                {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
            </div>

            {showSidebar && (
                <div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3">
                    <div className="xl:border-b-2 border-gray-200 xl:pb-4">
                        <Link href="/">
                            <div className={normalLinkClasses}>
                                <p className="text-2xl">
                                    <AiFillHome />
                                </p>
                                <span className="text-xl hidden xl:block">For You</span>
                            </div>
                        </Link>
                    </div>

                    <Suspense>
                        <Discover />
                    </Suspense>

                    <SuggestedAccounts />
                    <Footer />
                </div>
            )}
        </div>
    );
};

export default Sidebar;
