import React, { useState } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";

interface IProps {
    videoRef: React.RefObject<HTMLVideoElement>;
}

const PlayPauseButton = ({ videoRef }: IProps) => {
    const [playing, setPlaying] = useState(false);

    const onVideoPress = () => {
        playing ? videoRef?.current?.pause() : videoRef?.current?.play();
        setPlaying(playing ? false : true);
    };

    return playing ? (
        <button onClick={onVideoPress}>
            <BsFillPauseFill className="text-black text-2xl lg:text-4xl" />
        </button>
    ) : (
        <button onClick={onVideoPress}>
            <BsFillPlayFill className="text-black text-2xl lg:text-4xl" />
        </button>
    );
};

export default PlayPauseButton;
