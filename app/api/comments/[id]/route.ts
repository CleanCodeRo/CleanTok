import { commentQuery } from "@/app/_utils/queries";
import { client } from "@/sanity/lib/client";

interface IParams {
    id: string;
}

export const GET = async (request: Request, { params }: { params: IParams }) => {
    const {id} = params;
    const query = commentQuery(id);
    const data = await client.fetch(query);
    return Response.json(data, { status: 200 });
};
