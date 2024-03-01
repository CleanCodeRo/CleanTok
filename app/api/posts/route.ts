import { allPostsQuery } from "@/app/_utils/queries";
import { client } from "@/sanity/lib/client";

export const GET = async (request: Request) => {
    const query = allPostsQuery();
    const data = await client.fetch(query);
    return Response.json(data, { status: 200 });
};
