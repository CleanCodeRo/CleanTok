"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { AiFillHome, AiOutlineSearch } from "react-icons/ai";
import Discover from "../Discover/Discover";
import SuggestedAccounts from "../SuggestedAccounts/SuggestedAccounts";
import Footer from "../Footer/Footer";
import useGeneralStore from "@/app/_store/generalStore";
import SearchBar from "../SearchBar/SearchBar";

const Sidebar = () => {
    const { showSidebar } = useGeneralStore();

    return (
        <div
            className={`sidebar bg-white z-20 xl:z-0 ${
                showSidebar ? "translate-x-0" : "-translate-x-20 xl:translate-x-0"
            } h-full border-r-2 border-gray-100 absolute xl:fixed xl:static duration-100`}
        >
            <div className="content xl:w-400 w-20 flex flex-col justify-start mb-10 p-3 overflow-hidden">
                 <div className="pb-3 block lg:hidden">
                    <Link href="/search">
                        <div className="flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#004AAD] rounded-lg focus:outline-none focus:ring-4 focus:ring-gray-200">
                            <p className="text-2xl">
                                <AiOutlineSearch />
                            </p>
                            <span className="text-xl hidden xl:block">Search</span>
                        </div>
                    </Link>
                </div>

                <div className="pb-3">
                    <Link href="/">
                        <div className="flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#004AAD] rounded-lg">
                            <p className="text-2xl">
                                <AiFillHome />
                            </p>
                            <span className="text-xl hidden xl:block">For You</span>
                        </div>
                    </Link>
                </div>

                <div className="pb-3">
                    <Suspense>
                        <Discover />
                    </Suspense>
                </div>

                <div className="pb-3">
                    <SuggestedAccounts />
                </div>

                <Footer />
            </div>
        </div>
    );
};

export default Sidebar;
