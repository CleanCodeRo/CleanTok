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
            <div className="flex w-full h-full bg-white flex-wrap md:flex-nowrap gap-6 md:gap-8">
                <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center">
                    <VideoWithControls
                        videoClasses={"cursor-pointer w-full h-full"}
                        videoRef={videoRef}
                        videoSource={post?.video?.asset.url}
                    />
                </div>

                <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
                    <div className="md:mt-4">
                        <Link href={`/user/${post?.postedBy?._id}`}>
                            <div className="flex gap-4 mb-4 bg-white w-full pl-4 lg:pl-4 cursor-pointer">
                                <div className="w-[42px] h-[42px]">
                                    <ProfilePicture profileImage={post?.postedBy?.profileImage} />
                                </div>

                                <div className="flex gap-2 items-center justify-center text-xl font-bold lowercase tracking-wider">
                                    {post?.postedBy?.userName.replace(/\s+/g, "")}{" "}
                                    <GoVerified className="text-blue-400 text-xl" />
                                </div>
                            </div>
                        </Link>

                        <div className="pl-16 md:pl-10 pr-10 md:pr-5">
                            <p className=" text-md text-gray-600">{post?.caption}</p>
                        </div>

                        {post?.relatedComments.length ? (
                            <div className="post-comments w-full border-t mt-4 pt-4 pl-4 flex flex-col">
                                {post?.relatedComments.map((comment) => (
                                    <div key={comment._id} className="comment-card flex gap-4 mb-4 bg-white w-full">
                                        <div className="left w-fit">
                                            <Link href={`/user/${comment.postedBy?._id}`}>
                                                <div className="w-[32px] h-[32px]">
                                                    <ProfilePicture profileImage={comment.postedBy.profileImage} />
                                                </div>
                                            </Link>
                                        </div>

                                        <div className="right flex flex-col w-full">
                                            <Link href={`/user/${comment.postedBy?._id}`}>
                                                <div className="flex gap-2 items-center text-lg font-bold lowercase tracking-wider">
                                                    {comment.postedBy.userName.replace(/\s+/g, "")}{" "}
                                                    <GoVerified className="text-blue-400 text-lg" />
                                                </div>
                                            </Link>

                                            <div className="comment-body">{comment.commentText}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-comments flex flex-col items-center border-t mt-4 pt-4 pl-4 lg:pl-10">
                                <div className="mb-1 xl:mb-2 text-xl xl:text-2xl font-bold">No comments yet.</div>
                                <div className="mt-1 xl:mt-2 text-xs xl:text-sm">Start the conversation.</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;
