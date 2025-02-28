import Blogs from "@/components/shared/user/Blogs";

const BlogsPage = async () => {
    const res = await fetch(
        `${process.env.BACKEND_URL}/blogs`
    );

    const { data: blogsData } = await res.json();

    return (
        <section className="min-h-screen pt-10 pb-20">
            <Blogs blogs={blogsData} />
        </section>
    );
};

export default BlogsPage;
