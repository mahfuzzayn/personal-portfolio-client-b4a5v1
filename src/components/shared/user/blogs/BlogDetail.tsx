import { TBlog } from "@/types";
import Image from "next/image";
import React from "react";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { validateImage } from "@/utils/validators/image";

const BlogDetail = ({ blog }: { blog: TBlog }) => {
    return (
        <section className="m-10 mb-20">
            <h2 className="text-white text-2xl md:text-3xl font-bold">
                Blog Details of{" "}
                <span className="text-accent">{blog.title}</span>
            </h2>
            {validateImage(blog.image).then((validate) =>
                validate ? (
                    <div className="relative mt-10 mb-4 w-full max-w-[600px] h-[300px] ">
                        <Image
                            src={blog.image}
                            fill
                            priority
                            alt="Blog Image"
                            className="rounded-lg object-cover"
                        />
                    </div>
                ) : null
            )}
            <div className="text-gray-200 mt-10 text-lg space-y-4">
                <p className="font-bold">
                    Blog
                    <span className="ml-2 text-2xl md:text-3xl text-accent font-bold">
                        {blog.title}
                    </span>
                </p>
                <p className="font-bold">
                    Author:{" "}
                    <span className="font-normal text-accent">
                        {blog.author.name}
                    </span>
                </p>
                <p className="font-bold text-justify">
                    Content: <span className="font-normal">{blog.content}</span>
                </p>
                <p className="font-bold">
                    Category:{" "}
                    <span className="font-normal text-destructive">
                        {blog.category}
                    </span>
                </p>
                <p className="font-bold !mt-10">
                    Posted on:{" "}
                    <span className="font-normal">
                        {moment(blog?.createdAt).format(
                            "D MMMM, YYYY [at] h:mm A"
                        )}
                    </span>
                </p>
                {blog.createdAt !== blog.updatedAt && (
                    <p className="font-bold">
                        Updated on:{" "}
                        <span className="font-normal">
                            {moment(blog?.updatedAt).format(
                                "D MMMM, YYYY [at] h:mm A"
                            )}
                        </span>
                    </p>
                )}
                <Link href={`/dashboard/blogs/update/${blog._id}`}>
                    <Button className="!bg-muted !mt-10">
                        Update this blog <ArrowRight />
                    </Button>
                </Link>
            </div>
        </section>
    );
};

export default BlogDetail;
