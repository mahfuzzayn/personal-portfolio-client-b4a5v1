import Banner from "@/components/shared/Banner";
import FeaturedProjects from "@/components/shared/FeaturedProjects";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import Skills from "@/components/shared/Skills";
import React from "react";

const HomePage = async () => {
    const projectsRes = await fetch(`${process.env.BACKEND_URL}/projects`, {
        next: {
            revalidate: 60,
        },
    });

    const { data: projectsData } = await projectsRes.json();

    return (
        <>
            <Header />
            <Banner />
            <Skills />
            <FeaturedProjects projects={projectsData} />
            <Footer />
        </>
    );
};

export default HomePage;
