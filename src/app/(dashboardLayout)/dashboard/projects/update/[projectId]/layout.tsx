import { projectParams } from "@/types";
import React from "react";

export const generateMetadata = async ({ params }: projectParams) => {
    const { projectId } = await params;
    const res = await fetch(`${process.env.BACKEND_URL}/projects/${projectId}`);

    const { data: projectData } = await res.json();

    return {
        title: `Update ‣ ${
            projectData?.title ? projectData?.title : "404"
        } ‣ Project ‣ PerpoDia`,
        description:
            "Edit and update your project's information. Modify project details, progress, and more to keep your project up-to-date and aligned with your goals.",
    };
};

const UpdateProjectPageLayout = ({
    children,
}: Readonly<{ children: React.ReactNode }>) => {
    return <>{children}</>;
};

export default UpdateProjectPageLayout;
