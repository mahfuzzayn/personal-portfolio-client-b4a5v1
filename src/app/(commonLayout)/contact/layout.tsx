import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Contact ‣ PerpoDia",
    description:
        "Reach out to us with any questions, feedback, or inquiries. We're here to help and will respond to your message as soon as possible. Your thoughts matter to us!",
    icons: {
        icon: "/contact-favicon.ico",
    },
};

const ContactPageLayout = ({
    children,
}: Readonly<{ children: React.ReactNode }>) => {
    return <>{children}</>;
};

export default ContactPageLayout;
