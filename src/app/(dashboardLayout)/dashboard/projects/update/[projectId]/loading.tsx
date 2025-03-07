import { Spinner } from "@/components/shared/Spinner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const UpdateProjectLoadingPage = () => {
    return (
        <>
            <div className="flex flex-col md:flex-row justify-start items-start gap-x-5 gap-y-4 m-10">
                <Link href="/dashboard/projects">
                    <Button className="bg-accent text-white hover:!bg-accent">
                        <ArrowLeft />
                        Projects
                    </Button>
                </Link>
            </div>
            <div className="flex gap-y-5 min-h-screen text-white justify-center items-center text-center mx-5">
                <Spinner />
            </div>
        </>
    );
};

export default UpdateProjectLoadingPage;
