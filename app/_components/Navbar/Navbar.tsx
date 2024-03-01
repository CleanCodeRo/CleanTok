"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Logo from "../../ui/images/clean-tok-logo.png";
import { createOrGetUser } from "@/app/_utils/api";
import useAuthStore from "@/app/_store/authStore";
import { IUser } from "@/app/_utils/interfaces";

const Navbar = () => {
    const { userProfile, addUser, removeUser } = useAuthStore();
    const [user, setUser] = useState<IUser | null>();

    useEffect(() => {
        setUser(userProfile);
    }, [userProfile]);

    return (
        <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
            <Link href="/">
                <div className="w-[100px] md:w-[130px]">
                    <Image
                        className="cursor-pointer w-[100px] md:w-[130px]"
                        src={Logo}
                        alt="CleanTok"
                        priority={true}
                    />
                </div>
            </Link>

            <div>Search...</div>

            <div>
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
                    <GoogleLogin
                        onSuccess={(response) => createOrGetUser(response, addUser)}
                        onError={() => console.log("Login Failed")}
                    />
                )}
            </div>
        </div>
    );
};

export default Navbar;
