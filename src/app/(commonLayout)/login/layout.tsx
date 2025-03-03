import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Login ‣ Personal Portfolio",
};

const CommonLayout = ({
    children,
}: Readonly<{ children: React.ReactNode }>) => {
    return <>{children}</>;
};

export default CommonLayout;
