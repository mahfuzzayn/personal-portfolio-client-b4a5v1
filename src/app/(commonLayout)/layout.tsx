import Header from "@/components/shared/Header";
import React from "react";

const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
};

export default layout;
