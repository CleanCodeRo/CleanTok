import Link from "next/link";
import React from "react";
import { GoVerified } from "react-icons/go";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import { IComment } from "@/app/_utils/interfaces";

type Props = {
    comments: IComment[];
};

const PostComments = ({ comments }: Props) => {
    return (
        <div className="w-full">
            {comments.map((comment) => (
                <div key={`comm_${comment._id}`} className="comment-card flex gap-4 mb-4 bg-white w-full">
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
    );
};

export default PostComments;
