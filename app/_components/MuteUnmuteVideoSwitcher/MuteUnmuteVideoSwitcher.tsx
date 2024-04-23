import React, { useEffect, useState } from "react";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";

interface IProps {
    videoRef: React.RefObject<HTMLVideoElement>;
}

const MuteUnmuteVideoSwitcher = ({ videoRef }: IProps) => {
    const [isVideoMuted, setIsVideoMuted] = useState(false);

    useEffect(() => {
        if (videoRef?.current) {
            videoRef.current.muted = isVideoMuted;
        }
    }, [isVideoMuted, videoRef]);

    return isVideoMuted ? (
        <button onClick={() => setIsVideoMuted(false)}>
            <HiVolumeOff className="text-black text-2xl lg:text-4xl" />
        </button>
    ) : (
        <button onClick={() => setIsVideoMuted(true)}>
            <HiVolumeUp className="text-black text-2xl lg:text-4xl" />
        </button>
    );
};

export default MuteUnmuteVideoSwitcher;
