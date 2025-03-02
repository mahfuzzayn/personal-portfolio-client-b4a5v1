import { Metadata } from "next";;
import React from "react";

export const metadata: Metadata = {
    title: "Projects ‣ Dashboard ‣ Personal Portfolio",
}

const DashboardProjectsLayout = ({
    children,
}: Readonly<{ children: React.ReactNode }>) => {
    return (
        <>
            {children}
        </>
    );
};

export default DashboardProjectsLayout;
