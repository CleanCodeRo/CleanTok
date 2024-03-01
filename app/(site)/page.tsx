"use client";

import { useEffect, useState } from "react";
import { getPosts } from "@/app/_utils/api";
import { Video } from "../_utils/interfaces";
import NoResults from "../_components/NoResults/NoResults";
import VideoCard from "../_components/VideoCard/VideoCard";
import Spinner from "../_components/Spinner/Spinner";

const HomePage = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const getVideosInit = async () => {
            const result: any = await getPosts();
            setVideos(result?.data);
            setIsLoading(false);
        };
        getVideosInit();
    }, [videos]);

    return (
        <div className="flex flex-col gap-10 videos h-full">
            {isLoading ? (
                <Spinner />
            ) : videos?.length ? (
                videos?.map((video: Video) => <VideoCard key={video._id} post={video} />)
            ) : (
                <NoResults text={`No Videos`} />
            )}
        </div>
    );
};

export default HomePage;
