import React from "react";
import { Video } from "@/app/_utils/interfaces";
import { GoVerified } from "react-icons/go";
import { BsPlay } from "react-icons/bs";

interface IProps {
    post: Video;
}

const VideoCard = ({ post }: IProps) => {
    const { caption, postedBy, video, _id, likes } = post;

    return (
        <>
            <p className="mt-2 font-normal ">{caption}</p>

            <div className="flex items-center gap-2">
                <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                    {postedBy.userName} <GoVerified className="text-blue-400 text-md" />
                </p>
            </div>

            <video
                loop
                src={video.asset.url}
                className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[528px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
            ></video>

            <div className="flex gap-2 -mt-8 items-center ml-4">
                <p className="text-white text-lg font-medium flex gap-1 items-center">
                    <BsPlay className="text-2xl" />
                    {likes?.length || 0}
                </p>
            </div>
        </>
    );
};

export default VideoCard;
