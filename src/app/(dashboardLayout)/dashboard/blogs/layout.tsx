import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Blogs ‣ Dashboard ‣ PerpoDia",
    description:
        "Explore and manage your blog posts in the dashboard. View, edit, and organize your blogs with ease. Create new insightful content or update existing blogs to keep your portfolio fresh.",
};

const DashboardBlogsLayout = ({
    children,
}: Readonly<{ children: React.ReactNode }>) => {
    return <>{children}</>;
};

export default DashboardBlogsLayout;
