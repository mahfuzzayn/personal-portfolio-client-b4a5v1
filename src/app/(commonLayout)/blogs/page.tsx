import Blogs from "@/components/shared/public/blogs/Blogs";
import { Pagination } from "@/components/shared/public/blogs/Pagination";
import { searchParams } from "@/types";
import { notFound } from "next/navigation";

const fetchBlogs = async (page: number) => {
    const res = await fetch(
        `${process.env.BACKEND_URL}/blogs?page=${page}&limit=5`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) return notFound();

    return res.json();
};

const BlogsPage = async ({ searchParams }: searchParams) => {
    const page = Number((await searchParams).page) || 1;

    if (isNaN(page) || page < 1) return notFound();

    const { data: blogsData, meta } = await fetchBlogs(page);

    return (
        <section className="min-h-screen pb-20 px-10 my-20">
            <h2 className="text-foreground text-2xl md:text-3xl font-bold text-center">
                Insights & Ideas: Explore Our Latest{" "}
                <span className="text-destructive">Blogs</span>
            </h2>
            <Blogs blogs={blogsData} />
            <div className="flex justify-center mt-20">
                <Pagination currentPage={page} totalPages={meta.totalPage} />
            </div>
        </section>
    );
};

export default BlogsPage;
