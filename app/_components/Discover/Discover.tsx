import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { topics } from "@/app/_utils/constants";

const Discover = () => {
    const searchParams = useSearchParams();
    const initialTopicFromQuery = searchParams.get("topic");
    const [topicFromQuery, setTopicFromQuery] = useState<string | null>(initialTopicFromQuery);

    const topicStyle =
        "xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black";
    const activeTopicStyle =
        "xl:border-2 hover:bg-primary xl:border-[#004AAD] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#004AAD]";

    const topicStyles = (isActive: boolean) => (isActive ? activeTopicStyle : topicStyle);

    useEffect(() => {
        setTopicFromQuery(searchParams.get("topic"));
    }, [searchParams]);

    const mappedTopics = topics.map((topic) => (
        <Link key={topic.name} href={`/?topic=${topic.name}`}>
            <div className={topicStyles(topicFromQuery === topic.name)}>
                <span className="font-bold text-2xl xl:text-md">{topic.icon}</span>
                <span className="font-medium text-md hidden xl:block">{topic.name}</span>
            </div>
        </Link>
    ));

    return (
        <>
            <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">Popular Topics</p>
            <div className="flex gap-3 flex-wrap justify-center xl:justify-normal">{mappedTopics}</div>
        </>
    );
};

export default Discover;
