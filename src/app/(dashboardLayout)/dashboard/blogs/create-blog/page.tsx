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
import { useAddBlogMutation } from "@/redux/features/blog/blog.api";
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
import { useRouter } from "next/navigation";

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title must be at least 1 characters.",
    }),
    author: z.string().min(1, {
        message: "Author must be included.",
    }),
    content: z.string().min(1, {
        message: "Content must be at least 1 characters.",
    }),
    image: z
        .any()
        .refine((file) => file?.length > 0, {
            message: "Image is required.",
        })
        .refine((file) => file?.[0]?.size <= 5 * 1024 * 1024, {
            message: "Image must be less than 5MB.",
        })
        .refine(
            (file) => ["image/jpeg", "image/png"].includes(file?.[0]?.type),
            { message: "Only JPEG and PNG images are allowed." }
        ),
    category: z.string().min(1, {
        message: "Category must be included.",
    }),
});

const CreateBlogPage = () => {
    const [addBlog] = useAddBlogMutation();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();

    const session = useSession();

    const { data: authorData } = useGetMeQuery(
        { email: session?.data?.user?.email },
        {
            skip: !session?.data,
        }
    );

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            author: "",
            content: "",
            image: "",
            category: "",
        },
    });

    useEffect(() => {
        if (session?.data?.user?.name) {
            form.setValue("author", session?.data?.user?.name as string);
        }
    }, [session, form]);

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const toastId = toast.loading("Creating blog...", {
            style: toastStyles.loading,
        });

        const formData = new FormData();

        const blogData = {
            blog: {
                ...data,
                author: authorData?.data?._id,
            },
        };

        try {
            formData.append("data", JSON.stringify(blogData));

            if (data.image) {
                formData.append("file", data.image[0]);
            }

            const res = (await addBlog(formData)) as TResponse<any>;

            if (res.error) {
                toast.error(res.error.data.errorSources[0].message, {
                    id: toastId,
                    style: toastStyles.error,
                });
            } else {
                router.refresh();

                toast.success("Blog created", {
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

        form.reset();
    };

    return (
        <>
            <div className="m-10">
                <Link href="/dashboard/blogs">
                    <Button className="bg-accent text-white hover:!bg-accent">
                        <ArrowLeft />
                        Blogs
                    </Button>
                </Link>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="mt-10 mb-20 space-y-8 text-foreground"
                    >
                        <h2 className="text-foreground text-3xl font-bold text-center">
                            Create a{" "}
                            <span className="text-destructive">Blog</span> by
                            filling this form
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
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger className="w-[180px] bg-muted text-white placeholder:text-primary">
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

export default CreateBlogPage;
