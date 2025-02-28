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
import { ArrowLeft } from "lucide-react";
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

    const { data: blogData } = useGetSingleBlogQuery({
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
            form.setValue("category", blogData?.data?.category);
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

    return (
        <>
            <div className="m-10">
                <Link href="/dashboard/blogs">
                    <Button className="bg-secondary hover:!bg-secondary">
                        <ArrowLeft />
                        Blogs
                    </Button>
                </Link>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="mt-10 space-y-8 text-white"
                    >
                        <h2 className="text-white text-3xl font-bold text-center">
                            Update Blog: {blogData?.data?.title}
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
                                                className="bg-secondary placeholder:text-gray-200"
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
                                                className="bg-secondary placeholder:text-gray-200"
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
                                                className="bg-secondary placeholder:text-gray-200"
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
                                                className="bg-secondary placeholder:text-gray-200"
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
                                                value={field.value}
                                            >
                                                <SelectTrigger className="w-[180px] bg-secondary placeholder:!text-gray-300">
                                                    <SelectValue
                                                        placeholder="Select a category"
                                                        className=""
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
                            className="bg-muted hover:!bg-muted"
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
