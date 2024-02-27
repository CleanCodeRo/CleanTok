import Link from "next/link";

export default async function NotFound() {
    return (
        <div className="flex flex-col items-center justify-between w-full text-md lg:flex">
            <h2>Not Found!</h2>
            <p>Could not find requested resource</p>
            <p>
                Try again from the <Link href="/">home page</Link>
            </p>
        </div>
    );
}
