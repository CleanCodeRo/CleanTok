"use client";

import { useEffect, useState } from "react";
import { getPosts } from "@/app/_utils/api";
import { Video } from "../_utils/interfaces";
import NoResults from "../_components/NoResults/NoResults";
import VideoCard from "../_components/VideoCard/VideoCard";

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
            {videos.length ? (
                videos?.map((video: Video) => <VideoCard key={video._id} post={video} />)
            ) : (
                <NoResults text={`No Videos`} />
            )}
        </div>
    );
};

export default HomePage;
