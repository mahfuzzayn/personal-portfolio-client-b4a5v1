import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const MessagesLoadingPage = () => {
    return (
        <>
            <div className="flex flex-col md:flex-row justify-start items-start gap-x-5 gap-y-4 m-10">
                <Link href="/dashboard">
                    <Button className="bg-accent text-white hover:!bg-accent">
                        <ArrowLeft />
                        Back to Dashboard
                    </Button>
                </Link>
                <h2 className="text-3xl font-semibold text-foreground">
                    Messages
                </h2>
            </div>
            <section className="min-h-screen pb-20 px-10 mt-10 mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 my-20 gap-10 max-w-[1268px]">
                    {[0, 1, 2, 3, 5, 6].map((project, index) => (
                        <div
                            key={index}
                            className="text-white bg-muted rounded-xl"
                        >
                            <div className="p-4 md:p-6 md:pb-2 space-y-3">
                                <Skeleton className="h-10 bg-secondary w-full" />
                                <Skeleton className="h-6 bg-secondary w-full" />
                                <Skeleton className="h-6 bg-secondary w-full" />
                            </div>
                            <Separator className="bg-primary my-6" />
                            <div className="flex flex-wrap px-4 md:px-6 gap-4 mt-2">
                                <Skeleton className="h-10 bg-primary w-[130px]" />
                            </div>
                            <p className="text-xs text-gray-300 text-right mr-4 mb-2">
                                {index + 1}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-20">
                    <div className="flex items-center flex-wrap gap-y-6 gap-x-4">
                        <Skeleton className="h-10 w-[90px] px-4 py-2 bg-accent text-white rounded disabled:opacity-50"></Skeleton>
                        <Skeleton className="h-5 w-[140px] bg-secondary" />
                        <Skeleton className="h-10 w-[90px] px-4 py-2 bg-accent text-white rounded disabled:opacity-50"></Skeleton>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MessagesLoadingPage;
