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

const Navbar = () => {
    const [user, setUser] = useState(false);

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
                {user ? (
                    <div className="flex gap-5 md:gap-10">Logged In</div>
                ) : (
                    <GoogleLogin
                        onSuccess={(response) => console.log(response)}
                        onError={() => console.log("Login Failed")}
                    />
                )}
            </div>
        </div>
    );
};

export default Navbar;
