import { blogParams } from "@/types";
import React from "react";

export const generateMetadata = async ({ params }: blogParams) => {
    const { blogId } = await params;
    const res = await fetch(`${process.env.BACKEND_URL}/blogs/${blogId}`);

    const { data: blogData } = await res.json();

    return {
        title: `Update ‣ ${
            blogData?.title ? blogData?.title : "404"
        } ‣ Blog ‣ PerpoDia`,
        description:
            "Edit and update your existing blog post. Modify the content, title, or tags to keep your blog fresh and engaging.",
    };
};

const UpdateBlogPageLayout = ({
    children,
}: Readonly<{ children: React.ReactNode }>) => {
    return <>{children}</>;
};

export default UpdateBlogPageLayout;
