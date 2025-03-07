import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Projects ‣ Dashboard ‣ PerpoDia",
    description:
        "View, manage, and track all your projects. Create new projects, edit existing ones, and monitor project progress from this central hub.",
};

const DashboardProjectsLayout = ({
    children,
}: Readonly<{ children: React.ReactNode }>) => {
    return <>{children}</>;
};

export default DashboardProjectsLayout;
