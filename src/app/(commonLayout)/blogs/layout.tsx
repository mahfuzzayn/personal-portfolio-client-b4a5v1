import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Blogs ‣ PerpoDia",
    description:
        "Explore our collection of insightful blogs, where we share knowledge, ideas, and stories from various domains. Stay informed and inspired!",
    icons: {
        icon: "/blogs-favicon.ico",
    },
};

const BlogsPageLayout = ({
    children,
}: Readonly<{ children: React.ReactNode }>) => {
    return <>{children}</>;
};

export default BlogsPageLayout;
