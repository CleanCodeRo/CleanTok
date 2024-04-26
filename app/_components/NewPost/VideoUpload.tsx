import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

type Props = {
    changeHandler: React.ChangeEventHandler<HTMLInputElement> | undefined;
};

const VideoUpload = ({ changeHandler }: Props) => {
    return (
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

                <input type="file" name="upload-video" onChange={changeHandler} className="w-0 h-0" />
            </div>
        </label>
    );
};

export default VideoUpload;
