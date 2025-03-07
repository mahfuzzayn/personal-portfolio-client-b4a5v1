import type { Metadata } from "next";
import { Reddit_Sans } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "@/components/shared/SessionProviderWrapper";
import ReduxProvider from "@/redux/ReduxProvider";
import ToasterProvider from "@/utils/toaster/ToasterProvider";
import { ThemeProvider } from "@/components/shared/ThemeProvider";

const redditSans = Reddit_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
    title: "Home ‣ PerpoDia",
    description:
        "Welcome to PerpoDia. Explore projects, blogs and ideas. Let's explore something amazing together.",
    icons: {
        icon: "/home-favicon.ico",
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={redditSans.className}>
                <main className="container max-w-[1920px] mx-auto bg-background">
                    <ReduxProvider>
                        <SessionProviderWrapper>
                            <ThemeProvider
                                attribute="class"
                                defaultTheme="light"
                                enableSystem
                                disableTransitionOnChange
                            >
                                {children}
                            </ThemeProvider>
                            <ToasterProvider />
                        </SessionProviderWrapper>
                    </ReduxProvider>
                </main>
            </body>
        </html>
    );
}
