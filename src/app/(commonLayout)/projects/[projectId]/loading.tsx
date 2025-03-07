import { Spinner } from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const ProjectDetailLoadingPage = () => {
    return (
        <>
            <section className="min-h-screen pt-10 pb-20">
                <div className="m-10">
                    <Link href="/projects">
                        <Button className="bg-accent text-white hover:!bg-accent">
                            <ArrowLeft />
                            Projects
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

export default ProjectDetailLoadingPage;
