import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Create Project ‣ Dashboard ‣ PerpoDia",
    description:
        "Create a new project by providing essential details. Easily create and set up your project with just a few steps and bring your ideas to life.",
};

const ProjectsPageLayout = ({
    children,
}: Readonly<{ children: React.ReactNode }>) => {
    return <>{children}</>;
};

export default ProjectsPageLayout;
