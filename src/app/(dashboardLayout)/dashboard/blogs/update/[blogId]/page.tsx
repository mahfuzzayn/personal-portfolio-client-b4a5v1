/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import {
    useGetSingleBlogQuery,
    useUpdateBlogMutation,
} from "@/redux/features/blog/blog.api";
import { useSession } from "next-auth/react";
import { useGetMeQuery } from "@/redux/features/user/user.api";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { blogCategories } from "@/constants/blog.const";
import { toast } from "sonner";
import { toastStyles } from "@/constants/toaster";
import { TResponse } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { Spinner } from "@/components/shared/Spinner";

const formSchema = z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    content: z.string().optional(),
    image: z.any().optional(),
    category: z
        .enum(
            [
                "Web Development",
                "Programming",
                "Tech News",
                "Personal Projects",
                "Career & Productivity",
                "AI & Machine Learning",
                "Design & UI/UX",
                "Other",
            ],
            {
                errorMap: () => ({
                    message: "Invalid category",
                }),
            }
        )
        .optional(),
});

const UpdateBlogPage = () => {
    const [updateBlog] = useUpdateBlogMutation();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();
    const params = useParams();
    const session = useSession();

    const { data: authorData } = useGetMeQuery(
        { email: session?.data?.user?.email },
        {
            skip: !session?.data,
        }
    );

    const {
        data: blogData,
        isLoading,
        isFetching,
    } = useGetSingleBlogQuery({
        _id: params.blogId,
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            author: "",
            content: "",
            image: "",
        },
    });

    useEffect(() => {
        if (blogData?.data) {
            form.setValue("title", blogData?.data?.title);
            form.setValue("author", blogData?.data?.author?.name);
            form.setValue("content", blogData?.data?.content);
            form.setValue("category", blogData?.data?.category, {
                shouldValidate: true,
            });
        }
    }, [blogData, form]);

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const toastId = toast.loading("Updating blog...", {
            style: toastStyles.loading,
        });

        const formData = new FormData();

        const blogData = {
            blog: {
                title: data?.title,
                content: data?.content,
                category: data?.category,
                author: authorData?.data?._id,
            },
        };

        try {
            formData.append("data", JSON.stringify(blogData));

            if (data.image) {
                formData.append("file", data.image[0]);
            }

            const res = (await updateBlog({
                _id: params.blogId,
                data: formData,
            })) as TResponse<any>;

            if (res.error) {
                toast.error(res.error.data.errorSources[0].message, {
                    id: toastId,
                    style: toastStyles.error,
                });
            } else {
                router.refresh();

                toast.success("Blog updated", {
                    id: toastId,
                    style: toastStyles.success,
                });
            }
        } catch (error) {
            toast.error("Something went wrong", {
                id: toastId,
                style: toastStyles.error,
            });
        }
    };

    if (isLoading || isFetching) {
        return (
            <div className="flex gap-y-5 min-h-screen text-white justify-center items-center text-center mx-5">
                <Spinner />
            </div>
        );
    }

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
                <div className="flex flex-col gap-y-5 my-40 text-foreground justify-center items-center text-center mx-5">
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
            <div className="m-10 mb-20">
                <div className="flex flex-col md:flex-row justify-start items-start gap-x-3 gap-y-4">
                    <Link
                        href={`/dashboard/blogs/detail/${blogData?.data?._id}`}
                    >
                        <Button className="bg-accent text-white hover:!bg-accent">
                            <ArrowLeft />
                            Back to Blog
                        </Button>
                    </Link>
                    <Link href={`/dashboard/blogs`}>
                        <Button className="bg-muted text-white hover:!bg-muted">
                            Blogs
                            <ArrowUpRight />
                        </Button>
                    </Link>
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="mt-10 space-y-8"
                    >
                        <h2 className="text-foreground text-3xl font-bold text-center">
                            Update Blog:{" "}
                            <span className="text-destructive">
                                {blogData?.data?.title}
                            </span>
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Write a Title"
                                                className="bg-muted text-white placeholder:text-primary"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="author"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Author</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="What is your name?"
                                                className="bg-muted text-white placeholder:text-primary"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Content</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Write a brief detail..."
                                                className="bg-muted text-white placeholder:text-primary"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="image"
                                render={({
                                    field: { onChange, value, ref, ...rest },
                                }) => (
                                    <FormItem>
                                        <FormLabel>Image</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Select an image"
                                                type="file"
                                                ref={(e) => {
                                                    fileInputRef.current = e;
                                                    ref(e);
                                                }}
                                                value={value?.fileName}
                                                onChange={(e) => {
                                                    if (
                                                        e.target.files?.length
                                                    ) {
                                                        onChange(
                                                            e.target.files
                                                        );
                                                    }
                                                }}
                                                className="bg-muted text-white placeholder:text-primary"
                                                {...rest}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={
                                                    field.value ||
                                                    blogData?.data?.category ||
                                                    ""
                                                }
                                            >
                                                <SelectTrigger className="w-[180px] bg-muted text-white placeholder:text-white">
                                                    <SelectValue
                                                        placeholder="Select a category"
                                                        {...field}
                                                    />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {blogCategories.map(
                                                            (category) => (
                                                                <SelectItem
                                                                    key={
                                                                        category.value
                                                                    }
                                                                    value={
                                                                        category.value
                                                                    }
                                                                >
                                                                    {
                                                                        category.label
                                                                    }
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="bg-destructive text-white hover:!bg-destructive"
                        >
                            Submit
                        </Button>
                    </form>
                </Form>
            </div>
        </>
    );
};

export default UpdateBlogPage;
