import React from "react";

type Props = {};

const NoComments = (props: Props) => {
    return (
        <div className="no-comments flex flex-col lg:pl-10 items-center">
            <div className="mb-1 xl:mb-2 text-xl xl:text-2xl font-bold">No comments yet.</div>
            <div className="mt-1 xl:mt-2 text-xs xl:text-sm">Start the conversation.</div>
        </div>
    );
};

export default NoComments;
