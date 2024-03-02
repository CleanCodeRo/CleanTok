"use client";

import React, { useState } from "react";
import { SanityAssetDocument } from "@sanity/client";
import { FaCloudUploadAlt } from "react-icons/fa";

import { client } from "@/sanity/lib/client";

interface IProps {}

const PostUpload = (props: IProps) => {
    const [isLoading, setIsLoading] = useState<Boolean>(false);
    const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>();
    const [wrongFileType, setWrongFileType] = useState<Boolean>(false);

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

    return (
        <div className="flex w-full h-full">
            <div className=" bg-white rounded-lg">
                <div>
                    <div>
                        <p className="text-2xl font-bold">Upload Video</p>
                        <p className="text-md text-gray-400 mt-1">Post a video to your account</p>
                    </div>

                    <div className="group border-dashed rounded-xl border-4 border-gray-300 hover:border-[#004AAD] flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[458px] p-10 cursor-pointer hover:bg-gray-100">
                        {isLoading ? (
                            <p className="text-center text-3xl text-[#004AAD] font-semibold">Uploading...</p>
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
            </div>
        </div>
    );
};

export default PostUpload;
