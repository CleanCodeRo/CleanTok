import { Video } from "@/app/_utils/interfaces";
import Link from "next/link";
import React from "react";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import { GoVerified } from "react-icons/go";

type Props = {
    postDetails: Video | null;
};

const PostAuthorProfileLink = ({ postDetails }: Props) => {
    return (
        <Link href={`/user/${postDetails?.postedBy?._id}`}>
            <div className="flex gap-4 mb-4 bg-white w-full pl-4 lg:pl-4 cursor-pointer">
                <div className="w-[42px] h-[42px]">
                    <ProfilePicture profileImage={postDetails?.postedBy?.profileImage} />
                </div>

                <div className="flex gap-2 items-center justify-center text-xl font-bold lowercase tracking-wider">
                    {postDetails?.postedBy?.userName.replace(/\s+/g, "")}{" "}
                    <GoVerified className="text-blue-400 text-xl" />
                </div>
            </div>
        </Link>
    );
};

export default PostAuthorProfileLink;
