"use client";

import { TLink, TProject } from "@/types";
import Image from "next/image";
import React from "react";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Swiper CSS Files
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProjectDetail = ({ project }: { project: TProject }) => {
    return (
        <section className="m-10 pb-20">
            <h2 className="text-foreground text-2xl md:text-3xl font-bold">
                Project Details of{" "}
                <span className="text-destructive">{project.title}</span>
            </h2>
            <Swiper
                navigation
                pagination={{ type: "fraction" }}
                modules={[Navigation, Pagination]}
                className="my-swiper max-w-[400px] md:max-w-[600px] lg:max-w-[800px] !ml-0 my-10"
            >
                {project.images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <Image
                            src={image.src}
                            height={600}
                            width={800}
                            alt="Blog Image"
                            className="h-[200px] md:h-[300px] lg:h-[400px] object-cover"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="text-foreground mt-5 text-lg space-y-4">
                <p className="font-bold">
                    Project
                    <span className="ml-2 text-2xl md:text-3xl text-destructive font-bold">
                        {project.title}
                    </span>
                </p>
                <p className="font-bold">
                    Creator:{" "}
                    <span className="font-normal text-destructive">
                        {project.creator.name}
                    </span>
                </p>
                <p className="font-bold text-justify">
                    Description:{" "}
                    <span className="font-normal">{project.description}</span>
                </p>
                <p className="font-bold">
                    Published on:{" "}
                    <span className="font-normal">
                        {moment(project?.createdAt).format(
                            "D MMMM, YYYY [at] h:mm A"
                        )}
                    </span>
                </p>
                {project.createdAt !== project.updatedAt && (
                    <p className="font-bold">
                        Updated on:{" "}
                        <span className="font-normal">
                            {moment(project?.updatedAt).format(
                                "D MMMM, YYYY [at] h:mm A"
                            )}
                        </span>
                    </p>
                )}
                <ul className="flex flex-row flex-wrap gap-3 text-md md:text-lg text-gray-100">
                    {project.links.map((link: TLink, index) => (
                        <li key={index}>
                            <Link
                                href={`${link.href}`}
                                className="text-background bg-foreground hover:text-destructive transition-colors px-2 py-1 rounded-md flex gap-x-1"
                            >
                                {link.label}
                                <ArrowUpRight size={16} />
                            </Link>
                        </li>
                    ))}
                </ul>
                <Link href={`/dashboard/projects/update/${project._id}`}>
                    <Button className="!bg-destructive text-white !mt-10">
                        Update this project <ArrowRight />
                    </Button>
                </Link>
            </div>
        </section>
    );
};

export default ProjectDetail;
