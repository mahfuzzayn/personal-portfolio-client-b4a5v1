import BlogDetail from "@/components/shared/public/blogs/BlogDetail";
import { Button } from "@/components/ui/button";
import { blogParams } from "@/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const generateMetadata = async ({ params }: blogParams) => {
    const { blogId } = await params;
    const res = await fetch(`${process.env.BACKEND_URL}/blogs/${blogId}`);
    const { data: blogData } = await res.json();

    return {
        title: `${
            blogData?.title ? blogData?.title : "404"
        } ‣ Blog Detail ‣ PerpoDia`,
        description:
            "Dive deep into this blog post where we explore key insights, ideas, and topics in detail. Learn about the subject matter, analysis, and perspectives shared in this article.",
    };
};
const BlogDetailPage = async ({ params }: blogParams) => {
    const { blogId } = await params;
    const res = await fetch(`${process.env.BACKEND_URL}/blogs/${blogId}`);
    const { data: blogData } = await res.json();

    if (!blogData) {
        return (
            <>
                <div className="m-10 mt-20">
                    <Link href="/blogs">
                        <Button className="bg-accent text-white hover:!bg-accent">
                            <ArrowLeft />
                            Blogs
                        </Button>
                    </Link>
                </div>
                <div className="flex flex-col gap-y-5 min-h-screen text-foreground mt-32 md:mt-40 items-center text-center mx-5">
                    <h2 className="text-2xl md:text-3xl font-bold">
                        Failed to load{" "}
                        <span className="text-destructive">blog</span> detail
                    </h2>
                    <p>Blog ID: {blogId}</p>
                    <Link href="/blogs">
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
        <section className="min-h-screen pt-10 pb-20">
            <div className="m-10">
                <Link href="/blogs">
                    <Button className="bg-accent text-white hover:!bg-accent">
                        <ArrowLeft />
                        Blogs
                    </Button>
                </Link>
            </div>
            <BlogDetail blog={blogData} />
        </section>
    );
};

export default BlogDetailPage;
