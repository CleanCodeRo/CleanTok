import React from "react";
import Link from "next/link";
import { BsPlay } from "react-icons/bs";
import { Video } from "@/app/_utils/interfaces";

interface IProps {
    post: Video;
}

const DefaultVersion = ({ post }: IProps) => {
    const { caption, video, _id, likes } = post;

    return (
        <div>
            <Link href={`/detail/${_id}`}>
                <video loop src={video.asset.url} className="w-[250px] md:w-full rounded-xl cursor-pointer"></video>
            </Link>

            <div className="flex gap-2 -mt-8 items-center ml-4">
                <p className="text-white text-lg font-medium flex gap-1 items-center">
                    <BsPlay className="text-2xl" />
                    {likes?.length || 0}
                </p>
            </div>

            <Link href={`/detail/${_id}`}>
                <p className="mt-5 text-md text-gray-800 cursor-pointer w-210">{caption}</p>
            </Link>
        </div>
    );
};

export default DefaultVersion;
