import Blogs from "@/components/shared/Blogs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

const DashboardBlogsPage = async () => {
    const session = await getServerSession();
    const userRes = await fetch(
        `${process.env.BACKEND_URL}/users/${session?.user.email}`
    );

    const { data: user } = await userRes.json();

    const res = await fetch(
        `${process.env.BACKEND_URL}/blogs?authorId=${user?._id}`
    );

    const { data: blogsData } = await res.json();

    return (
        <>
            <div className="flex flex-col md:flex-row justify-start items-start gap-x-5 gap-y-4 m-10">
                <Link href="/dashboard">
                    <Button className="bg-secondary hover:!bg-secondary">
                        <ArrowLeft />
                        Back to Dashboard
                    </Button>
                </Link>
                <h2 className="text-3xl font-semibold text-white">Blogs</h2>
                <Link href="/dashboard/blogs/create-blog">
                    <Button className="bg-muted hover:!bg-muted">
                        Create Blog
                        <ArrowRight />
                    </Button>
                </Link>
            </div>
            <Blogs blogs={blogsData} />
        </>
    );
};

export default DashboardBlogsPage;
