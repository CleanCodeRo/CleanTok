import React, { useRef } from "react";
import Link from "next/link";
import { BsPlay } from "react-icons/bs";
import { Video } from "@/app/_utils/interfaces";
import VideoWithControls from "../VideoWithControls/VideoWithControls";

interface IProps {
    post: Video | null | undefined;
}

const DefaultVersion = ({ post }: IProps) => {
    const { caption, video, _id, likes } = post!;
    const videoRef = useRef<HTMLVideoElement>(null);

    return (
        <div>
            <Link href={`/posts/${_id}`}>
                <div className="lg:ml-20 flex gap-4 justify-center">
                    <div className="w-fit max-w-[470px] max-h-[585px] rounded-3xl">
                        <VideoWithControls
                            videoClasses={"cursor-pointer w-full h-full"}
                            videoRef={videoRef}
                            videoSource={video.asset.url}
                        />
                    </div>
                </div>
            </Link>

            <div className="flex gap-2 -mt-8 items-center ml-4">
                <p className="text-white text-lg font-medium flex gap-1 items-center">
                    <BsPlay className="text-2xl" />
                    {likes?.length || 0}
                </p>
            </div>

            <Link href={`/posts/${_id}`}>
                <p className="mt-5 text-md text-gray-800 cursor-pointer w-210">{caption}</p>
            </Link>
        </div>
    );
};

export default DefaultVersion;
