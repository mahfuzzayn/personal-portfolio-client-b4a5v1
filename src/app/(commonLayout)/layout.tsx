import Header from "@/components/shared/Header";
import React from "react";

const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <main>
            <Header />
            {children}
        </main>
    );
};

export default layout;
