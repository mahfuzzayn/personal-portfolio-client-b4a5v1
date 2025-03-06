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
import { ArrowLeft, ArrowUpRight, PlusIcon, Trash2 } from "lucide-react";
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
import { useParams, useRouter } from "next/navigation";
import {
    useGetSingleProjectQuery,
    useUpdateProjectMutation,
} from "@/redux/features/project/project.api";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Spinner } from "@/components/shared/Spinner";

const formSchema = z.object({
    title: z.string().optional(),
    creator: z.string().optional(),
    description: z.string().optional(),
    images: z
        .any()
        .optional()
        .superRefine((file, ctx) => {
            if (file && file.length > 0) {
                if (file[0].size > 5 * 1024 * 1024) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: "Images must be less than 5MB.",
                    });
                }
                if (!["image/jpeg", "image/png"].includes(file[0].type)) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: "Only JPEG and PNG images are allowed.",
                    });
                }
            }
        }),
    links: z.array(
        z.object({
            label: z.string().min(1, "Label is required."),
            href: z.string().url("Enter a valid URL."),
        })
    ),
});

const UpdateProjectPage = () => {
    const [updateProject] = useUpdateProjectMutation();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();
    const params = useParams();
    const session = useSession();

    const { data: creatorData } = useGetMeQuery(
        { email: session?.data?.user?.email },
        {
            skip: !session?.data,
        }
    );

    const {
        data: projectData,
        isLoading,
        isFetching,
    } = useGetSingleProjectQuery({
        projectId: params.projectId,
    });

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

    const { control, setValue } = form;
    const { fields, append, remove } = useFieldArray({
        control,
        name: "links",
    });

    useEffect(() => {
        if (projectData?.data) {
            form.setValue("title", projectData?.data?.title);
            form.setValue("creator", projectData?.data?.creator?.name);
            form.setValue("description", projectData?.data?.description);

            if (projectData?.data?.links) {
                form.setValue("links", projectData?.data?.links);
            }
        }
    }, [projectData, form]);

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const toastId = toast.loading("Updating project...", {
            style: toastStyles.loading,
        });

        const formData = new FormData();

        const projectData = {
            project: {
                title: data?.title,
                description: data?.description,
                creator: creatorData?.data?._id,
                links: data?.links,
            },
        };

        try {
            formData.append("data", JSON.stringify(projectData));

            if (data.images && data.images.length > 0) {
                Array.from(data.images as FileList).forEach((file: File) => {
                    formData.append("files", file);
                });
            }

            const res = (await updateProject({
                projectId: params.projectId,
                data: formData,
            })) as TResponse<any>;

            if (res.error) {
                toast.error(res.error.data.errorSources[0].message, {
                    id: toastId,
                    style: toastStyles.error,
                });
            } else {
                router.refresh();

                toast.success("Project updated", {
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

    if (!projectData) {
        return (
            <div className="flex flex-col gap-y-5 min-h-screen text-white justify-center items-center text-center mx-5">
                <h2 className="text-2xl md:text-3xl font-bold">
                    Failed to load{" "}
                    <span className="text-destructive">project</span> detail
                </h2>
                <p>Project ID: {params.projectId}</p>
                <Link href="/dashboard/projects">
                    <Button className="bg-secondary hover:!bg-secondary">
                        <ArrowLeft />
                        Projects
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <>
            <div className="m-10 pb-20">
                <div className="flex flex-col md:flex-row justify-start items-start gap-x-3 gap-y-4">
                    <Link
                        href={`/dashboard/projects/detail/${projectData?.data?._id}`}
                    >
                        <Button className="bg-accent text-white hover:!bg-accent">
                            <ArrowLeft />
                            Back to Project
                        </Button>
                    </Link>
                    <Link href={`/dashboard/projects`}>
                        <Button className="bg-muted text-white hover:!bg-muted">
                            Projects
                            <ArrowUpRight />
                        </Button>
                    </Link>
                </div>
                <div className="max-w-[1268px]">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="mt-10 space-y-8 text-white"
                        >
                            <h2 className="text-foreground text-2xl md:text-3xl font-bold text-center">
                                Update Project:{" "}
                                <span className="text-destructive">
                                    {projectData?.data?.title}
                                </span>
                            </h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 !mb-5 text-foreground">
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
                                    name="creator"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Creator</FormLabel>
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
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
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
                                                    className="bg-muted text-white placeholder:text-primary"
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
                                                name={`links.${index}.href`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            URL
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="https://example.com"
                                                                className="bg-muted text-white placeholder:text-primary"
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
                                                            className="mt-auto !bg-primary hover:!bg-primary"
                                                            onClick={() =>
                                                                remove(index)
                                                            }
                                                        >
                                                            <Trash2
                                                                size={16}
                                                                className="text-white"
                                                            />
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
                                                className="bg-secondary hover:!bg-secondary p-2 py-1.5 !mt-5 rounded-md"
                                                onClick={() =>
                                                    append({
                                                        label: "",
                                                        href: "",
                                                    })
                                                }
                                            >
                                                <PlusIcon className="text-primary" />
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-destructive">
                                            Add Link
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
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
            </div>
        </>
    );
};

export default UpdateProjectPage;
