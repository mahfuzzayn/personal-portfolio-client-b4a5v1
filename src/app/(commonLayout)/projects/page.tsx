import Projects from "@/components/shared/public/projects/Projects";

const ProjectsPage = async () => {
    const res = await fetch(`${process.env.BACKEND_URL}/projects`);

    const { data: projectsData } = await res.json();

    return (
        <section className="min-h-screen pb-20 px-10 my-20">
            <h2 className="text-white text-2xl md:text-3xl font-bold text-center">
                Innovate & Build: Discover Our Latest{" "}
                <span className="text-accent">Projects</span>
            </h2>
            <Projects projects={projectsData} />
        </section>
    );
};

export default ProjectsPage;
