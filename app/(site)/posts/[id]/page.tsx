"use client";

import React, { useRef, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import { GoVerified } from "react-icons/go";
import { MdSend } from "react-icons/md";

import { IComment, IUser, Video } from "@/app/_utils/interfaces";
import { getPost, uploadComment, getComment } from "@/app/_utils/api";

import Spinner from "@/app/_components/Spinner/Spinner";
import VideoWithControls from "@/app/_components/VideoWithControls/VideoWithControls";
import ProfilePicture from "@/app/_components/ProfilePicture/ProfilePicture";
import Image from "next/image";
import useAuthStore from "@/app/_store/authStore";

interface IProps {}

const PostDetails = (props: IProps) => {
    const params = useParams();
    const { userProfile, addUser, removeUser } = useAuthStore();
    const videoRef = useRef<HTMLVideoElement>(null);
    const { id } = params;

    const [post, setPost] = useState<Video | null>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [commentText, setCommentText] = useState<string>();
    const [postRelatedComments, setPostRelatedComments] = useState<IComment[]>([]);

    const [user, setUser] = useState<IUser | null>();

    useEffect(() => {
        setUser(userProfile);
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
        if (post?.relatedComments.length) {
            const tempComments = post.relatedComments.slice();
            setPostRelatedComments(post.relatedComments);
        }
    }, [post]);

    useEffect(() => {}, [postRelatedComments]);

    const handleCommentUpload = async () => {
        const newComment = {
            _type: "comment",
            commentText,
            postedBy: {
                _type: "postedBy",
                _ref: user?._id,
            },
            parentPost: {
                _ref: id,
                _type: "reference",
            },
        };

        const newCommentResponse = await uploadComment(newComment);
        const newCommentData = newCommentResponse.data;

        if (newCommentData && newCommentData._id) {
            const createdComment = await getComment(newCommentData._id);
            const commentData = createdComment.data[0];

            if (commentData && commentData._id) {
                setPostRelatedComments([...postRelatedComments, commentData]);
                setCommentText("");
            }
        }
    };

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

                <div className="relative w-[1000px] md:w-[900px] lg:w-[700px] md:pt-4 md:border-l">
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

                    <div className="comments-section flex flex-col border-t mt-4 pt-4 pl-4 max-h-[420px] overflow-scroll">
                        {postRelatedComments.length ? (
                            <div className="w-full">
                                {postRelatedComments &&
                                    postRelatedComments.map((comment) => (
                                        <div
                                            key={`comm_${comment._id}`}
                                            className="comment-card flex gap-4 mb-4 bg-white w-full"
                                        >
                                            <div className="left w-fit">
                                                <Link href={`/user/${comment.postedBy?._id}`}>
                                                    <div className="w-[32px] h-[32px]">
                                                        <ProfilePicture profileImage={comment.postedBy?.profileImage} />
                                                    </div>
                                                </Link>
                                            </div>

                                            <div className="right flex flex-col w-full">
                                                <Link href={`/user/${comment.postedBy?._id}`}>
                                                    <div className="flex gap-2 items-center text-lg font-bold lowercase tracking-wider">
                                                        {comment.postedBy?.userName.replace(/\s+/g, "")}{" "}
                                                        <GoVerified className="text-blue-400 text-lg" />
                                                    </div>
                                                </Link>

                                                <div className="comment-body text-gray-600">{comment.commentText}</div>
                                                <div className="comment-creation-date text-xs text-gray-400">
                                                    {new Date(comment._createdAt).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        ) : (
                            <div className="no-comments flex flex-col lg:pl-10 items-center">
                                <div className="mb-1 xl:mb-2 text-xl xl:text-2xl font-bold">No comments yet.</div>
                                <div className="mt-1 xl:mt-2 text-xs xl:text-sm">Start the conversation.</div>
                            </div>
                        )}
                    </div>

                    <div className="comment-input flex gap-2 border-t mt-4 pt-4 pl-4">
                        <div className="left w-fit">
                            {user?.profileImage && (
                                <Link href={`/user/${user?._id}`}>
                                    <div>
                                        <Image
                                            className="rounded-full cursor-pointer"
                                            src={user?.profileImage}
                                            alt="user"
                                            width={40}
                                            height={40}
                                        />
                                    </div>
                                </Link>
                            )}
                        </div>

                        <div className="right w-full">
                            <form>
                                <div className="flex items-center rounded-lg">
                                    <textarea
                                        id="chat"
                                        rows={1}
                                        className="block mx-2 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Add comment here..."
                                        value={commentText}
                                        onChange={(event) => setCommentText(event.target.value)}
                                    ></textarea>

                                    <button
                                        disabled={commentText === null}
                                        onClick={handleCommentUpload}
                                        type="button"
                                        className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100"
                                    >
                                        <MdSend size={"1.35rem"} />
                                        <span className="sr-only">Send message</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetails;
