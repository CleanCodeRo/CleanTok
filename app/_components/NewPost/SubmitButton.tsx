import React from "react";

type Props = {
    isDisabled: boolean;
    clickHandler: React.MouseEventHandler<HTMLButtonElement> | undefined;
    isSubmitting: boolean;
};

const SubmitButton = ({ isDisabled, clickHandler, isSubmitting }: Props) => {
    return (
        <button
            disabled={isDisabled}
            onClick={clickHandler}
            type="button"
            className="bg-gray-300 enabled:hover:bg-blue-700 enabled:bg-blue-800 text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
        >
            {isSubmitting ? "Posting..." : "Post"}
        </button>
    );
};

export default SubmitButton;
