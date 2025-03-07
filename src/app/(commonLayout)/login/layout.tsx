import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Login ‣ PerpoDia",
    description:
        "Login using your Google or GitHub account to access your dashboard and manage your projects and blogs.",
    icons: {
        icon: "/login-favicon.ico",
    },
};

const CommonLayout = ({
    children,
}: Readonly<{ children: React.ReactNode }>) => {
    return <>{children}</>;
};

export default CommonLayout;
