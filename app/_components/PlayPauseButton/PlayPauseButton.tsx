import React, { useState } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";

interface IProps {
    playing: boolean;
    onPlayPauseSwitch: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const PlayPauseButton = ({ playing, onPlayPauseSwitch }: IProps) => {
    return playing ? (
        <button onClick={onPlayPauseSwitch}>
            <BsFillPauseFill className="text-black text-4xl lg:text-8xl" />
        </button>
    ) : (
        <button onClick={onPlayPauseSwitch}>
            <BsFillPlayFill className="text-black text-4xl lg:text-8xl" />
        </button>
    );
};

export default PlayPauseButton;
