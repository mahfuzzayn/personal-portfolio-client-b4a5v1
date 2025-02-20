import Banner from "@/components/shared/Banner";
import FeaturedProjects from "@/components/shared/FeaturedProjects";
import Skills from "@/components/shared/Skills";
import React from "react";

const HomePage = () => {
    return (
        <>
            <Banner />
            <Skills />
            <FeaturedProjects />
        </>
    );
};

export default HomePage;
