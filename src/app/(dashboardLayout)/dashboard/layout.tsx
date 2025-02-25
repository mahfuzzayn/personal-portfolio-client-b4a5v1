import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const DashboardLayout = ({
    children,
}: Readonly<{ children: React.ReactNode }>) => {
    return (
        <section className="w-full">
            <div className="relative">
                <SidebarTrigger
                    className="p-4 bg-muted absolute top-[42px] rounded-l-none"
                    size="lg"
                    title="Open Drawer"
                />
            </div>
            {children}
        </section>
    );
};

export default DashboardLayout;
