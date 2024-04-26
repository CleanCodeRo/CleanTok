"use client";

import React from "react";
import useGeneralStore from "@/app/_store/generalStore";
import { IoMdClose } from "react-icons/io";

type Props = {};

const Modal = (props: Props) => {
    const { isModalOpen, toggleModalDisplay } = useGeneralStore();

    return (
        <div
            id="default-modal"
            tabIndex={-1}
            aria-hidden="true"
            className={`${
                isModalOpen ? "block" : "hidden"
            } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full bg-[#00000065]`}
        >
            <button
                type="button"
                className="absolute top-0 right-0 text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                data-modal-hide="default-modal"
                onClick={toggleModalDisplay}
            >
                <IoMdClose size={"1.25rem"} />
            </button>

            <div className="relative p-4 w-fit max-w-[85%] max-h-full mx-auto top-2/4 -translate-y-2/4">
                <></>
            </div>
        </div>
    );
};

export default Modal;
