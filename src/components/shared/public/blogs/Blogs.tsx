import { TBlog } from "@/types";
import moment from "moment";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Blogs = ({ blogs }: { blogs: TBlog[] }) => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-10 gap-10 max-w-[1268px] mx-auto">
            {blogs.map((blog, index) => (
                <div
                    key={blog._id}
                    className="text-white bg-cyan-700 rounded-xl"
                >
                    <div className="p-4 md:p-6 md:pb-2 space-y-3">
                        <h2 className="text-2xl md:text-3xl font-semibold">
                            {blog.title}
                        </h2>
                        <p className="text-md md:text-lg text-gray-100">
                            <span className="font-semibold">Content:</span>{" "}
                            {blog?.content.slice(
                                0,
                                blog?.content?.length * 0.2
                            )}
                            {"..."}
                        </p>
                        <p className="text-gray-100">
                            <span className="font-semibold">Posted on:</span>{" "}
                            {moment(blog?.createdAt).format(
                                "D MMMM, YYYY [at] h:mm A"
                            )}
                        </p>
                    </div>
                    <div className="px-4 md:px-6 flex flex-wrap gap-4 mt-2">
                        <Link href={`/blogs/${blog?._id}`}>
                            <Button className="!bg-muted">Read More</Button>
                        </Link>
                    </div>
                    <p className="text-xs text-gray-300 text-right mr-4 mb-2">
                        {index + 1}
                    </p>
                </div>
            ))}
        </section>
    );
};

export default Blogs;
