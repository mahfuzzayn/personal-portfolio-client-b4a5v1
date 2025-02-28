import BlogDetail from "@/components/shared/user/BlogDetail";
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

    return { title: `${blogData?.title} ‣ Blog Detail ‣ Personal Portfolio` };
};

const BlogDetailPage = async ({ params }: { params: { blogId: string } }) => {
    const res = await fetch(
        `${process.env.BACKEND_URL}/blogs/${params.blogId}`
    );

    const { data: blogData } = await res.json();

    return (
        <section className="min-h-screen pt-10 pb-20">
            <div className="m-10">
                <Link href="/blogs">
                    <Button className="bg-secondary hover:!bg-secondary">
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
