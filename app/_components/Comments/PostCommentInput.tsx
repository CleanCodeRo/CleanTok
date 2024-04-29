import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MdSend } from "react-icons/md";

import useAuthStore from "@/app/_store/authStore";
import { getComment, uploadComment } from "@/app/_utils/api";
import { IComment, IUser } from "@/app/_utils/interfaces";
import useGeneralStore from "@/app/_store/generalStore";

type Props = {
    postID: string | string[];
    postRelatedComments: IComment[];
    setPostRelatedComments: React.Dispatch<React.SetStateAction<IComment[]>>;
    isTextAreaDisabled?: boolean;
};

const PostCommentInput = ({ postID, postRelatedComments, setPostRelatedComments, isTextAreaDisabled }: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const { userProfile } = useAuthStore();
    const { setCloseHref } = useGeneralStore();
    const [commentText, setCommentText] = useState<string>();
    const [user, setUser] = useState<IUser | null>();

    useEffect(() => {
        setUser(userProfile);
    }, [userProfile]);

    const handleCommentUpload = async () => {
        if (isTextAreaDisabled) {
            setCloseHref(pathname);
            router.push("/login");
        } else {
            if (commentText && commentText.length > 3) {
                const newComment = {
                    _type: "comment",
                    commentText,
                    postedBy: {
                        _type: "postedBy",
                        _ref: user?._id,
                    },
                    parentPost: {
                        _ref: postID,
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
            }
        }
    };

    return (
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
                            disabled={isTextAreaDisabled}
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
    );
};

export default PostCommentInput;
