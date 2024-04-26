"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SanityAssetDocument } from "@sanity/client";
import { AiOutlineLoading } from "react-icons/ai";

import useAuthStore from "@/app/_store/authStore";
import { client } from "@/sanity/lib/client";
import { topics } from "@/app/_utils/constants";
import { uploadPost } from "@/app/_utils/api";
import { IUser } from "@/app/_utils/interfaces";
import Spinner from "@/app/_components/Spinner/Spinner";
import DiscardButton from "@/app/_components/NewPost/DiscardButton";
import SubmitButton from "@/app/_components/NewPost/SubmitButton";
import InputField from "@/app/_components/NewPost/InputField";
import SelectField from "@/app/_components/NewPost/SelectField";
import VideoUpload from "@/app/_components/NewPost/VideoUpload";
import ErrorAlert from "@/app/_components/NewPost/ErrorAlert";

interface IProps {}

const PostUpload = (props: IProps) => {
    const router = useRouter();
    const { userProfile } = useAuthStore();
    const [user, setUser] = useState<IUser | null>();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [savingPost, setSavingPost] = useState<boolean>(false);
    const [wrongFileType, setWrongFileType] = useState<boolean>(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

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
                        <ErrorAlert
                            alertLabelText={"The file could not be uploaded"}
                            alertBodyText={
                                <>
                                    Only files with the following extensions are allowed:{" "}
                                    <span className="italic">mp4 webm ogg</span>
                                </>
                            }
                        />
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
                                    <VideoUpload changeHandler={uploadVideo} />
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-3 pb-10">
                    <InputField
                        labelText={"Caption"}
                        inputValue={caption}
                        inputType={"text"}
                        changeHandler={(event) => setCaption(event.target.value)}
                    />

                    <SelectField
                        labelText={"Topic"}
                        optionValues={topics}
                        changeHandler={(event) => {
                            setTopic(event.target.value);
                        }}
                    />

                    <div className="flex gap-6 mt-10">
                        <DiscardButton handleDiscard={handleDiscard} />
                        <SubmitButton
                            isDisabled={videoAsset?.url ? false : true}
                            clickHandler={handlePostUpload}
                            isSubmitting={savingPost}
                        />
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <Spinner />
    );
};

export default PostUpload;
