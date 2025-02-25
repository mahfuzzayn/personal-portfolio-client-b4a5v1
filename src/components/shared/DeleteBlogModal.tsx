/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TBlog, TResponse } from "@/types";
import { useDeleteBlogMutation } from "@/redux/features/blog/blog.api";
import { toast } from "sonner";
import { toastStyles } from "@/constants/toaster";

const DeleteBlogModal = ({ blog }: { blog: TBlog }) => {
    const [open, setOpen] = useState(false);
    const [deleteBlog] = useDeleteBlogMutation();

    const handleDelete = async () => {
        const toastId = toast.loading("Deleting blog...", {
            style: toastStyles.loading,
        });
        
        try {
            const res = (await deleteBlog({
                _id: blog?._id,
            })) as TResponse<any>;

            if (res.error) {
                toast.error(res.error.data.errorSources[0].message, {
                    id: toastId,
                    style: toastStyles.error,
                });
            } else {
                toast.success("Blog deleted", {
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
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button className="!bg-muted">Delete Blog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="!bg-accent border-none text-white">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-2xl">
                        Are you sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your blog.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="md:!space-x-4">
                    <AlertDialogCancel
                        onClick={() => setOpen(false)}
                        className="!bg-muted border-none hover:!text-white"
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        className="!bg-primary"
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteBlogModal;
