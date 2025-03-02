import { TBlog } from "@/types";
import Image from "next/image";
import React from "react";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const UpdateBlog = ({ blog }: { blog: TBlog }) => {
    return (
        <section className="m-10">
            <h2 className="text-white text-2xl md:text-3xl font-bold">
                Details of <span className="text-accent">{blog.title}</span>
            </h2>
            <div className="relative mt-10 mb-4 w-full max-w-[600px] h-[300px] ">
                <Image
                    src={blog.image}
                    fill
                    priority
                    alt="Blog Image"
                    className="rounded-lg object-cover"
                />
            </div>
            <div className="text-gray-200 mt-10 text-lg space-y-4">
                <p className="font-bold">
                    Title: <span className="font-normal">{blog.title}</span>
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
                <p className="font-bold">
                    Posted on:{" "}
                    <span className="font-normal">
                        {moment(blog?.createdAt)
                            .utc()
                            .format("D MMMM, YYYY [at] h:mm A")}
                    </span>
                </p>
                <Link href={`/dashboard/blogs/update/${blog._id}`}>
                    <Button className="!bg-muted !mt-10">
                        Update this blog <ArrowRight />
                    </Button>
                </Link>
            </div>
        </section>
    );
};

export default UpdateBlog;
