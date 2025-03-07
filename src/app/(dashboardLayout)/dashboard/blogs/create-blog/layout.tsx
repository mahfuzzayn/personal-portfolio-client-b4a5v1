import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Create Blog ‣ Dashboard ‣ PerpoDia",
    description:
        "Create a new blog post in your dashboard. Share your ideas, insights, and projects with the world by writing engaging blog posts. Start crafting your next great article today!",
};

const CreateBlogPageLayout = ({
    children,
}: Readonly<{ children: React.ReactNode }>) => {
    return <>{children}</>;
};

export default CreateBlogPageLayout;
