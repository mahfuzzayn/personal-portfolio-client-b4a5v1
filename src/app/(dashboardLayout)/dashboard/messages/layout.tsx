import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Messages ‣ Dashboard ‣ PerpoDia",
    description:
        "Manage your messages and stay connected with users. View your messages in one place.",
};

const DashboardBlogsLayout = ({
    children,
}: Readonly<{ children: React.ReactNode }>) => {
    return <>{children}</>;
};

export default DashboardBlogsLayout;
