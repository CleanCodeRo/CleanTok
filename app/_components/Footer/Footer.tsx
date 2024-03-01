import React from "react";
import { footerList1, footerList2, footerList3 } from "@/app/_utils/constants";
import Link from "next/link";

interface FooterItemsListProps {
    items: string[];
    mt: boolean;
}

const FooterItemsList = ({ items, mt }: FooterItemsListProps) => (
    <div className={`flex flex-wrap gap-2 ${mt && "mt-5"}`}>
        {items.map((item: string) => (
            <p key={item} className="text-gray-400 text-sm hover:underline cursor-pointer">
                {item}
            </p>
        ))}
    </div>
);

const Footer = () => {
    return (
        <div className="mt-6 hidden xl:block">
            <FooterItemsList items={footerList1} mt={false} />
            <FooterItemsList items={footerList2} mt />
            <FooterItemsList items={footerList3} mt />
            <p className="text-gray-400 text-sm mt-5">© 2024 <Link href="https://cleancode.ro/">CleanCode.ro</Link></p>
        </div>
    );
};

export default Footer;
