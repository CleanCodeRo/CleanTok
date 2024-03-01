export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    return new Response("Hello to the CleanTok's API!", {
        status: 200,
    });
}
