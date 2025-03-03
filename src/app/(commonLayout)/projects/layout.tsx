import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Projects ‣ Personal Portfolio",
};

const ProjectsPageLayout = ({
    children,
}: Readonly<{ children: React.ReactNode }>) => {
    return <>{children}</>;
};

export default ProjectsPageLayout;
