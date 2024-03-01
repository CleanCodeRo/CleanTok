import axios from "axios";
import { apiDomain } from "@/app/_utils/env";

export const apiBaseURL = `${apiDomain}/api`;

const getErrorMessage = (error: any) => {
    if (axios.isAxiosError(error)) {
        console.log("Error message: ", error.message);
        return error.message;
    } else {
        console.log("Unexpected error: ", error);
        return "An unexpected error has occurred.";
    }
};

export const fetchData = async <T,>(endpoint: string): Promise<T | any> => {
    try {
        const response = await axios.get<T>(endpoint);
        return response;
    } catch (error: any) {
        getErrorMessage(error);
    }
};

export const getPosts = async () => {
    const apiString = `${apiBaseURL}/posts`;
    return fetchData(apiString);
};
