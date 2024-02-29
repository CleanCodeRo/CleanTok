import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { topics } from "@/app/_utils/constants";

const Discover = () => {
    const mappedTopics = topics.map((topic) => (
        <Link key={topic.name} href={`/?topic=${topic.name}`}>
            <div>
                <span className="font-bold text-2xl xl:text-md">{topic.icon}</span>
                <span className="font-medium text-md hidden xl:block">{topic.name}</span>
            </div>
        </Link>
    ));

    return (
        <div className="xl:border-b-2 xl:border-gray-200 pb-6">
            <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">Popular Topics</p>
            <div className="flex gap-3 flex-wrap">{mappedTopics}</div>
        </div>
    );
};

export default Discover;
