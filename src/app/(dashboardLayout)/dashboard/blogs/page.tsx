import { Pagination } from "@/components/shared/public/blogs/Pagination";
import Blogs from "@/components/shared/user/blogs/Blogs";
import { Button } from "@/components/ui/button";
import { searchParams } from "@/types";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

const DashboardBlogsPage = async ({ searchParams }: searchParams) => {
    const session = await getServerSession();
    const userRes = await fetch(
        `${process.env.BACKEND_URL}/users/${session?.user.email}`
    );

    const { data: user } = await userRes.json();

    const page = Number((await searchParams)?.page) || 1;

    const res = await fetch(
        `${process.env.BACKEND_URL}/blogs?authorId=${user?._id}&page=${page}&limit=5`
    );

    const { data: blogsData, meta } = await res.json();

    return (
        <>
            <div className="flex flex-col md:flex-row justify-start items-start gap-x-5 gap-y-4 m-10">
                <Link href="/dashboard">
                    <Button className="bg-accent text-white hover:!bg-accent">
                        <ArrowLeft />
                        Back to Dashboard
                    </Button>
                </Link>
                <h2 className="text-3xl font-semibold text-foreground">
                    Blogs
                </h2>
                <Link href="/dashboard/blogs/create-blog">
                    <Button className="bg-muted text-white hover:!bg-muted">
                        Create Blog
                        <ArrowRight />
                    </Button>
                </Link>
            </div>
            <Blogs blogs={blogsData} />
            <div className="flex justify-center mt-20">
                <Pagination currentPage={page} totalPages={meta.totalPage} />
            </div>
        </>
    );
};

export default DashboardBlogsPage;
