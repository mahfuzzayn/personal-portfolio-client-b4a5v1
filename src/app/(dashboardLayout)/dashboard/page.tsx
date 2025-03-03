import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    BookIcon,
    InboxIcon,
    MessageSquareIcon,
} from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

const DashboardPage = async () => {
    const session = await getServerSession();
    const userRes = await fetch(
        `${process.env.BACKEND_URL}/users/${session?.user.email}`
    );

    const { data: user } = await userRes.json();

    const blogsRes = await fetch(
        `${process.env.BACKEND_URL}/blogs?authorId=${user?._id}`
    );

    const messagesRes = await fetch(`${process.env.BACKEND_URL}/messages`);

    const projectsRes = await fetch(
        `${process.env.BACKEND_URL}/projects?creatorId=${user?._id}`
    );

    const { data: blogsData } = await blogsRes.json();

    const { data: messagesData } = await messagesRes.json();

    const { data: projectsData } = await projectsRes.json();

    return (
        <section className="w-full mb-20">
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
                        <div className="flex items-center gap-x-2 font-semibold">
                            <BookIcon />
                            <p className="text-2xl">{blogsData?.length}</p>
                        </div>
                    </div>
                    <div className="bg-muted text-white p-4 rounded-md">
                        <h2 className="text-xl mb-2">Total Projects</h2>
                        <div className="flex items-center gap-x-2 font-semibold">
                            <InboxIcon />
                            <p className="text-2xl">{projectsData?.length}</p>
                        </div>
                    </div>
                    <div className="bg-muted text-white p-4 rounded-md">
                        <h2 className="text-xl mb-2">Total Messages</h2>
                        <div className="flex items-center gap-x-2 font-semibold">
                            <MessageSquareIcon />
                            <p className="text-2xl">{messagesData?.length}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardPage;
