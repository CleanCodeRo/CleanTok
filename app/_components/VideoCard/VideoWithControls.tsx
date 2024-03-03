import React, { useState } from "react";
import PlayPauseButton from "@/app/_components/VideoCard/PlayPauseButton";
import MuteUnmuteVideoSwitcher from "@/app/_components/VideoCard/MuteUnmuteVideoSwitcher";

interface IProps {
    videoClasses?: string;
    videoSource?: string;
    videoRef: React.RefObject<HTMLVideoElement>;
}

const VideoWithControls = ({ videoSource, videoRef, videoClasses }: IProps) => {
    const [playing, setPlaying] = useState(false);
    const [isHover, setIsHover] = useState(false);

    const onPlayPauseSwitch = () => {
        playing ? videoRef?.current?.pause() : videoRef?.current?.play();
        setPlaying(playing ? false : true);
    };

    return (
        <div className="relative w-full h-full" onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            <video className={videoClasses} src={videoSource} onClick={onPlayPauseSwitch} ref={videoRef} loop></video>

            {isHover && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                    <PlayPauseButton playing={playing} onPlayPauseSwitch={onPlayPauseSwitch} />
                </div>
            )}

            <div className="absolute bottom-5 lg:bottom-5 right-5 md:right-5 cursor-pointer">
                <MuteUnmuteVideoSwitcher videoRef={videoRef} />
            </div>
        </div>
    );
};

export default VideoWithControls;
