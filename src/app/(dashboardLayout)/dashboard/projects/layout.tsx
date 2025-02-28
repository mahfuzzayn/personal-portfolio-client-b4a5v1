import { Metadata } from "next";;
import React from "react";

export const metadata: Metadata = {
    title: "Blogs ‣ Dashboard ‣ Personal Portfolio",
}

const DashboardBlogsLayout = ({
    children,
}: Readonly<{ children: React.ReactNode }>) => {
    return (
        <>
            {children}
        </>
    );
};

export default DashboardBlogsLayout;
