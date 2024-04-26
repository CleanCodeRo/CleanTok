import { allCommentsQuery } from "@/app/_utils/queries";
import { client } from "@/sanity/lib/client";

export const GET = async (request: Request) => {
    const query = allCommentsQuery();
    const data = await client.fetch(query);
    return Response.json(data, { status: 200 });
};

export const POST = async (request: Request) => {
    try {
        const data = await request.json();

        const createdData = await client.create(data);

        return Response.json(createdData, { status: 200 });
    } catch (error: any) {
        return Response.json(`Unexpected error: ${error}`);
    }
};