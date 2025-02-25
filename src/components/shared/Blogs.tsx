import { TBlog } from "@/types";
import moment from "moment";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import Link from "next/link";
import DeleteBlogModal from "./DeleteBlogModal";

const Blogs = ({ blogs }: { blogs: TBlog[] }) => {
    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 m-10 gap-5 max-w-[1268px]">
            {blogs.map((blog, index) => (
                <div
                    key={blog._id}
                    className="text-white bg-secondary rounded-md"
                >
                    <div className="p-4 md:p-6 space-y-3">
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
                            {moment(blog?.createdAt)
                                .utc()
                                .format("D MMMM, YYYY [at] h:mm A")}
                        </p>
                    </div>
                    <Separator className="bg-primary" />
                    <div className="p-4 md:px-6 flex flex-wrap gap-4 mt-2">
                        <Link href={`/dashboard/blogs/detail/${blog?._id}`}>
                            <Button className="!bg-primary">
                                View Details
                            </Button>
                        </Link>
                        <Link href={`/dashboard/blogs/update/${blog?._id}`}>
                            <Button className="!bg-accent text-gray-700">
                                Update
                            </Button>
                        </Link>
                        <DeleteBlogModal blog={blog} />
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
