import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import React from "react";

const CommonLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
};

export default CommonLayout;
