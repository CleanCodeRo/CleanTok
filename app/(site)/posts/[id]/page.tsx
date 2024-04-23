"use client";

import React, { useRef, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";

import { Video } from "@/app/_utils/interfaces";
import { getPost } from "@/app/_utils/api";

import Spinner from "@/app/_components/Spinner/Spinner";
import VideoWithControls from "@/app/_components/VideoWithControls/VideoWithControls";
import ProfilePicture from "@/app/_components/ProfilePicture/ProfilePicture";

interface IProps {}

const PostDetails = (props: IProps) => {
    const params = useParams();
    const router = useRouter();
    const videoRef = useRef<HTMLVideoElement>(null);
    const { id } = params;

    const [post, setPost] = useState<Video | null>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const getPostInit = async () => {
            const result: any = await getPost(id);
            setPost(result?.data[0]);
            setIsLoading(false);
        };
        getPostInit();
    }, [id]);

    return isLoading ? (
        <Spinner />
    ) : (
        <div className="relative w-full h-full">
            <div className="flex w-full h-full bg-white flex-wrap lg:flex-nowrap">
                <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center">
                    <VideoWithControls
                        videoClasses={"cursor-pointer w-full h-full"}
                        videoRef={videoRef}
                        videoSource={post?.video?.asset.url}
                    />
                </div>

                <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
                    <div className="mt-4">
                        <Link href={`/user/${post?.postedBy?._id}`}>
                            <div className="flex gap-4 mb-4 bg-white w-full pl-4 lg:pl-10 cursor-pointer">
                                <div className="w-[42px] h-[42px]">
                                    <ProfilePicture profileImage={post?.postedBy?.profileImage} />
                                </div>

                                <div className="flex gap-2 items-center justify-center text-xl font-bold lowercase tracking-wider">
                                    {post?.postedBy?.userName.replace(/\s+/g, "")}{" "}
                                    <GoVerified className="text-blue-400 text-xl" />
                                </div>
                            </div>
                        </Link>

                        <div className="pl-20 pr-10 lg:px-10">
                            <p className=" text-md text-gray-600">{post?.caption}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;
