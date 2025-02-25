import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    BookIcon,
    InboxIcon,
    MessageSquareIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const DashboardPage = () => {
    return (
        <section className="w-full">
            <div className="m-10">
                <Link href="/">
                    <Button className="bg-secondary hover:!bg-secondary">
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
                        <p className="flex items-center gap-x-2 font-semibold">
                            <BookIcon />
                            <span className="text-2xl">{0}</span>
                        </p>
                    </div>
                    <div className="bg-muted text-white p-4 rounded-md">
                        <h2 className="text-xl mb-2">Total Projects</h2>
                        <p className="flex items-center gap-x-2 font-semibold">
                            <InboxIcon />
                            <span className="text-2xl">{0}</span>
                        </p>
                    </div>
                    <div className="bg-muted text-white p-4 rounded-md">
                        <h2 className="text-xl mb-2">Total Messages</h2>
                        <p className="flex items-center gap-x-2 font-semibold">
                            <MessageSquareIcon />
                            <span className="text-2xl">{0}</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardPage;
