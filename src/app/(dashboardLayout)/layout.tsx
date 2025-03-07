import type { Metadata } from "next";
import SessionProviderWrapper from "@/components/shared/SessionProviderWrapper";
import PPSidebar from "@/components/shared/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
    title: "Dashboard ‣ PerpoDia",
    description:
        "Manage your projects, blogs and messages effortlessly. Create new content, update existing projects, and organize your portfolio efficiently.",
    icons: {
        icon: "/dashboard-favicon.ico",
    },
};

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <SessionProviderWrapper>
                <SidebarProvider>
                    <TooltipProvider>
                        <PPSidebar />
                        {children}
                    </TooltipProvider>
                </SidebarProvider>
                <Footer />
            </SessionProviderWrapper>
        </>
    );
}
