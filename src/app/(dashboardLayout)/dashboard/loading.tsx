import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    ArrowLeft,
    BookIcon,
    InboxIcon,
    MessageSquareIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const DashboardLoadingPage = async () => {
    return (
        <section className="w-full">
            <div className="m-10">
                <Link href="/">
                    <Button className="bg-accent text-white hover:!bg-accent">
                        <ArrowLeft />
                        Back to Home
                    </Button>
                </Link>
            </div>
            <div className="m-10">
                <h2 className="text-4xl text-white font-semibold">Dashboard</h2>
                <div className="w-full max-w-[1280px] mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <div className="bg-muted text-white p-4 rounded-md">
                        <h2 className="text-xl mb-2">Total Blogs</h2>
                        <div className="flex items-center gap-x-2 font-semibold">
                            <BookIcon className="h-7 w-7" />
                            <Skeleton className="h-8 w-full !bg-secondary" />
                        </div>
                    </div>
                    <div className="bg-muted text-white p-4 rounded-md">
                        <h2 className="text-xl mb-2">Total Projects</h2>
                        <div className="flex items-center gap-x-2 font-semibold">
                            <InboxIcon className="h-7 w-7" />
                            <Skeleton className="h-8 w-full !bg-secondary" />
                        </div>
                    </div>
                    <div className="bg-muted text-white p-4 rounded-md">
                        <h2 className="text-xl mb-2">Total Messages</h2>
                        <div className="flex items-center gap-x-2 font-semibold">
                            <MessageSquareIcon className="h-7 w-7" />
                            <Skeleton className="h-8 w-full !bg-secondary" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardLoadingPage;
