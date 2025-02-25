import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Create Blog ‣ Dashboard ‣ Personal Portfolio"
}

const BlogsPageLayout = ({
    children,
}: Readonly<{ children: React.ReactNode }>) => {
    return <>{children}</>;
};

export default BlogsPageLayout;
