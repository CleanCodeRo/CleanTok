"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

import { createOrGetUser } from "@/app/_utils/api";
import useAuthStore from "@/app/_store/authStore";
import Modal from "./Modal";
import useGeneralStore from "@/app/_store/generalStore";

type Props = {
    isLogIn?: boolean;
};

const AuthModal = ({ isLogIn }: Props) => {
    const router = useRouter();
    const { userProfile, addUser } = useAuthStore();
    const { isGuestMode, setGuestMode, closeHref } = useGeneralStore();
    const [isDisplayed, setIsDisplayed] = useState(false);

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (response) => {
            createOrGetUser(response, addUser);
            router.push(closeHref);
        },
        onError: () => console.log("Login Failed"),
        flow: "implicit",
    });

    const handleGuestModeSetter = () => {
        setGuestMode();
        router.push("/");
    };

    useEffect(() => {
        if (userProfile) {
            router.push("/");
        } else {
            setIsDisplayed(true);
        }
    }, [router, userProfile]);

    return (
        isDisplayed && (
            <Modal>
                <div className="w-full md:w-[400px] h-[80vh] flex flex-col">
                    <div className="auth-options flex flex-col items-center flex-1 px-2 md:px-10 overflow-hidden">
                        <h2
                            id="auth-title"
                            className="text-center mx-auto mt-16 mb-8 text-xl md:text-3xl md:text-3xl font-bold leading-none tracking-tight text-gray-700"
                        >
                            {isLogIn ? "Log in to" : "Sign up for"} CleanTok
                        </h2>

                        <div className="flex flex-col items-center gap-2 overflow-y-scroll">
                            <button
                                type="button"
                                onClick={() => handleGoogleLogin()}
                                className="px-4 py-2 border flex gap-2 border-slate-200 hover:border-slate-400 rounded-lg text-slate-700 hover:text-slate-900 hover:shadow transition duration-150"
                            >
                                <div className="left">
                                    <FcGoogle size={"1.5rem"} />
                                </div>
                                <div className="right text-md lg:text-lg">Continue with Google</div>
                            </button>
                        </div>

                        {isGuestMode === false && (
                            <div className="flex flex-col items-center gap-2">
                                <div className="separator-with-text text-gray-400 flex items-center justify-center mx-auto my-[22px] w-full overflow-hidden">
                                    <div className="w-full h-[1px] bg-gray-400"></div>
                                    <div className="text-md mx-2">OR</div>
                                    <div className="w-full h-[1px] bg-gray-400"></div>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleGuestModeSetter}
                                    className="px-4 py-2 border flex gap-2 border-slate-200 hover:border-slate-400 rounded-lg text-slate-700 hover:text-slate-900 hover:shadow transition duration-150"
                                >
                                    Continue as guest
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="auth-agreement flex items-center justify-center px-2 md:px-10 py-[30px]">
                        <p className="font-sm w-full text-center text-gray-600">
                            By continuing, you agree to CleanTok’s{" "}
                            <Link target="_blank" rel="noopener noreferrer" href="/legal/terms-of-use" className="">
                                Terms of Service
                            </Link>{" "}
                            and confirm that you have read CleanTok’s{" "}
                            <Link target="_blank" rel="noopener noreferrer" href="/legal/privacy-policy" className="">
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </div>

                    <div className="auth-switch flex border-t gap-1 items-center justify-center h-[64px]">
                        <div>{isLogIn ? "Don't have an account?" : "Already have an account?"}</div>
                        <Link href={isLogIn ? "/signup" : "/login"} className="css-1pp5uu9-ALink epl6mg0">
                            <span className="css-1r3zw3h-SpanLinkText e1b6crsh1">{isLogIn ? "Sign up" : "Log In"}</span>
                        </Link>
                    </div>
                </div>
            </Modal>
        )
    );
};

export default AuthModal;
