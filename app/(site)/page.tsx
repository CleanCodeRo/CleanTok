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
    }, []);

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col gap-10 videos max-w-[470px] h-full w-full break-all">
                {isLoading ? (
                    <Spinner />
                ) : videos?.length ? (
                    videos?.map((video: Video) => <VideoCard key={video._id} post={video} isShowingOnHome />)
                ) : (
                    <NoResults text={`No Videos`} />
                )}
            </div>
        </div>
    );
};

export default HomePage;
