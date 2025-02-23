import type { Metadata } from "next";
import SessionProviderWrapper from "@/components/shared/SessionProviderWrapper";

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
        <main className="container max-w-[1920px] mx-auto bg-primary">
            <SessionProviderWrapper>{children}</SessionProviderWrapper>
        </main>
    );
}
