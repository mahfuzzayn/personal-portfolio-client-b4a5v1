import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Projects ‣ PerpoDia",
    description:
        "Browse through our public projects and explore the work we've done. Get inspired by creative solutions and innovations from various fields.",
    icons: {
        icon: "/projects-favicon.ico",
    },
};

const ProjectsPageLayout = ({
    children,
}: Readonly<{ children: React.ReactNode }>) => {
    return <>{children}</>;
};

export default ProjectsPageLayout;
