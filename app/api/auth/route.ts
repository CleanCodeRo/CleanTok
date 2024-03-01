import { client } from "@/sanity/lib/client";

export const POST = async (request: Request, response: Response) => {
    try {
        const data = await request.json();

        client.createIfNotExists(data);

        return Response.json("Login successful");
    } catch (error: any) {
        return Response.json(`Unexpected error: ${error}`);
    }
};
