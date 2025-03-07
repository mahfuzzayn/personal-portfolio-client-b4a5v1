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
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { toastStyles } from "@/constants/toaster";
import { TResponse } from "@/types";
import { useRouter } from "next/navigation";
import { useAddMessageMutation } from "@/redux/features/message/message.api";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name must be at least 1 characters.",
    }),
    email: z.string().email({ message: "Email must be included." }),
    message: z.string().min(10, {
        message: "Message must be at least 10 characters.",
    }),
});

const ContactPage = () => {
    const [addMessage] = useAddMessageMutation();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        const toastId = toast.loading("Sending message...", {
            style: toastStyles.loading,
        });

        const messageData = {
            message: {
                ...data,
            },
        };

        try {
            const res = (await addMessage(messageData)) as TResponse<any>;

            if (res.error) {
                toast.error(res.error.data.errorSources[0].message, {
                    id: toastId,
                    style: toastStyles.error,
                });
            } else {
                router.refresh();

                toast.success("Message sent", {
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
        <section className="min-h-screen px-10">
            <div className="max-w-[1268px] my-20 mx-auto">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="mt-10 space-y-8 text-white"
                    >
                        <h2 className="text-foreground text-2xl md:text-3xl font-bold text-center">
                            Reach us through sending a{" "}
                            <span className="text-destructive">Message</span> by
                            filling this form
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 text-foreground">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
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
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="What is your email?"
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
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Message</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Write a brief message..."
                                                className="bg-muted text-white placeholder:text-primary"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="bg-destructive hover:!bg-destructive text-white"
                        >
                            Submit
                        </Button>
                    </form>
                </Form>
            </div>
        </section>
    );
};

export default ContactPage;
