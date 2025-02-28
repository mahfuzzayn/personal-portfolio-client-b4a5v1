import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Contact ‣ Personal Portfolio",
};

const BlogsPageLayout = ({
    children,
}: Readonly<{ children: React.ReactNode }>) => {
    return <>{children}</>;
};

export default BlogsPageLayout;
