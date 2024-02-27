"use client";

import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { GoogleLogin } from "react-google-login";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import {ImCancelCircle} from "react-icons/im";

const Sidebar = () => {
    const [showSidebar, setShowSidebar] = useState(true);
    const handleSidebarDisplay = () => {
        setShowSidebar((prev) => !prev);
    }

    return (
        <div>
            <div className="block cursor-pointer xl:hidden m-2 ml-4 mt-3 text-xl" onClick={handleSidebarDisplay}>
                {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
            </div>
        </div>
    );
};

export default Sidebar;
