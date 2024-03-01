"use client";

import { useEffect, useState } from "react";
import { getPosts } from "@/app/_utils/api";
import { Video } from "../_models/Video";

const HomePage = () => {
    const [videos, setVideos] = useState<Video[]>([]);

    useEffect(() => {
        const getVideosInit = async () => {
            const result = await getPosts();
            setVideos(result?.data);
        };
        getVideosInit();
    }, []);

    return (
        <div className="flex flex-col gap-10 videos h-full">
            {videos.length ? videos?.map((video: Video) => <div key={video._id}>{video.caption}</div>) : `No Videos`}
        </div>
    );
};

export default HomePage;
