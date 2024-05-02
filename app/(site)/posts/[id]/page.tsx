"use client";

import React, { useRef, useEffect, useState, Suspense } from "react";
import { useParams } from "next/navigation";

import { IComment, Video } from "@/app/_utils/interfaces";
import { getPost } from "@/app/_utils/api";

import Spinner from "@/app/_components/Spinner/Spinner";
import VideoWithControls from "@/app/_components/VideoWithControls/VideoWithControls";
import NoComments from "@/app/_components/Comments/NoComments";
import PostComments from "@/app/_components/Comments/PostComments";
import PostCommentInput from "@/app/_components/Comments/PostCommentInput";
import PostAuthorProfileLink from "@/app/_components/PostAuthorProfileLink/PostAuthorProfileLink";
import useAuthStore from "@/app/_store/authStore";

interface IProps {}

const PostDetails = (props: IProps) => {
    const params = useParams();
    const videoRef = useRef<HTMLVideoElement>(null);
    const { id } = params;
    const { userProfile } = useAuthStore();

    const [post, setPost] = useState<Video | null>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [postRelatedComments, setPostRelatedComments] = useState<IComment[]>([]);
    const [isPostCommentInputDisabled, setIsPostCommentInputDisabled] = useState<boolean>(true);

    useEffect(() => {
        setIsPostCommentInputDisabled(userProfile ? false : true);
    }, [userProfile]);

    useEffect(() => {
        const getPostInit = async () => {
            const result: any = await getPost(id);
            setPost(result?.data[0]);
            setIsLoading(false);
        };
        getPostInit();
    }, [id]);

    useEffect(() => {
        setPostRelatedComments(post?.relatedComments.length ? post.relatedComments : []);
    }, [post]);

    useEffect(() => {}, [postRelatedComments]);

    return (
        <Suspense fallback={<Spinner />}>
            {isLoading ? (
                <Spinner />
            ) : (
                <div className="relative w-full h-full">
                    <div className="flex w-full h-full bg-white flex-wrap md:flex-nowrap gap-6 md:gap-8">
                        <div className="relative flex-2 w-full lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center">
                            <VideoWithControls
                                videoClasses={"cursor-pointer w-full h-full"}
                                videoRef={videoRef}
                                videoSource={post?.video?.asset.url}
                            />
                        </div>

                        <div className="relative w-full md:w-[900px] lg:w-[700px] md:pt-4 md:border-l">
                            <PostAuthorProfileLink postDetails={post!} />

                            <div className="pl-16 md:pl-10 pr-10 md:pr-5 break-all">
                                <p className="text-md text-gray-600">{post?.caption}</p>
                            </div>

                            <div className="comments-section flex flex-col border-t mt-4 pt-4 pl-4 max-h-[420px] overflow-scroll">
                                {postRelatedComments.length ? (
                                    <PostComments comments={postRelatedComments} />
                                ) : (
                                    <NoComments />
                                )}
                            </div>

                            <PostCommentInput
                                postID={id}
                                postRelatedComments={postRelatedComments}
                                setPostRelatedComments={setPostRelatedComments}
                                isTextAreaDisabled={isPostCommentInputDisabled}
                            />
                        </div>
                    </div>
                </div>
            )}
        </Suspense>
    );
};

export default PostDetails;
