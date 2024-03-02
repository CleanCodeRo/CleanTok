import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { GoVerified } from "react-icons/go";
import { Video } from "@/app/_utils/interfaces";
import PlayPauseButton from "@/app/_components/VideoCard/PlayPauseButton";

interface IProps {
    post: Video;
}

const HomeVersion = ({ post }: IProps) => {
    const { caption, postedBy, video, _id, likes } = post;
    const [isHover, setIsHover] = useState(false);

    const [isVideoMuted, setIsVideoMuted] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);



    useEffect(() => {
        if (videoRef?.current) {
            videoRef.current.muted = isVideoMuted;
        }
    }, [isVideoMuted]);

    return (
        <div className="flex flex-col border-b-2 border-gray-200 pb-6">
            <div>
                <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded ">
                    <div className="w-10 h-10">
                        <Link href={`/profile/${postedBy?._id}`}>
                            <>
                                {postedBy?.profileImage !== null ? (
                                    <Image
                                        width={62}
                                        height={62}
                                        className="rounded-full"
                                        src={postedBy?.profileImage}
                                        alt="user-profile"
                                    />
                                ) : (
                                    <svg
                                        className="w-full h-full text-gray-200 dark:text-gray-700 me-4"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                    </svg>
                                )}
                            </>
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

                            {isVideoMuted ? (
                                <button onClick={() => setIsVideoMuted(false)}>
                                    <HiVolumeOff className="text-black text-2xl lg:text-4xl" />
                                </button>
                            ) : (
                                <button onClick={() => setIsVideoMuted(true)}>
                                    <HiVolumeUp className="text-black text-2xl lg:text-4xl" />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeVersion;
