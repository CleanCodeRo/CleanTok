import React from "react";
import { MdError } from "react-icons/md";

type Props = {
    alertLabelText: string;
    alertBodyText: any;
};

const ErrorAlert = ({ alertLabelText, alertBodyText}: Props) => {
    return (
        <div
            className="bg-red-100 border-t-4 border-red-500 rounded-b text-teal-900 px-4 py-3 shadow-md mt-4 w-full"
            role="alert"
        >
            <div className="flex">
                <div className="py-1">
                    <MdError className="fill-current h-6 w-6 text-red-500 mr-4" />
                </div>
                <div>
                    <p className="font-bold">{alertLabelText}</p>
                    <p className="text-sm">{alertBodyText}</p>
                </div>
            </div>
        </div>
    );
};

export default ErrorAlert;
