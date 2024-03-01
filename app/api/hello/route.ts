export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    return Response.json({ message: "Hello to the CleanTok's API!" }, { status: 200 });
}
