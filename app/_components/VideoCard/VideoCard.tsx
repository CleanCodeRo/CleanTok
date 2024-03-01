import React from "react";
import { Video } from "@/app/_utils/interfaces";
import DefaultVersion from "./DefaultVersion";
import HomeVersion from "./HomeVersion";

interface IProps {
    post: Video;
    isShowingOnHome?: boolean;
}

const VideoCard = ({ post, isShowingOnHome }: IProps) => {
    return isShowingOnHome ? <HomeVersion post={post} /> : <DefaultVersion post={post} />;
};

export default VideoCard;
