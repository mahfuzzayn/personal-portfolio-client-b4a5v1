import React from "react";

export const generateMetadata = async ({
    params,
}: {
    params: { blogId: string };
}) => {
    const res = await fetch(
        `${process.env.BACKEND_URL}/blogs/${params.blogId}`
    );

    const { data: blogData } = await res.json();

    return { title: `Update ‣ ${blogData?.title} ‣ Blog ‣ Personal Portfolio` };
};

const UpdateBlogPageLayout = ({
    children,
}: {
    children: Readonly<{ children: React.ReactNode }>;
}) => {
    return <>{children}</>;
};

export default UpdateBlogPageLayout;
