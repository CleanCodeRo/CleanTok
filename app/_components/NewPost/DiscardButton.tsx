import React from "react";

type Props = {
    handleDiscard: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const DiscardButton = ({ handleDiscard }: Props) => {
    return (
        <button
            onClick={handleDiscard}
            type="button"
            className="border-red-300 hover:border-red-400 border-2 text-md font-medium p-2 rounded w-28 outline-none"
        >
            Discard
        </button>
    );
};

export default DiscardButton;
