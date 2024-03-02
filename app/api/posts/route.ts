import { allPostsQuery } from "@/app/_utils/queries";
import { client } from "@/sanity/lib/client";

export const GET = async (request: Request) => {
    const query = allPostsQuery();
    const data = await client.fetch(query);
    return Response.json(data, { status: 200 });
};

export const POST = async (request: Request) => {
    try {
        const data = await request.json();

        client.create(data);

        return Response.json("Post created successfully");
    } catch (error: any) {
        return Response.json(`Unexpected error: ${error}`);
    }
};