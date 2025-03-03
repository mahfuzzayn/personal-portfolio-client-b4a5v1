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
import { ArrowLeft, Info, PlusIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { useGetMeQuery } from "@/redux/features/user/user.api";
import { toast } from "sonner";
import { toastStyles } from "@/constants/toaster";
import { TResponse } from "@/types";
import { useRouter } from "next/navigation";
import { useAddProjectMutation } from "@/redux/features/project/project.api";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title must be at least 1 characters.",
    }),
    creator: z.string().min(1, {
        message: "Creator must be included.",
    }),
    description: z.string().min(1, {
        message: "Description must be at least 1 characters.",
    }),
    images: z
        .any()
        .refine((file) => file?.length > 0, {
            message: "Images are required.",
        })
        .refine((file) => file?.[0]?.size <= 5 * 1024 * 1024, {
            message: "Images must be less than 5MB.",
        })
        .refine(
            (file) => ["image/jpeg", "image/png"].includes(file?.[0]?.type),
            { message: "Only JPEG and PNG images are allowed." }
        ),
    links: z.array(
        z.object({
            label: z.string().min(1, "Label is required."),
            href: z.string().url("Enter a valid URL."),
        })
    ),
});

const CreateProjectPage = () => {
    const [addProject] = useAddProjectMutation();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();

    const session = useSession();

    const { data: creatorData } = useGetMeQuery(
        { email: session?.data?.user?.email },
        {
            skip: !session?.data,
        }
    );

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            creator: "",
            description: "",
            images: "",
            links: [{ label: "", href: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "links",
    });

    useEffect(() => {
        if (session?.data?.user?.name) {
            form.setValue("creator", session?.data?.user?.name as string);
        }
    }, [session, form]);

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const toastId = toast.loading("Creating project...", {
            style: toastStyles.loading,
        });

        const formData = new FormData();

        const projectData = {
            project: {
                ...data,
                creator: creatorData?.data?._id,
            },
        };

        try {
            formData.append("data", JSON.stringify(projectData));

            if (data.images && data.images.length > 0) {
                Array.from(data.images as FileList).forEach((file: File) => {
                    return formData.append("files", file);
                });
            }

            const res = (await addProject(formData)) as TResponse<any>;

            if (res.error) {
                toast.error(res.error.data.errorSources[0].message, {
                    id: toastId,
                    style: toastStyles.error,
                });
            } else {
                router.refresh();

                toast.success("Project created", {
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
            <div className="m-10 pb-20">
                <Link href="/dashboard/projects">
                    <Button className="bg-secondary hover:!bg-secondary">
                        <ArrowLeft />
                        Projects
                    </Button>
                </Link>
                <div className="max-w-[1268px]">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="mt-10 space-y-8 text-white"
                        >
                            <h2 className="text-white text-2xl md:text-3xl font-bold text-center">
                                Create a{" "}
                                <span className="text-accent">Project</span> by
                                filling this form
                            </h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 !mb-5">
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
                                    name="creator"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Creator</FormLabel>
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
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Write a brief description..."
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
                                    name="images"
                                    render={({
                                        field: {
                                            onChange,
                                            value,
                                            ref,
                                            ...rest
                                        },
                                    }) => (
                                        <FormItem>
                                            <FormLabel>Images</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Select images"
                                                    type="file"
                                                    multiple
                                                    ref={(e) => {
                                                        fileInputRef.current =
                                                            e;
                                                        ref(e);
                                                    }}
                                                    value={value?.fileName}
                                                    onChange={(e) => {
                                                        if (
                                                            e.target.files
                                                                ?.length
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
                                <div className="space-y-2">
                                    <h3 className="text-xl font-semibold">
                                        Links
                                    </h3>
                                    {fields.map((field: any, index) => (
                                        <div
                                            key={field.id}
                                            className="flex flex-col md:flex-row gap-4 items-start md:items-center"
                                        >
                                            <FormField
                                                control={form.control}
                                                name={`links.${index}.label`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Label
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="GitHub, Live Demo, etc."
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
                                                name={`links.${index}.href`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            URL
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="https://example.com"
                                                                className="bg-secondary placeholder:text-gray-200"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            {fields.length > 1 && (
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            type="button"
                                                            className="mt-auto !bg-muted hover:!bg-muted"
                                                            onClick={() =>
                                                                remove(index)
                                                            }
                                                        >
                                                            <Trash2 size={16} />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent className="bg-destructive">
                                                        Delete Link
                                                    </TooltipContent>
                                                </Tooltip>
                                            )}
                                        </div>
                                    ))}
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button
                                                type="button"
                                                className="bg-destructive hover:!bg-destructive p-2 py-1.5 !mt-5 rounded-md"
                                                onClick={() =>
                                                    append({
                                                        label: "",
                                                        href: "",
                                                    })
                                                }
                                            >
                                                <PlusIcon />
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-secondary">
                                            Add Link
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
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
            </div>
        </>
    );
};

export default CreateProjectPage;
