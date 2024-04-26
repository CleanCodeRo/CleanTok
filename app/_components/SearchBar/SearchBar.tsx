import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

type Props = {};

const SearchBar = (props: Props) => {
    return (
        <div className="relative mt-3 w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-500 p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                <AiOutlineSearch size={"1rem"} />
            </div>
            <input
                type="text"
                id="search-navbar"
                className="w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search..."
            />
        </div>
    );
};

export default SearchBar;
