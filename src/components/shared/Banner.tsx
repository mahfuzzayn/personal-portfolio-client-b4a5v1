/* eslint-disable react/no-unescaped-entities */
import React from "react";
import bannerImage from "../../assets/images/banner-1.jpg";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowUpRight, DownloadIcon } from "lucide-react";

const Banner = () => {
    return (
        <section className="relative w-full max-h-[768px] overflow-hidden">
            {/* Background Image */}
            <Image
                src={bannerImage}
                layout="fill"
                objectFit="cover"
                priority
                alt="Banner Image"
                className="absolute inset-0 z-0"
            />
            <div className="absolute inset-0 bg-secondary opacity-10 dark:bg-opacity-70 z-1"></div>
            <div className="relative z-10 flex flex-col items-start justify-center h-[768px] text-center text-white px-8 md:px-10 lg:px-20 xl:px-32">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
                    Mahfuz Zayn
                </h1>
                <p className="text-lg text-left md:text-xl max-w-2xl">
                    I'm a passionate front-end developer creating amazing web
                    experiences. Dive into my projects and let's explore
                    something incredible together!
                </p>
                <div className="flex gap-x-4 mt-6">
                    <Button
                        type="button"
                        className="px-6 py-5 bg-primary text-white font-semibold text-md rounded-md hover:bg-primary-dark transition-all flex gap-x-1"
                    >
                        Projects
                        <ArrowUpRight size={40} />
                    </Button>
                    <Button
                        type="button"
                        className="px-6 py-5 bg-secondary text-white font-semibold text-md rounded-md hover:bg-primary-dark transition-all"
                    >
                        Resume
                        <DownloadIcon size={40} />
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Banner;
