"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Logo from "../../ui/images/clean-tok-logo.png";
import useGeneralStore from "@/app/_store/generalStore";
import ShowHideMenuToggle from "../ShowHideMenuToggle/ShowHideMenuToggle";
import useAuthStore from "@/app/_store/authStore";
import { IUser } from "@/app/_utils/interfaces";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { AiOutlineLogout } from "react-icons/ai";
import { createOrGetUser } from "@/app/_utils/api";
import SearchBar from "../SearchBar/SearchBar";

type Props = {};

const Navbar = (props: Props) => {
    const { showSidebar, toggleSidebarDisplay } = useGeneralStore();
    const { userProfile, addUser, removeUser } = useAuthStore();
    const [user, setUser] = useState<IUser | null>();

    useEffect(() => {
        setUser(userProfile);
    }, [userProfile]);

    return (
        <nav className="sticky bg-white w-full z-20 top-0 start-0 border-b border-gray-200 flex items-center gap-1 xl:gap-0">
            <div className="xl:hidden w-20 flex flex-wrap items-center justify-center">
                <ShowHideMenuToggle handleDisplay={toggleSidebarDisplay} showMenu={showSidebar} />
            </div>

            <div className="w-full flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="logo flex items-center space-x-3 rtl:space-x-reverse">
                    <Image
                        className="cursor-pointer w-[100px] md:w-[130px] h-8"
                        src={Logo}
                        alt="CleanTok Logo"
                        priority={true}
                    />
                </Link>

                <div className="flex" id="navbar-search">
                    <div className="relative hidden lg:block">
                        <SearchBar />
                    </div>
                </div>

                <div className="auth flex space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {userProfile ? (
                        <div className="flex gap-5 md:gap-10">
                            {user?.profileImage && (
                                <Link href={`/user/${user?._id}`}>
                                    <div>
                                        <Image
                                            className="rounded-full cursor-pointer"
                                            src={user?.profileImage}
                                            alt="user"
                                            width={40}
                                            height={40}
                                        />
                                    </div>
                                </Link>
                            )}

                            <button
                                type="button"
                                className=" border-2 p-2 rounded-full cursor-pointer outline-none shadow-md"
                                onClick={() => {
                                    googleLogout();
                                    removeUser();
                                }}
                            >
                                <AiOutlineLogout color="red" fontSize={21} />
                            </button>
                        </div>
                    ) : (
                        <>
                            <GoogleLogin
                                onSuccess={(response) => createOrGetUser(response, addUser)}
                                onError={() => console.log("Login Failed")}
                            />
                            <Link
                                href="/"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                            >
                                Log in
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
