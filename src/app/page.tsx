import Banner from "@/components/shared/Banner";
import FeaturedProjects from "@/components/shared/FeaturedProjects";
import Header from "@/components/shared/Header";
import Skills from "@/components/shared/Skills";
import React from "react";

const HomePage = () => {
    return (
        <>
            <Header />
            <Banner />
            <Skills />
            <FeaturedProjects />
        </>
    );
};

export default HomePage;
