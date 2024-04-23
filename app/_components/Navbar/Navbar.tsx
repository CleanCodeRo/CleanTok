"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Logo from "../../ui/images/clean-tok-logo.png";
import useGeneralStore from "@/app/_store/generalStore";
import ShowHideMenuToggle from "../ShowHideMenuToggle/ShowHideMenuToggle";
import useAuthStore from "@/app/_store/authStore";
import { IUser } from "@/app/_utils/interfaces";
import { IoMdAdd } from "react-icons/io";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { AiOutlineLogout } from "react-icons/ai";
import { createOrGetUser } from "@/app/_utils/api";

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
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image
                        className="cursor-pointer w-[100px] md:w-[130px] h-8"
                        src={Logo}
                        alt="CleanTok Logo"
                        priority={true}
                    />
                </Link>

                <div
                    className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                    id="navbar-sticky"
                >
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
                                aria-current="page"
                            >
                                Home
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {userProfile ? (
                        <div className="flex gap-5 md:gap-10">
                            <Link href="/upload">
                                <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                                    <IoMdAdd className="text-xl" /> <span className="hidden md:block">Upload </span>
                                </button>
                            </Link>

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
