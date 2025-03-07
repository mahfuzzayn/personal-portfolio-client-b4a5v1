import { Spinner } from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const BlogDetailLoadingPage = () => {
    return (
        <>
            <section className="min-h-screen pt-10 pb-20">
                <div className="m-10">
                    <Link href="/blogs">
                        <Button className="bg-accent text-white hover:!bg-accent">
                            <ArrowLeft />
                            Blogs
                        </Button>
                    </Link>
                </div>
                <section className="mt-40 flex justify-center items-center">
                    <Spinner />
                </section>
            </section>
        </>
    );
};

export default BlogDetailLoadingPage;
