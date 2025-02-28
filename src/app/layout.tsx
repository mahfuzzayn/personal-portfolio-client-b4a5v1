import type { Metadata } from "next";
import { Reddit_Sans } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "@/components/shared/SessionProviderWrapper";
import ReduxProvider from "@/redux/ReduxProvider";
import ToasterProvider from "@/utils/toaster/ToasterProvider";

const redditSans = Reddit_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "Home ‣ Personal Portfolio",
    description:
        "Welcome to personal portfolio. Explore works, projects, and ideas. Let's explore something amazing together.",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={redditSans.className}>
                <main className="container max-w-[1920px] mx-auto bg-primary">
                    <ReduxProvider>
                        <SessionProviderWrapper>
                            {children} <ToasterProvider />
                        </SessionProviderWrapper>
                    </ReduxProvider>
                </main>
            </body>
        </html>
    );
}
