import React, { useRef, useState } from "react";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { Video } from "@/app/_utils/interfaces";

import ProfilePicture from "@/app/_components/ProfilePicture/ProfilePicture";
import VideoWithControls from "@/app/_components/VideoCard/VideoWithControls";

interface IProps {
    post: Video;
}

const HomeVersion = ({ post }: IProps) => {
    const { caption, postedBy, video, _id, likes } = post;
    const videoRef = useRef<HTMLVideoElement>(null);

    return (
        <div className="flex flex-col border-b-2 border-gray-200 pb-6">
            <div>
                <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded ">
                    <div className="flex justify-center items-center w-[42px] h-[42px]">
                        <Link className="w-[32px] h-[32px] block" href={`/user/${postedBy?._id}`}>
                            <ProfilePicture profileImage={postedBy?.profileImage} />
                        </Link>
                    </div>

                    <div>
                        <Link href={`/user/${postedBy?._id}`}>
                            <div className="flex items-center gap-2">
                                <p className="flex gap-2 items-center justify-center md:text-md font-bold text-primary lowercase tracking-wider">
                                    {postedBy?.userName.replace(/\s+/g, "")} <GoVerified className="text-blue-400 text-md" />
                                </p>
                            </div>
                        </Link>

                        <Link href={`/posts/${_id}`}>
                            <p className="mt-2 font-normal ">{caption}</p>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="lg:ml-20 flex gap-4 justify-center">
                <div className="w-fit max-w-[470px] max-h-[585px] rounded-3xl">
                    <VideoWithControls
                        videoClasses={"cursor-pointer w-full h-full"}
                        videoRef={videoRef}
                        videoSource={video.asset.url}
                    />
                </div>
            </div>
            
        </div>
    );
};

export default HomeVersion;
