"use client";

import React, { useState } from "react";
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

const Navbar = () => {
    const { userProfile, addUser } = useAuthStore();

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
                    <div className="flex gap-5 md:gap-10">{userProfile.userName}</div>
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
