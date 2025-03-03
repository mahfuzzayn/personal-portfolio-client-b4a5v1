import Blogs from "@/components/shared/public/blogs/Blogs";

const BlogsPage = async () => {
    const res = await fetch(`${process.env.BACKEND_URL}/blogs`);

    const { data: blogsData } = await res.json();

    return (
        <section className="min-h-screen pb-20 px-10 my-20">
            <h2 className="text-white text-2xl md:text-3xl font-bold text-center">
                Insights & Ideas: Explore Our Latest{" "}
                <span className="text-accent">Blogs</span>
            </h2>
            <Blogs blogs={blogsData} />
        </section>
    );
};

export default BlogsPage;
