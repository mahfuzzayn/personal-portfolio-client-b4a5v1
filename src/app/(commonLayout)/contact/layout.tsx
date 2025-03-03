import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Contact ‣ Personal Portfolio",
};

const ContactPageLayout = ({
    children,
}: Readonly<{ children: React.ReactNode }>) => {
    return <>{children}</>;
};

export default ContactPageLayout;
