import { client } from "@/sanity/lib/client";

export const POST = async (request: Request, response: Response) => {
    try {
        const data = await request.json();

        client.createIfNotExists(data);

        return Response.json("Login successful");
    } catch (error: any) {
        console.log("Unexpected error: ", error);
        return "An unexpected error has occurred.";
    }
};
