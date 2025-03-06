import BlogDetail from "@/components/shared/user/blogs/BlogDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const generateMetadata = async ({
    params,
}: {
    params: { blogId: string };
}) => {
    const res = await fetch(
        `${process.env.BACKEND_URL}/blogs/${params.blogId}`
    );

    const { data: blogData } = await res.json();

    return {
        title: `${
            blogData?.title ? blogData?.title : "404"
        } ‣ Blog Detail ‣ Personal Portfolio`,
    };
};

const DashboardBlogDetailPage = async ({
    params,
}: {
    params: { blogId: string };
}) => {
    const res = await fetch(
        `${process.env.BACKEND_URL}/blogs/${params.blogId}`
    );

    const { data: blogData } = await res.json();

    if (!blogData) {
        return (
            <>
                <div className="m-10">
                    <Link href="/dashboard/blogs">
                        <Button className="bg-accent text-white hover:!bg-accent">
                            <ArrowLeft />
                            Blogs
                        </Button>
                    </Link>
                </div>
                <div className="flex flex-col gap-y-5 min-h-screen text-foreground justify-center items-center text-center mx-5">
                    <h2 className="text-2xl md:text-3xl font-bold">
                        Failed to load{" "}
                        <span className="text-destructive">blog</span> detail
                    </h2>
                    <p>Blog ID: {params.blogId}</p>
                    <Link href="/dashboard/blogs">
                        <Button className="bg-secondary text-primary hover:!bg-secondary">
                            <ArrowLeft />
                            Back to Blogs
                        </Button>
                    </Link>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="m-10">
                <Link href="/dashboard/blogs">
                    <Button className="bg-accent text-white hover:!bg-accent">
                        <ArrowLeft />
                        Blogs
                    </Button>
                </Link>
            </div>
            <BlogDetail blog={blogData} />
        </>
    );
};

export default DashboardBlogDetailPage;
