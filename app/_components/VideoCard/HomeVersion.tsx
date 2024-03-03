import React, { useRef, useState } from "react";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { Video } from "@/app/_utils/interfaces";

import PlayPauseButton from "@/app/_components/VideoCard/PlayPauseButton";
import MuteUnmuteVideoSwitcher from "@/app/_components/VideoCard/MuteUnmuteVideoSwitcher";
import ProfilePicture from "@/app/_components/ProfilePicture/ProfilePicture";

interface IProps {
    post: Video;
}

const HomeVersion = ({ post }: IProps) => {
    const { caption, postedBy, video, _id, likes } = post;
    const [isHover, setIsHover] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);

    return (
        <div className="flex flex-col border-b-2 border-gray-200 pb-6">
            <div>
                <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded ">
                    <div className="w-10 h-10">
                        <Link href={`/profile/${postedBy?._id}`}>
                            <ProfilePicture profileImage={postedBy?.profileImage} />
                        </Link>
                    </div>
                    <div>
                        <Link href={`/profile/${postedBy?._id}`}>
                            <div className="flex items-center gap-2">
                                <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                                    {postedBy?.userName} <GoVerified className="text-blue-400 text-md" />
                                </p>
                            </div>
                        </Link>
                        <Link href={`/posts/${_id}`}>
                            <p className="mt-2 font-normal ">{caption}</p>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="lg:ml-20 flex gap-4 relative">
                <div
                    onMouseEnter={() => setIsHover(true)}
                    onMouseLeave={() => setIsHover(false)}
                    className="rounded-3xl"
                >
                    <Link href={`/posts/${_id}`}>
                        <video
                            loop
                            ref={videoRef}
                            src={video.asset.url}
                            className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[528px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
                        ></video>
                    </Link>

                    {isHover && (
                        <div className="absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] lg:w-[600px] p-3">
                            <PlayPauseButton videoRef={videoRef} />
                            <MuteUnmuteVideoSwitcher videoRef={videoRef} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeVersion;
