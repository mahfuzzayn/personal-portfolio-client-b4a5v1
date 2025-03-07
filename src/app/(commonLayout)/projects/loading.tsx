import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProjectsLoadingPage = () => {
    return (
        <section className="min-h-screen pb-20 px-10 my-20">
            <h2 className="text-foreground text-2xl md:text-3xl font-bold text-center">
                Innovate & Build: Discover Our Latest{" "}
                <span className="text-destructive">Projects</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-10 gap-10 max-w-[1268px] mx-auto">
                {[0, 1, 2, 3, 5, 6].map((project, index) => (
                    <div key={index} className="text-white bg-muted rounded-xl">
                        <div className="p-4 md:p-6 md:pb-2 space-y-3">
                            <Skeleton className="h-10 bg-secondary w-full" />
                            <Skeleton className="h-6 bg-secondary w-full" />
                            <ul className="flex flex-row flex-wrap gap-3 text-md md:text-lg text-gray-100 !my-5">
                                {[0, 1, 2].map((link, index) => (
                                    <Skeleton
                                        key={index}
                                        className="h-10 bg-background w-[130px]"
                                    />
                                ))}
                            </ul>
                            <Skeleton className="h-6 bg-secondary w-full" />
                        </div>
                        <div className="px-4 md:px-6 gap-4 mt-2">
                            <Skeleton className="h-10 bg-primary w-[140px]" />
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
    );
};

export default ProjectsLoadingPage;
