import React from "react";

export const generateMetadata = async ({
    params,
}: {
    params: { projectId: string };
}) => {
    const res = await fetch(
        `${process.env.BACKEND_URL}/projects/${params.projectId}`
    );

    const { data: projectData } = await res.json();

    return {
        title: `Update ‣ ${
            projectData?.title ? projectData?.title : "404"
        } ‣ Project ‣ Personal Portfolio`,
    };
};

const UpdateProjectPageLayout = ({
    children,
}: {
    children: Readonly<{ children: React.ReactNode }>;
}) => {
    return <>{children}</>;
};

export default UpdateProjectPageLayout;
