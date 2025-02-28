import type { Metadata } from "next";
import SessionProviderWrapper from "@/components/shared/SessionProviderWrapper";
import PPSidebar from "@/components/shared/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export const metadata: Metadata = {
    title: "Dashboard ‣ Personal Portfolio",
    description:
        "Welcome to personal portfolio. Explore works, projects, and ideas. Let's explore something amazing together.",
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
                    <PPSidebar />
                    {children}
                </SidebarProvider>
            </SessionProviderWrapper>
        </>
    );
}
