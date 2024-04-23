import React, { MouseEventHandler } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";

interface IProps {
    handleDisplay: MouseEventHandler<HTMLDivElement> | undefined;
    showMenu: boolean;
}

const ShowHideMenuToggle = ({ handleDisplay, showMenu }: IProps) => {
    return (
        <div
            className="toggle block cursor-pointer text-xl hover:text-[#004AAD] inline-flex items-center justify-center"
            onClick={handleDisplay}
        >
            {showMenu ? (
                <ImCancelCircle
                    size={"1.25rem"}
                    className="p-2 w-10 h-10 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
            ) : (
                <AiOutlineMenu
                    size={"1.25rem"}
                    className="p-2 w-10 h-10 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
            )}
        </div>
    );
};

export default ShowHideMenuToggle;
