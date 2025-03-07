/* eslint-disable react/no-unescaped-entities */
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const NotFoundPage = async () => {
    return (
        <>
            <Header />
            <section className="min-h-screen flex flex-col justify-center items-center gap-y-6 mx-5">
                <h2 className="text-foreground text-6xl md:text-7xl font-extrabold">
                    <span className="text-destructive">4</span>0
                    <span className="text-destructive">4</span>
                </h2>
                <h2 className="text-foreground max-w-2xl text-center text-md sm:text-lg md:text-xl font-semibold">
                    Oops! The page you're looking for doesn't exist. But don't
                    worry, you can always find your way back home.
                </h2>
                <Link href="/">
                    <Button className="bg-secondary text-primary hover:bg-secondary">
                        <ArrowLeft /> Back to Home
                    </Button>
                </Link>
            </section>
            <Footer />
        </>
    );
};

export default NotFoundPage;
