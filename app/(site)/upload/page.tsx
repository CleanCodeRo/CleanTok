"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SanityAssetDocument } from "@sanity/client";
import { AiOutlineLoading } from "react-icons/ai";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdError } from "react-icons/md";

import useAuthStore from "@/app/_store/authStore";
import { client } from "@/sanity/lib/client";
import { topics } from "@/app/_utils/constants";
import { uploadPost } from "@/app/_utils/api";
import { IUser } from "@/app/_utils/interfaces";
import Spinner from "@/app/_components/Spinner/Spinner";

interface IProps {}

const PostUpload = (props: IProps) => {
    const router = useRouter();
    const { userProfile } = useAuthStore();
    const [user, setUser] = useState<IUser | null>();

    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [savingPost, setSavingPost] = useState<Boolean>(false);
    const [wrongFileType, setWrongFileType] = useState<Boolean>(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<Boolean>(false);

    const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>();

    const [caption, setCaption] = useState("");
    const [topic, setTopic] = useState<String>(topics[0].name);

    useEffect(() => {
        if (userProfile === null) {
            setIsUserLoggedIn(false);
            router.push("/");
        } else {
            setUser(userProfile);
            setIsUserLoggedIn(true);
        }
    }, [userProfile, router]);

    const uploadVideo = async (event: any) => {
        const selectedFile = event.target.files[0];
        const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

        const isCorrectFileType = fileTypes.includes(selectedFile.type);

        if (isCorrectFileType) {
            setIsLoading(true);
            setWrongFileType(false);

            client.assets
                .upload("file", selectedFile, {
                    contentType: selectedFile.type,
                    filename: selectedFile.name,
                })
                .then((data) => {
                    setVideoAsset(data);
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
            setWrongFileType(true);
        }
    };

    const handlePostUpload = async () => {
        if (userProfile !== null && caption && videoAsset?._id && topic) {
            setSavingPost(true);

            const post = {
                _type: "post",
                caption,
                video: {
                    _type: "file",
                    asset: {
                        _type: "reference",
                        _ref: videoAsset?._id,
                    },
                },
                userId: user?._id,
                postedBy: {
                    _type: "postedBy",
                    _ref: user?._id,
                },
                topic,
            };

            await uploadPost(post);

            router.push("/");
        }
    };

    const handleDiscard = () => {
        setSavingPost(false);
        setVideoAsset(undefined);
        setCaption("");
        setTopic("");
    };

    return isUserLoggedIn ? (
        <div className="flex w-full h-full mb-5 bg-[#F8F8F8] justify-center">
            <div className="bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-center items-center p-6">
                <div>
                    <div>
                        <p className="text-2xl font-bold">Upload Video</p>
                        <p className="text-md text-gray-400 mt-1">Post a video to your account</p>
                    </div>

                    {wrongFileType && (
                        <div
                            className="bg-red-100 border-t-4 border-red-500 rounded-b text-teal-900 px-4 py-3 shadow-md mt-4 w-full"
                            role="alert"
                        >
                            <div className="flex">
                                <div className="py-1">
                                    <MdError className="fill-current h-6 w-6 text-red-500 mr-4" />
                                </div>
                                <div>
                                    <p className="font-bold">The file could not be uploaded</p>
                                    <p className="text-sm">
                                        Only files with the following extensions are allowed:{" "}
                                        <span className="italic">mp4 webm ogg</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="group border-dashed rounded-xl border-4 border-gray-300 hover:border-[#004AAD] flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[458px] p-10 cursor-pointer hover:bg-gray-100">
                        {isLoading ? (
                            <>
                                <AiOutlineLoading className="text-3xl loading-icon text-[#004AAD]" />
                                <br />
                                <p className="text-center text-3xl text-[#004AAD] font-semibold">Uploading...</p>
                            </>
                        ) : (
                            <div>
                                {videoAsset ? (
                                    <div className="rounded-3xl w-[300px] p-4 flex flex-col gap-6 justify-center items-center">
                                        <video
                                            className="rounded-xl h-[462px] bg-black"
                                            controls
                                            loop
                                            src={videoAsset?.url}
                                        />
                                    </div>
                                ) : (
                                    <label className="cursor-pointer">
                                        <div className="flex flex-col items-center justify-center h-full">
                                            <div className="flex flex-col justify-center items-center">
                                                <p className="font-bold text-xl">
                                                    <FaCloudUploadAlt className="text-gray-400 group-hover:text-[#004AAD] text-6xl" />
                                                </p>
                                                <p className="text-xl text-center text-gray-400 group-hover:text-black font-normal group-hover:font-semibold">
                                                    Upload video
                                                </p>
                                            </div>

                                            <p className="flex flex-col text-gray-400 text-center mt-10 text-sm leading-10">
                                                <span>MP4 or WebM or ogg</span>
                                                <span>720x1280 resolution or higher</span>
                                                <span>Up to 10 minutes</span>
                                                <span>Less than 2 GB</span>
                                            </p>

                                            <p className="bg-gray-400 group-hover:bg-[#004AAD] text-center mt-8 rounded text-white text-md font-medium p-2 w-52 outline-none">
                                                Select file
                                            </p>

                                            <input
                                                type="file"
                                                name="upload-video"
                                                onChange={uploadVideo}
                                                className="w-0 h-0"
                                            />
                                        </div>
                                    </label>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-3 pb-10">
                    <label className="text-md font-medium ">Caption</label>
                    <input
                        type="text"
                        value={caption}
                        onChange={(event) => setCaption(event.target.value)}
                        className="rounded outline-none text-md border-2 border-gray-200 p-2"
                    />

                    <label className="text-md font-medium ">Topic</label>
                    <select
                        onChange={(event) => {
                            setTopic(event.target.value);
                        }}
                        className="outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer"
                    >
                        {topics.map((item) => (
                            <option
                                key={item.name}
                                className=" outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300"
                                value={item.name}
                            >
                                {item.name}
                            </option>
                        ))}
                    </select>

                    <div className="flex gap-6 mt-10">
                        <button
                            onClick={handleDiscard}
                            type="button"
                            className="border-red-300 hover:border-red-400 border-2 text-md font-medium p-2 rounded w-28 outline-none"
                        >
                            Discard
                        </button>

                        <button
                            disabled={videoAsset?.url ? false : true}
                            onClick={handlePostUpload}
                            type="button"
                            className="bg-gray-300 enabled:hover:bg-blue-700 enabled:bg-blue-800 text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
                        >
                            {savingPost ? "Posting..." : "Post"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <Spinner />
    );
};

export default PostUpload;
