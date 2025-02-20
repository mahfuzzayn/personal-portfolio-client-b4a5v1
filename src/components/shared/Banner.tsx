/* eslint-disable react/no-unescaped-entities */
import React from "react";
import bannerImage from "../../assets/images/banner-1.jpg";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowUpRight, DownloadIcon } from "lucide-react";

const Banner = () => {
    return (
        <section className="relative w-full max-h-[620px] overflow-hidden">
            {/* Background Image */}
            <Image
                src={bannerImage}
                layout="fill"
                objectFit="cover"
                priority
                alt="Banner Image"
                className="absolute inset-0 z-0"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 dark:bg-opacity-70 z-1"></div>
            <div className="relative z-10 flex flex-col items-start justify-center h-[620px] text-center text-white px-8 md:px-10">
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
                        className="px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition-all flex gap-x-1"
                    >
                        Projects
                        <ArrowUpRight size={32} />
                    </Button>
                    <Button
                        type="button"
                        className="px-6 py-3 bg-muted text-white font-semibold rounded-md hover:bg-primary-dark transition-all"
                    >
                        Resume
                        <DownloadIcon />
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Banner;
